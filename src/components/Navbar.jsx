import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, Box, ChevronDown, User, LogOut, Settings, ShieldCheck, Info, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar({ onLoginClick, onSignupClick }) {
  const navigate = useNavigate();
  const { cart, user, setUser } = useApp();
  const [q, setQ] = React.useState('');
  
  // State for mobile dropdowns (using CSS hover for desktop, state for fallback)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/browse?q=${encodeURIComponent(q.trim())}`);
  };

  const handleLogout = () => {
    setUser(null);
    setUserDropdownOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <Box size={24} />
          Voxel Market
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/browse"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Browse
          </NavLink>
          <NavLink
            to="/creators"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Creators
          </NavLink>
          
          {/* More Dropdown */}
          <div 
            className="dropdown-container"
            onMouseEnter={() => setMoreDropdownOpen(true)}
            onMouseLeave={() => setMoreDropdownOpen(false)}
          >
            <button className="nav-link dropdown-trigger" style={{ padding: 0 }} onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}>
              More <ChevronDown size={14} />
            </button>
            <div className={`dropdown-menu ${moreDropdownOpen ? 'open' : ''}`} style={{ left: 0, right: 'auto', marginTop: '0.5rem' }}>
              {/* Invisible bridge to prevent hover gap issues */}
              <div style={{ position: 'absolute', top: '-0.5rem', left: 0, right: 0, height: '0.5rem' }} />
              <Link to="/about" className="dropdown-item" onClick={() => setMoreDropdownOpen(false)}>
                <Info size={16} /> About Us
              </Link>
              <Link to="/support" className="dropdown-item" onClick={() => setMoreDropdownOpen(false)}>
                <HelpCircle size={16} /> Support
              </Link>
            </div>
          </div>
        </div>

        <form
          className="nav-search"
          onSubmit={handleSearch}
          role="search"
        >
          <Search size={16} />
          <label className="visually-hidden" htmlFor="nav-search-input">
            Search models
          </label>
          <input
            id="nav-search-input"
            type="text"
            placeholder="Search models..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit" className="visually-hidden">
            Search
          </button>
        </form>

        <div className="nav-actions">
          <NavLink to="/cart" className="nav-cart" aria-label={`Open cart (${cart.length} items)`}>
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="cart-badge" aria-hidden>
                {cart.length}
              </span>
            )}
          </NavLink>
          
          {user ? (
            <div 
              className="dropdown-container"
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button 
                className="dropdown-trigger" 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <User size={18} />
                <span>{user.name}</span>
                <ChevronDown size={14} />
              </button>
              
              <div className={`dropdown-menu ${userDropdownOpen ? 'open' : ''}`} style={{ marginTop: '0.5rem' }}>
                {/* Invisible bridge to prevent hover gap issues */}
                <div style={{ position: 'absolute', top: '-0.5rem', left: 0, right: 0, height: '0.5rem' }} />
                <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-1)' }}>{user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>{user.email}</div>
                </div>
                
                {user.role === 'admin' && (
                  <Link to="/admin" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                    <ShieldCheck size={16} /> Admin Panel
                  </Link>
                )}
                
                <Link to="/settings" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                  <Settings size={16} /> Settings
                </Link>
                
                <button className="dropdown-item danger" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="btn-login" onClick={onLoginClick}>
                Log in
              </button>
              <button className="btn-signup" onClick={onSignupClick}>
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
