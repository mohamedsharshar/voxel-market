import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  BadgeCheck,
  Box,
  Calendar,
  ChevronLeft,
  DollarSign,
  Heart,
  Link as LinkIcon,
  MapPin,
  Star,
  Users,
} from 'lucide-react';
import EmptyState from '../components/EmptyState';
import ModelCard from '../components/ModelCard';
import SectionHeader from '../components/SectionHeader';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function CreatorProfile() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { creators, followedCreators, models, toggleFollowCreator } = useApp();
  const creator = creators.find((item) => item.name.toLowerCase().replace(/\s+/g, '-') === name);

  if (!creator) {
    return (
      <PageTransition className="page">
        <EmptyState
          icon={Users}
          title="Creator not found"
          message="Browse the creator directory to find artists and teams."
          action={
            <button className="btn-primary" type="button" onClick={() => navigate('/creators')}>
              Browse Creators
            </button>
          }
        />
      </PageTransition>
    );
  }

  const creatorModels = models.filter((model) => model.creator === creator.name);
  const followed = followedCreators.includes(creator.name);

  return (
    <PageTransition className="page">
      <button className="back-button" type="button" onClick={() => navigate(-1)}>
        <ChevronLeft size={18} />
        Back
      </button>

      <motion.section 
        className="creator-profile-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img className="creator-profile-banner" src={creator.banner} alt="" />
        <div className="creator-profile-content-row">
          <div className="creator-profile-avatar">
            <img src={creator.avatar} alt={creator.name} />
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
              <span>
                <Calendar size={14} />
                Joined {creator.joined}
              </span>
              <span>
                <MapPin size={14} />
                {creator.location}
              </span>
              <span>
                <LinkIcon size={14} />
                portfolio.example
              </span>
            </div>
          </div>

          <button
            className={`btn-follow ${followed ? 'following' : ''}`}
            type="button"
            onClick={() => toggleFollowCreator(creator.name)}
          >
            <Heart size={17} fill={followed ? 'currentColor' : 'none'} />
            {followed ? 'Following' : 'Follow'}
          </button>
        </div>
      </motion.section>

      <motion.section 
        className="creator-profile-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="profile-stat">
          <Box size={19} />
          <span>
            <strong>{creator.models}</strong>
            Models
          </span>
        </div>
        <div className="profile-stat">
          <DollarSign size={19} />
          <span>
            <strong>{creator.sales}</strong>
            Sales
          </span>
        </div>
        <div className="profile-stat">
          <Star size={19} fill="currentColor" />
          <span>
            <strong>{creator.rating}</strong>
            Rating
          </span>
        </div>
        <div className="profile-stat">
          <Users size={19} />
          <span>
            <strong>{creator.followers}</strong>
            Followers
          </span>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeader
          eyebrow={creator.specialty}
          title={`Published Models (${creatorModels.length})`}
          description="Assets from this creator with consistent presentation, support, and technical metadata."
        />
        {creatorModels.length > 0 ? (
          <div className="models-grid">
            {creatorModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <EmptyState title="No models published yet" message="Follow the creator to get notified when they upload." />
        )}
      </motion.section>

      <motion.section 
        className="creator-cta compact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <div className="eyebrow">Creator support</div>
          <h2>Need custom variations or source files?</h2>
          <p>Contact the creator after purchase, or follow for update notifications and new packs.</p>
        </div>
        <Link className="btn-secondary" to="/support">
          Contact Support
        </Link>
      </motion.section>
    </PageTransition>
  );
}
