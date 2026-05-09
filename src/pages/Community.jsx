import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { COMMUNITY_POSTS } from '../data';
import { useApp } from '../context/AppContext';

export default function Community() {
  const { showToast } = useApp();

  return (
    <div className="page">
      <div className="page-kicker">
        <Sparkles size={15} /> Community Showcase
      </div>
      <div className="section-header">
        <div>
          <h1 className="section-title">What Creators Are Building</h1>
          <p className="section-description">
            Featured scenes, prototypes, and studies made with marketplace-ready 3D assets.
          </p>
        </div>
      </div>

      <div className="community-grid large">
        {COMMUNITY_POSTS.map((post) => (
          <article className="community-card" key={post.id}>
            <img src={post.image} alt={post.title} />
            <div>
              <span>
                <Sparkles size={13} /> {post.creator}
              </span>
              <strong>{post.title}</strong>
              <small>
                <Star size={13} fill="currentColor" /> {post.likes.toLocaleString()} appreciations
              </small>
              <button type="button" onClick={() => showToast('Showcase saved for later', 'success')}>
                <Heart size={15} /> Save showcase
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
