import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Box } from 'lucide-react';

export default function Navbar({ onLoginClick, onSignupClick }) {
  const navigate = useNavigate();
  const [q, setQ] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/browse?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <Box size={24} />
          Voxel Market
        </Link>

        <div className="nav-links">
          <Link to="/browse" className="nav-link">Browse</Link>
          <Link to="/creators" className="nav-link">Creators</Link>
        </div>

        <form className="nav-search" onSubmit={handleSearch}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search models..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </form>

        <div className="nav-actions">
          <Link to="/browse" className="nav-cart">
            <ShoppingCart size={18} />
          </Link>
          <button className="btn-login" onClick={onLoginClick}>Log in</button>
          <button className="btn-signup" onClick={onSignupClick}>Sign up</button>
        </div>
      </div>
    </nav>
  );
}
