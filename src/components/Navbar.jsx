import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Bell,
  Box,
  ChevronDown,
  HelpCircle,
  Info,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { TRENDING_SEARCHES } from '../data';
import { useApp } from '../context/AppContext';

const primaryLinks = [
  { to: '/browse', label: 'Browse' },
  { to: '/trending', label: 'Trending' },
  { to: '/collections', label: 'Collections' },
  { to: '/creators', label: 'Creators' },
];

const moreLinks = [
  { to: '/categories', label: 'Categories' },
  { to: '/featured', label: 'Featured' },
  { to: '/top-sellers', label: 'Top Sellers' },
  { to: '/community', label: 'Community' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About', icon: Info },
  { to: '/support', label: 'Support', icon: HelpCircle },
];

export default function Navbar({ onLoginClick, onSignupClick }) {
  const navigate = useNavigate();
  const {
    addSearchHistory,
    cart,
    models,
    notifications,
    searchHistory,
    setUser,
    user,
    markNotificationsRead,
  } = useApp();
  const [query, setQuery] = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const searchRef = React.useRef(null);

  const suggestions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models.slice(0, 4);
    return models
      .filter(
        (model) =>
          model.name.toLowerCase().includes(q) ||
          model.creator.toLowerCase().includes(q) ||
          model.tags.some((tag) => tag.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [models, query]);

  React.useEffect(() => {
    const onPointerDown = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const submitSearch = (event, value = query) => {
    event?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    addSearchHistory(trimmed);
    setSearchOpen(false);
    setMobileOpen(false);
    navigate(`/browse?q=${encodeURIComponent(trimmed)}`);
  };

  const handleLogout = () => {
    setUser(null);
    setUserOpen(false);
    setMobileOpen(false);
  };

  const unread = notifications.filter((item) => item.unread).length;

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          <Box size={24} />
          <span>Voxel Market</span>
        </Link>

        <button
          className="nav-mobile-toggle"
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {primaryLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <div
            className="dropdown-container"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className="nav-link dropdown-trigger"
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
            >
              More <ChevronDown size={14} />
            </button>
            <div className={`dropdown-menu ${moreOpen ? 'open' : ''}`}>
              {moreLinks.map((link) => {
                const Icon = link.icon || Sparkles;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="dropdown-item"
                    onClick={() => {
                      setMoreOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <form className="nav-search" onSubmit={submitSearch} role="search" ref={searchRef}>
          <Search size={16} />
          <label className="visually-hidden" htmlFor="nav-search-input">
            Search models
          </label>
          <input
            id="nav-search-input"
            type="search"
            placeholder="Search models, creators, tags..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            autoComplete="off"
          />
          {searchOpen && (
            <div className="search-popover" role="listbox" aria-label="Search suggestions">
              <div className="search-popover-section">
                <div className="search-popover-title">Instant results</div>
                {suggestions.map((model) => (
                  <Link
                    key={model.id}
                    to={`/model/${model.id}`}
                    className="search-suggestion"
                    onClick={() => setSearchOpen(false)}
                  >
                    <img src={model.image} alt="" />
                    <span>
                      <strong>{model.name}</strong>
                      <small>{model.category} by {model.creator}</small>
                    </span>
                    <em>{model.price}</em>
                  </Link>
                ))}
              </div>
              <div className="search-popover-section">
                <div className="search-popover-title">Trending</div>
                <div className="search-chip-row">
                  {TRENDING_SEARCHES.slice(0, 4).map((term) => (
                    <button key={term} type="button" onClick={(event) => submitSearch(event, term)}>
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div className="search-popover-section">
                <div className="search-popover-title">Recent</div>
                <div className="search-chip-row">
                  {searchHistory.slice(0, 4).map((term) => (
                    <button key={term} type="button" onClick={(event) => submitSearch(event, term)}>
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="nav-actions">
          <Link to="/cart" className="nav-cart" aria-label={`Open cart (${cart.length} items)`}>
            <ShoppingCart size={18} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>

          {user && (
            <div className="dropdown-container">
              <button
                className="nav-cart"
                type="button"
                onClick={() => {
                  setNotificationsOpen((open) => !open);
                  markNotificationsRead();
                }}
                aria-label={`Open notifications (${unread} unread)`}
                aria-expanded={notificationsOpen}
              >
                <Bell size={18} />
                {unread > 0 && <span className="cart-badge">{unread}</span>}
              </button>
              <div className={`dropdown-menu notifications-menu ${notificationsOpen ? 'open' : ''}`}>
                {notifications.map((item) => (
                  <div className="notification-item" key={item.id}>
                    <strong>{item.title}</strong>
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {user ? (
            <div
              className="dropdown-container"
              onMouseEnter={() => setUserOpen(true)}
              onMouseLeave={() => setUserOpen(false)}
            >
              <button
                className="dropdown-trigger user-trigger"
                type="button"
                onClick={() => setUserOpen((open) => !open)}
                aria-expanded={userOpen}
              >
                <User size={18} />
                <span>{user.name}</span>
                <ChevronDown size={14} />
              </button>
              <div className={`dropdown-menu ${userOpen ? 'open' : ''}`}>
                <div className="dropdown-user">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <Link to="/profile" className="dropdown-item" onClick={() => setUserOpen(false)}>
                  <User size={16} /> Profile
                </Link>
                <Link to="/dashboard" className="dropdown-item" onClick={() => setUserOpen(false)}>
                  <Sparkles size={16} /> Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="dropdown-item" onClick={() => setUserOpen(false)}>
                    <ShieldCheck size={16} /> Admin Panel
                  </Link>
                )}
                <Link to="/settings" className="dropdown-item" onClick={() => setUserOpen(false)}>
                  <Settings size={16} /> Settings
                </Link>
                <button className="dropdown-item danger" type="button" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="btn-login" type="button" onClick={onLoginClick}>
                Log in
              </button>
              <button className="btn-signup" type="button" onClick={onSignupClick}>
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
