import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <Box size={20} />
            Voxel Market
          </div>
          <p className="footer-desc">
            A curated marketplace for game-ready 3D meshes, props, and characters.
            Built for independent creators and indie devs.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Explore</div>
          <div className="footer-links">
            <Link to="/browse">All Models</Link>
            <Link to="/browse">Popular</Link>
            <Link to="/creators">Creators</Link>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Creators</div>
          <div className="footer-links">
            <a href="#sell">Sell Models</a>
            <a href="#dash">Dashboard</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Voxel Market. All rights reserved.</span>
        <div className="footer-legal">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
