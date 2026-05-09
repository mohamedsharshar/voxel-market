import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  Box,
  Eye,
  Heart,
  Layers3,
  Maximize2,
  ShoppingCart,
  Star,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import QuickViewModal from './QuickViewModal';

export default function ModelCard({ model, compact = false }) {
  const { addToCart, cart, toggleWishlist, wishlist } = useApp();
  const [quickView, setQuickView] = React.useState(false);
  const inCart = cart.some((item) => item.id === model.id);
  const saved = wishlist.some((item) => item.id === model.id);

  return (
    <>
      <article className={`model-card ${compact ? 'compact' : ''}`}>
        <Link className="model-card-image" to={`/model/${model.id}`} aria-label={`Open ${model.name}`}>
          <img src={model.image} alt={model.name} loading="lazy" />
          <span className="model-card-price">{model.price}</span>
          {model.staffPick && <span className="model-card-ribbon">Staff pick</span>}
          <span className="model-card-shade" aria-hidden />
        </Link>

        <div className="model-card-actions">
          <button
            className={`icon-button ${saved ? 'active' : ''}`}
            type="button"
            onClick={() => toggleWishlist(model)}
            aria-label={saved ? `Remove ${model.name} from wishlist` : `Save ${model.name}`}
            title={saved ? 'Saved' : 'Save'}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={() => setQuickView(true)}
            aria-label={`Quick view ${model.name}`}
            title="Quick view"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        <div className="model-card-body">
          <div className="model-card-topline">
            <span>{model.category}</span>
            <span>
              <Star size={13} fill="currentColor" /> {model.rating}
            </span>
          </div>

          <Link className="model-card-name" to={`/model/${model.id}`}>
            {model.name}
          </Link>

          <Link
            to={`/creator/${model.creator.replace(/\s+/g, '-').toLowerCase()}`}
            className="model-card-creator"
          >
            <span>{model.creator}</span>
            {model.verified && <BadgeCheck size={14} />}
          </Link>

          <div className="model-card-meta">
            <span>
              <Eye size={13} /> {model.views}
            </span>
            <span>
              <Box size={13} /> {(model.polygons / 1000).toFixed(1)}k polys
            </span>
          </div>

          <div className="model-card-tags">
            {model.gameReady && (
              <span>
                <Zap size={12} /> Game-ready
              </span>
            )}
            {model.pbr && (
              <span>
                <Layers3 size={12} /> PBR
              </span>
            )}
          </div>

          <button
            className={`model-card-cart ${inCart ? 'in-cart' : ''}`}
            type="button"
            onClick={() => addToCart(model)}
            disabled={inCart}
          >
            <ShoppingCart size={16} />
            {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </article>

      {quickView && <QuickViewModal model={model} onClose={() => setQuickView(false)} />}
    </>
  );
}
