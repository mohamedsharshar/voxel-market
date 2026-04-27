import React from 'react';

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const addToCart = (model) => {
    const exists = cart.find(item => item.id === model.id);
    if (exists) {
      showToast('Already in cart!', 'info');
      return;
    }
    setCart([...cart, { ...model, quantity: 1 }]);
    showToast('Added to cart!', 'success');
  };

  const removeFromCart = (modelId) => {
    setCart(cart.filter(item => item.id !== modelId));
    showToast('Removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addNotification = (notification) => {
    setNotifications([{ id: Date.now(), ...notification }, ...notifications]);
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
