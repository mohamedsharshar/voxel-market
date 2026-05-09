import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  Box,
  Eye,
  Heart,
  Layers3,
  ShoppingCart,
  Star,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QuickViewModal({ model, onClose }) {
  const { addToCart, cart, toggleWishlist, wishlist } = useApp();
  const modalRef = React.useRef(null);
  const inCart = cart.some((item) => item.id === model.id);
  const saved = wishlist.some((item) => item.id === model.id);

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    window.setTimeout(() => modalRef.current?.focus(), 10);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay quick-view-overlay" onMouseDown={onClose}>
      <section
        className="quick-view-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`quick-view-${model.id}`}
        tabIndex={-1}
        ref={modalRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close quick view">
          <X size={18} />
        </button>

        <div className="quick-view-media">
          <img src={model.image} alt={model.name} />
          <div className="quick-view-price">{model.price}</div>
          <div className="quick-view-badges">
            {model.gameReady && (
              <span>
                <Zap size={13} /> Game-ready
              </span>
            )}
            {model.pbr && (
              <span>
                <Layers3 size={13} /> PBR
              </span>
            )}
          </div>
        </div>

        <div className="quick-view-body">
          <div className="eyebrow">{model.category}</div>
          <h2 id={`quick-view-${model.id}`}>{model.name}</h2>
          <p>{model.description}</p>

          <Link to={`/creator/${model.creator.replace(/\s+/g, '-').toLowerCase()}`} className="inline-creator">
            <span className="creator-avatar-mini">{model.creator[0]}</span>
            <span>{model.creator}</span>
            {model.verified && <BadgeCheck size={15} />}
          </Link>

          <div className="quick-view-stats" aria-label="Model statistics">
            <span>
              <Star size={14} /> {model.rating}
            </span>
            <span>
              <Eye size={14} /> {model.views}
            </span>
            <span>
              <Box size={14} /> {model.polygons.toLocaleString()} polys
            </span>
          </div>

          <div className="quick-view-actions">
            <button
              className="btn-primary"
              type="button"
              onClick={() => addToCart(model)}
              disabled={inCart}
            >
              <ShoppingCart size={17} />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button
              className={`btn-secondary ${saved ? 'is-saved' : ''}`}
              type="button"
              onClick={() => toggleWishlist(model)}
            >
              <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save'}
            </button>
            <Link className="btn-ghost" to={`/model/${model.id}`}>
              Full Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
