import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BadgeCheck, Box, DollarSign, MapPin, Link as LinkIcon, Calendar, ChevronLeft } from 'lucide-react';
import { CREATORS, MODELS } from '../data';
import ModelCard from '../components/ModelCard';

export default function CreatorProfile() {
  const { name } = useParams();
  const navigate = useNavigate();
  
  const creator = CREATORS.find(c => 
    c.name.toLowerCase().replace(/\s+/g, '-') === name
  );

  if (!creator) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Creator not found</h2>
        <button className="btn-primary" onClick={() => navigate('/creators')}>
          Browse Creators
        </button>
      </div>
    );
  }

  const creatorModels = MODELS.filter(m => m.creator === creator.name);

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={18} />
        Back
      </button>

      <div className="creator-profile-header">
        <div className="creator-profile-avatar">
          {creator.initial}
          {creator.verified && (
            <span className="creator-verified-badge">
              <BadgeCheck size={20} />
            </span>
          )}
        </div>
        
        <div className="creator-profile-info">
          <h1 className="creator-profile-name">
            {creator.name}
            {creator.verified && <BadgeCheck size={24} />}
          </h1>
          <div className="creator-profile-handle">{creator.handle}</div>
          <p className="creator-profile-bio">{creator.bio}</p>
          
          <div className="creator-profile-meta">
            <span className="meta-item">
              <Calendar size={14} />
              Joined March 2024
            </span>
            <span className="meta-item">
              <MapPin size={14} />
              San Francisco, CA
            </span>
            <span className="meta-item">
              <LinkIcon size={14} />
              <a href="#" onClick={(e) => e.preventDefault()}>portfolio.com</a>
            </span>
          </div>

          <div className="creator-profile-stats">
            <div className="profile-stat">
              <Box size={18} />
              <div>
                <div className="stat-value">{creator.models}</div>
                <div className="stat-label">Models</div>
              </div>
            </div>
            <div className="profile-stat">
              <DollarSign size={18} />
              <div>
                <div className="stat-value">{creator.sales}</div>
                <div className="stat-label">Sales</div>
              </div>
            </div>
            <div className="profile-stat">
              <BadgeCheck size={18} />
              <div>
                <div className="stat-value">4.9</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
          </div>

          <button className="btn-follow">Follow Creator</button>
        </div>
      </div>

      <div className="creator-profile-content">
        <h2 className="section-title">Published Models ({creatorModels.length})</h2>
        {creatorModels.length > 0 ? (
          <div className="models-grid models-grid-4">
            {creatorModels.map(m => <ModelCard key={m.id} model={m} />)}
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
            No models published yet.
          </div>
        )}
      </div>
    </div>
  );
}
