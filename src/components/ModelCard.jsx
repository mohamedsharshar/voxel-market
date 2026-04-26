import React from 'react';
import { Heart, BadgeCheck } from 'lucide-react';

export default function ModelCard({ model, nameWhite = false }) {
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(model.likes);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(l => !l);
    setLikes(l => liked ? l - 1 : l + 1);
  };

  return (
    <div className="model-card">
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
