import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Box, DollarSign, Heart, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CreatorCard({ creator }) {
  const { followedCreators, toggleFollowCreator } = useApp();
  const followed = followedCreators.includes(creator.name);
  const slug = creator.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <article className="creator-card">
      <Link to={`/creator/${slug}`} className="creator-card-banner" aria-label={`Open ${creator.name}`}>
        <img src={creator.banner} alt="" loading="lazy" />
      </Link>
      <div className="creator-card-body">
        <Link to={`/creator/${slug}`} className="creator-avatar">
          {creator.avatar ? <img src={creator.avatar} alt={creator.name} /> : creator.initial}
          {creator.verified && (
            <span className="creator-verified">
              <BadgeCheck size={14} />
            </span>
          )}
        </Link>
        <div className="creator-card-title-row">
          <div>
            <Link to={`/creator/${slug}`} className="creator-name">
              {creator.name}
            </Link>
            <div className="creator-handle">{creator.handle}</div>
          </div>
          <button
            className={`icon-button ${followed ? 'active' : ''}`}
            type="button"
            onClick={() => toggleFollowCreator(creator.name)}
            aria-label={followed ? `Unfollow ${creator.name}` : `Follow ${creator.name}`}
          >
            <Heart size={16} fill={followed ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p className="creator-bio">{creator.bio}</p>
        <div className="creator-stats">
          <span className="creator-stat">
            <Box size={13} /> {creator.models}
          </span>
          <span className="creator-stat">
            <DollarSign size={13} /> {creator.sales} sales
          </span>
          <span className="creator-stat">
            <Star size={13} fill="currentColor" /> {creator.rating}
          </span>
        </div>
      </div>
    </article>
  );
}
