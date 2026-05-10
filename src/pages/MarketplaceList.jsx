import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, Sparkles, Star, Timer, Wand2 } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import ModelCard from '../components/ModelCard';
import SectionHeader from '../components/SectionHeader';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const configs = {
  trending: {
    icon: Flame,
    eyebrow: 'Live signals',
    title: 'Trending Models',
    description: 'Assets with the strongest current mix of views, saves, and buyer intent.',
  },
  featured: {
    icon: Star,
    eyebrow: 'Curated',
    title: 'Featured Models',
    description: 'Staff-reviewed models with strong presentation, metadata, and production readiness.',
  },
  wishlist: {
    icon: Heart,
    eyebrow: 'Saved',
    title: 'Wishlist',
    description: 'Models you saved for comparison, purchase planning, or team review.',
  },
  recentlyViewed: {
    icon: Timer,
    eyebrow: 'History',
    title: 'Recently Viewed',
    description: 'Your latest product inspections, kept close so comparison is low effort.',
  },
  recommendations: {
    icon: Wand2,
    eyebrow: 'Personalized',
    title: 'Recommendations',
    description: 'High-rated, production-ready models matched to common game development needs.',
  },
};

export default function MarketplaceList({ type }) {
  const { models, recentlyViewed, wishlist } = useApp();
  const config = configs[type] || configs.featured;
  const Icon = config.icon || Sparkles;

  const items = React.useMemo(() => {
    if (type === 'trending') return models.filter((model) => model.trending);
    if (type === 'featured') return models.filter((model) => model.featured);
    if (type === 'wishlist') return wishlist;
    if (type === 'recentlyViewed') return recentlyViewed;
    if (type === 'recommendations') {
      return [...models]
        .filter((model) => model.gameReady || model.pbr)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
    }
    return models;
  }, [models, recentlyViewed, type, wishlist]);

  return (
    <PageTransition className="page">
      <div className="page-kicker">
        <Icon size={15} /> {config.eyebrow}
      </div>
      <SectionHeader title={config.title} description={config.description} />

      {items.length === 0 ? (
        <EmptyState
          icon={Icon}
          title="Nothing here yet"
          message="Browse the catalog and save or inspect models to populate this page."
          action={
            <Link className="btn-primary" to="/browse">
              Browse Models
            </Link>
          }
        />
      ) : (
        <motion.div 
          className="models-grid"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
        >
          {items.map((model) => (
            <motion.div key={model.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <ModelCard model={model} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageTransition>
  );
}
