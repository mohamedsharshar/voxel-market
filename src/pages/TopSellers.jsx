import React from 'react';
import { Award, BadgeCheck, Box, DollarSign, Star, TrendingUp } from 'lucide-react';
import CreatorCard from '../components/CreatorCard';
import SectionHeader from '../components/SectionHeader';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function TopSellers() {
  const { creators } = useApp();
  const ranked = React.useMemo(() => [...creators].sort((a, b) => b.sales - a.sales), [creators]);

  return (
    <PageTransition className="page">
      <div className="page-kicker">
        <Award size={15} /> Creator economy
      </div>
      <SectionHeader
        title="Top Sellers"
        description="Creators with the strongest buyer trust, sales consistency, and review quality."
      />

      <motion.section 
        className="seller-leaderboard"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {ranked.slice(0, 3).map((creator, index) => (
          <motion.article 
            className="leaderboard-card" 
            key={creator.id}
            variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
          >
            <span className="leaderboard-rank">#{index + 1}</span>
            <img src={creator.avatar} alt={creator.name} />
            <div>
              <strong>
                {creator.name}
                {creator.verified && <BadgeCheck size={16} />}
              </strong>
              <span>{creator.specialty}</span>
            </div>
            <div className="leaderboard-metrics">
              <span>
                <DollarSign size={14} /> {creator.sales} sales
              </span>
              <span>
                <Star size={14} fill="currentColor" /> {creator.rating}
              </span>
              <span>
                <TrendingUp size={14} /> {creator.followers}
              </span>
            </div>
          </motion.article>
        ))}
      </motion.section>

      <div className="creator-directory-meta">
        <span>
          <Box size={15} /> {ranked.reduce((sum, creator) => sum + creator.models, 0)} models
        </span>
        <span>
          <BadgeCheck size={15} /> {ranked.filter((creator) => creator.verified).length} verified sellers
        </span>
      </div>

      <motion.div 
        className="creators-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.3 } }
        }}
      >
        {ranked.map((creator) => (
          <motion.div key={creator.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <CreatorCard creator={creator} />
          </motion.div>
        ))}
      </motion.div>
    </PageTransition>
  );
}
