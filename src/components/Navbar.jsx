import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Box } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar({ onLoginClick, onSignupClick }) {
  const navigate = useNavigate();
  const { cart } = useApp();
  const [q, setQ] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/browse?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo"> 
          <Box size={24} />
          Voxel Market
        </NavLink>

        <div className="nav-links">
          <NavLink to="/browse" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} aria-current={({isActive}) => isActive ? 'page' : undefined}>Browse</NavLink>
          <NavLink to="/creators" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} aria-current={({isActive}) => isActive ? 'page' : undefined}>Creators</NavLink>
        </div>

        <form className="nav-search" onSubmit={handleSearch} role="search" aria-label="Search models">
          <Search size={16} />
          <label className="visually-hidden" htmlFor="nav-search-input">Search models</label>
          <input
            id="nav-search-input"
            type="text"
            placeholder="Search models..."
            aria-label="Search models"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button type="submit" className="visually-hidden">Search</button>
        </form>

        <div className="nav-actions">
          <NavLink to="/cart" className="nav-cart" aria-label={`Open cart (${cart.length} items)`}>
            <ShoppingCart size={18} />
            {cart.length > 0 && <span className="cart-badge" aria-hidden>{cart.length}</span>}
          </NavLink>
          <button className="btn-login" onClick={onLoginClick}>Log in</button>
          <button className="btn-signup" onClick={onSignupClick}>Sign up</button>
        </div>
      </div>
    </nav>
  );
}
