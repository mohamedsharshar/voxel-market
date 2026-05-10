import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { COMMUNITY_POSTS } from '../data';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Community() {
  const { showToast } = useApp();

  return (
    <PageTransition className="page">
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

      <motion.div 
        className="community-grid large"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {COMMUNITY_POSTS.map((post) => (
          <motion.article 
            className="community-card" 
            key={post.id}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
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
          </motion.article>
        ))}
      </motion.div>
    </PageTransition>
  );
}
