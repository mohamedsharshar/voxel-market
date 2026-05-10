import React from 'react';
import { CREATORS, MODELS, SEARCH_HISTORY_DEFAULT } from '../data';

const AppContext = React.createContext();

const readJson = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be disabled in privacy-focused browsers.
  }
};

export function AppProvider({ children }) {
  const [cart, setCart] = React.useState(() => readJson('voxel_cart', []));
  const [wishlist, setWishlist] = React.useState(() => readJson('voxel_wishlist', []));
  const [recentlyViewed, setRecentlyViewed] = React.useState(() =>
    readJson('voxel_recently_viewed', [])
  );
  const [followedCreators, setFollowedCreators] = React.useState(() =>
    readJson('voxel_followed_creators', [])
  );
  const [searchHistory, setSearchHistory] = React.useState(() =>
    readJson('voxel_search_history', SEARCH_HISTORY_DEFAULT)
  );
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'sale',
      title: 'Creator sale is live',
      message: 'Featured packs are 20% off this week.',
      unread: true,
    },
    {
      id: 2,
      type: 'update',
      title: 'Asset update available',
      message: 'Cyberpunk Alley Kit now includes new signage meshes.',
      unread: true,
    },
  ]);
  const [toast, setToast] = React.useState(null);
  const [user, setUser] = React.useState(() => readJson('voxel_user', null));
  const [globalLoading, setGlobalLoading] = React.useState(false);
  const [models, setModels] = React.useState([]);
  const [creators, setCreators] = React.useState([]);

  const API_BASE = React.useMemo(() => {
    const raw = (import.meta.env.VITE_API_BASE_URL || '').trim();
    return raw.endsWith('/') ? raw.slice(0, -1) : raw;
  }, []);

  const apiUrl = React.useCallback(
    (path) => {
      if (!path.startsWith('/')) return `${API_BASE}/${path}`;
      return `${API_BASE}${path}`;
    },
    [API_BASE]
  );

  const upsertModel = React.useCallback((nextModel) => {
    if (!nextModel?.id) return;
    setModels((current) => {
      const idx = current.findIndex((item) => String(item.id) === String(nextModel.id));
      if (idx === -1) return [nextModel, ...current];
      const copy = [...current];
      copy[idx] = { ...copy[idx], ...nextModel };
      return copy;
    });
  }, []);

  React.useEffect(() => {
    if (import.meta.env.MODE === 'test') return undefined;

    const controller = new AbortController();

    async function loadCatalog() {
      try {
        setGlobalLoading(true);

        const [modelsResp, creatorsResp] = await Promise.all([
          fetch(apiUrl('/api/models?format=card&source=all&limit=120'), {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
          }),
          fetch(apiUrl('/api/creators'), {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
          }),
        ]);

        if (modelsResp.ok) {
          const payload = await modelsResp.json();
          if (Array.isArray(payload) && payload.length) setModels(payload);
        }

        if (creatorsResp.ok) {
          const payload = await creatorsResp.json();
          if (Array.isArray(payload) && payload.length) setCreators(payload);
        }
      } catch {
        // Keep local sample data if API is unavailable.
      } finally {
        setGlobalLoading(false);
      }
    }

    loadCatalog();
    return () => controller.abort();
  }, [apiUrl, setGlobalLoading]);

  React.useEffect(() => writeJson('voxel_cart', cart), [cart]);
  React.useEffect(() => writeJson('voxel_wishlist', wishlist), [wishlist]);
  React.useEffect(() => writeJson('voxel_recently_viewed', recentlyViewed), [recentlyViewed]);
  React.useEffect(() => writeJson('voxel_followed_creators', followedCreators), [followedCreators]);
  React.useEffect(() => writeJson('voxel_search_history', searchHistory), [searchHistory]);
  React.useEffect(() => writeJson('voxel_user', user), [user]);

  const showToast = React.useCallback(
    (messageOrObj, type = 'info', actionLabel = null, onAction = null, duration = 3200) => {
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
      window.setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, toastObj.duration || duration);
    },
    []
  );

  const addToCart = React.useCallback(
    (model) => {
      setCart((current) => {
        const exists = current.some((item) => item.id === model.id);
        if (exists) {
          showToast('Already in cart', 'info');
          return current;
        }
        showToast(`${model.name} added to cart`, 'success');
        return [...current, { ...model, quantity: 1 }];
      });
    },
    [showToast]
  );

  const removeFromCart = React.useCallback(
    (modelId) => {
      setCart((current) => {
        const removed = current.find((item) => item.id === modelId);
        if (!removed) return current;

        showToast({
          message: 'Removed from cart',
          type: 'info',
          actionLabel: 'Undo',
          onAction: () => {
            setCart((prev) => [removed, ...prev]);
          },
        });

        return current.filter((item) => item.id !== modelId);
      });
    },
    [showToast]
  );

  const clearCart = React.useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = React.useCallback(
    (model) => {
      setWishlist((current) => {
        const exists = current.some((item) => item.id === model.id);
        showToast(
          exists ? `${model.name} removed from wishlist` : `${model.name} saved to wishlist`,
          exists ? 'info' : 'success'
        );
        return exists ? current.filter((item) => item.id !== model.id) : [model, ...current];
      });
    },
    [showToast]
  );

  const markViewed = React.useCallback((model) => {
    setRecentlyViewed((current) => [model, ...current.filter((item) => item.id !== model.id)].slice(0, 8));
  }, []);

  const toggleFollowCreator = React.useCallback(
    (creatorName) => {
      setFollowedCreators((current) => {
        const exists = current.includes(creatorName);
        showToast(exists ? `Unfollowed ${creatorName}` : `Following ${creatorName}`, 'success');
        return exists ? current.filter((name) => name !== creatorName) : [creatorName, ...current];
      });
    },
    [showToast]
  );

  const addSearchHistory = React.useCallback((query) => {
    const value = query.trim();
    if (!value) return;
    setSearchHistory((current) => [value, ...current.filter((item) => item !== value)].slice(0, 7));
  }, []);

  const addNotification = React.useCallback((notification) => {
    setNotifications((current) => [{ id: Date.now(), unread: true, ...notification }, ...current]);
  }, []);

  const clearNotification = React.useCallback((id) => {
    setNotifications((current) => current.filter((n) => n.id !== id));
  }, []);

  const markNotificationsRead = React.useCallback(() => {
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })));
  }, []);

  const value = React.useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      recentlyViewed,
      markViewed,
      followedCreators,
      toggleFollowCreator,
      searchHistory,
      addSearchHistory,
      notifications,
      addNotification,
      clearNotification,
      markNotificationsRead,
      toast,
      showToast,
      user,
      setUser,
      globalLoading,
      setGlobalLoading,
      models,
      setModels,
      upsertModel,
      creators,
      setCreators,
    }),
    [
      addNotification,
      addSearchHistory,
      addToCart,
      cart,
      clearCart,
      clearNotification,
      creators,
      followedCreators,
      globalLoading,
      markNotificationsRead,
      markViewed,
      models,
      upsertModel,
      notifications,
      recentlyViewed,
      removeFromCart,
      searchHistory,
      showToast,
      toast,
      toggleFollowCreator,
      toggleWishlist,
      user,
      wishlist,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
