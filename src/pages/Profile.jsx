import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Download, Heart, History, PackageCheck, Star, User } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import ModelCard from '../components/ModelCard';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Profile() {
  const { notifications, recentlyViewed, user, wishlist } = useApp();

  if (!user) {
    return (
      <PageTransition className="page">
        <EmptyState
          icon={User}
          title="Sign in to view your profile"
          message="Your profile brings together downloads, saved assets, creator follows, and account preferences."
          action={
            <Link className="btn-primary" to="/browse">
              Continue Browsing
            </Link>
          }
        />
      </PageTransition>
    );
  }

  const downloads = recentlyViewed.slice(0, 3);

  return (
    <PageTransition className="page">
      <motion.section 
        className="profile-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</div>
        <div>
          <div className="page-kicker">Buyer workspace</div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        <Link className="btn-secondary" to="/settings">
          Edit Profile
        </Link>
      </motion.section>

      <motion.section 
        className="dashboard-metrics"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="metric-card">
          <Heart size={20} />
          <strong>{wishlist.length}</strong>
          <span>Saved assets</span>
        </div>
        <div className="metric-card">
          <History size={20} />
          <strong>{recentlyViewed.length}</strong>
          <span>Recently viewed</span>
        </div>
        <div className="metric-card">
          <Download size={20} />
          <strong>{downloads.length}</strong>
          <span>Downloads</span>
        </div>
        <div className="metric-card">
          <Bell size={20} />
          <strong>{notifications.length}</strong>
          <span>Notifications</span>
        </div>
      </motion.section>

      <div className="profile-grid">
        <motion.section 
          className="panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="panel-heading">
            <h2>Download History</h2>
            <PackageCheck size={18} />
          </div>
          {downloads.length === 0 ? (
            <p className="muted">Purchased downloads will appear here after checkout.</p>
          ) : (
            <div className="compact-list">
              {downloads.map((model) => (
                <Link key={model.id} to={`/model/${model.id}`}>
                  <img src={model.image} alt="" />
                  <span>
                    <strong>{model.name}</strong>
                    <small>{model.formats}</small>
                  </span>
                  <em>Download</em>
                </Link>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section 
          className="panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="panel-heading">
            <h2>Reviews & Ratings</h2>
            <Star size={18} />
          </div>
          <div className="review-card compact">
            <div>
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
            </div>
            <strong>Ready to review your next purchase</strong>
            <p>Review prompts appear after checkout so creators receive structured feedback.</p>
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-header">
          <div>
            <div className="eyebrow">Saved</div>
            <h2 className="section-title">Wishlist</h2>
          </div>
          <Link className="view-all" to="/wishlist">
            Open Wishlist
          </Link>
        </div>
        {wishlist.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No saved models yet"
            message="Use the heart action on model cards to save assets for later."
          />
        ) : (
          <div className="models-grid models-grid-4">
            {wishlist.slice(0, 4).map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </motion.section>
    </PageTransition>
  );
}
