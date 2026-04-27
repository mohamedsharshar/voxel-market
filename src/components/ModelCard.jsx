import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BadgeCheck, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ModelCard({ model, nameWhite = false }) {
  const navigate = useNavigate();
  const { addToCart, cart } = useApp();
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(model.likes);
  const [showQuickAdd, setShowQuickAdd] = React.useState(false);

  const inCart = cart.some(item => item.id === model.id);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(l => !l);
    setLikes(l => liked ? l - 1 : l + 1);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(model);
  };

  return (
    <div 
      className="model-card"
      onClick={() => navigate(`/model/${model.id}`)}
      onMouseEnter={() => setShowQuickAdd(true)}
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      <div className="model-card-image">
        <img src={model.image} alt={model.name} loading="lazy" />
        <span className="model-card-price">{model.price}</span>
        <button
          className="model-card-like"
          onClick={toggleLike}
          style={{ color: liked ? '#f43f5e' : undefined }}
        >
          <Heart size={14} fill={liked ? '#f43f5e' : 'none'} />
          {likes}
        </button>
        {showQuickAdd && !inCart && (
          <button className="model-card-quick-add" onClick={handleQuickAdd}>
            <ShoppingCart size={16} />
            Quick Add
          </button>
        )}
        {inCart && (
          <div className="model-card-in-cart">
            <ShoppingCart size={14} />
            In Cart
          </div>
        )}
      </div>
      <div className="model-card-body">
        <div className={`model-card-name${nameWhite ? ' white' : ''}`}>{model.name}</div>
        <div className="model-card-meta">
          <span className="model-card-creator">
            {model.creator}
            {model.verified && <BadgeCheck size={13} />}
          </span>
          <span className="model-card-views">{model.views}</span>
        </div>
      </div>
    </div>
  );
}
