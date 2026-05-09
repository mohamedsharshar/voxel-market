import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Github, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Box size={21} />
            Voxel Market
          </Link>
          <p className="footer-desc">
            A production-ready marketplace experience for previewing, buying, selling, and managing
            professional 3D assets.
          </p>
          <div className="footer-socials" aria-label="Social links">
            <a href="https://x.com" aria-label="Twitter">
              <Twitter size={17} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href="https://github.com" aria-label="GitHub">
              <Github size={17} />
            </a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Explore</div>
          <div className="footer-links">
            <Link to="/browse">All Models</Link>
            <Link to="/trending">Trending</Link>
            <Link to="/featured">Featured</Link>
            <Link to="/collections">Collections</Link>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Creators</div>
          <div className="footer-links">
            <Link to="/top-sellers">Top Sellers</Link>
            <Link to="/dashboard">Creator Dashboard</Link>
            <Link to="/community">Community Showcase</Link>
            <Link to="/support">Upload Guidelines</Link>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Company</div>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">Copyright 2026 Voxel Market. All rights reserved.</span>
        <div className="footer-legal">
          <Link to="/support">Terms</Link>
          <Link to="/support">Privacy</Link>
          <Link to="/support">Licensing</Link>
        </div>
      </div>
    </footer>
  );
}
