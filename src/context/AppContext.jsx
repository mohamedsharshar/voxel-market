import React from 'react';

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [globalLoading, setGlobalLoading] = React.useState(false);

  const addToCart = (model) => {
    const exists = cart.find((item) => item.id === model.id);
    if (exists) {
      showToast('Already in cart!', 'info');
      return;
    }
    setCart([...cart, { ...model, quantity: 1 }]);
    showToast('Added to cart!', 'success');
  };

  const removeFromCart = (modelId) => {
    const removed = cart.find((item) => item.id === modelId);
    setCart(cart.filter((item) => item.id !== modelId));
    if (removed) {
      showToast({
        message: 'Removed from cart',
        type: 'info',
        actionLabel: 'Undo',
        onAction: () => {
          setCart((prev) => [removed, ...prev]);
        },
      });
    } else {
      showToast('Removed from cart', 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const showToast = (
    messageOrObj,
    type = 'info',
    actionLabel = null,
    onAction = null,
    duration = 3000
  ) => {
    if (!messageOrObj) {
      setToast(null);
      return;
    }
    const id = Date.now();
    const toastObj =
      typeof messageOrObj === 'string'
        ? { id, message: messageOrObj, type, actionLabel, onAction, duration }
        : {
            id,
            message: messageOrObj.message,
            type: messageOrObj.type || 'info',
            actionLabel: messageOrObj.actionLabel,
            onAction: messageOrObj.onAction,
            duration: messageOrObj.duration || duration,
          };
    setToast(toastObj);
    setTimeout(() => setToast(null), toastObj.duration || duration);
  };

  const addNotification = (notification) => {
    setNotifications([{ id: Date.now(), ...notification }, ...notifications]);
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    notifications,
    addNotification,
    clearNotification,
    toast,
    showToast,
    user,
    setUser,
    globalLoading,
    setGlobalLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
