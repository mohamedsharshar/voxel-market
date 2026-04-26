import React from 'react';
import { BadgeCheck, Box, DollarSign } from 'lucide-react';

export default function CreatorCard({ creator }) {
  return (
    <div className="creator-card">
      <div className="creator-avatar">
        {creator.initial}
        {creator.verified && (
          <span className="creator-verified">
            <BadgeCheck size={14} />
          </span>
        )}
      </div>
      <div className="creator-name">{creator.name}</div>
      <div className="creator-handle">{creator.handle}</div>
      <div className="creator-bio">{creator.bio}</div>
      <div className="creator-stats">
        <span className="creator-stat"><Box size={13} /> {creator.models}</span>
        <span className="creator-stat"><DollarSign size={13} /> {creator.sales} sales</span>
      </div>
    </div>
  );
}
