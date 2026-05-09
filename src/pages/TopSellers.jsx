import React from 'react';
import { Award, BadgeCheck, Box, DollarSign, Star, TrendingUp } from 'lucide-react';
import CreatorCard from '../components/CreatorCard';
import SectionHeader from '../components/SectionHeader';
import { useApp } from '../context/AppContext';

export default function TopSellers() {
  const { creators } = useApp();
  const ranked = React.useMemo(() => [...creators].sort((a, b) => b.sales - a.sales), [creators]);

  return (
    <div className="page">
      <div className="page-kicker">
        <Award size={15} /> Creator economy
      </div>
      <SectionHeader
        title="Top Sellers"
        description="Creators with the strongest buyer trust, sales consistency, and review quality."
      />

      <section className="seller-leaderboard">
        {ranked.slice(0, 3).map((creator, index) => (
          <article className="leaderboard-card" key={creator.id}>
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
          </article>
        ))}
      </section>

      <div className="creator-directory-meta">
        <span>
          <Box size={15} /> {ranked.reduce((sum, creator) => sum + creator.models, 0)} models
        </span>
        <span>
          <BadgeCheck size={15} /> {ranked.filter((creator) => creator.verified).length} verified sellers
        </span>
      </div>

      <div className="creators-grid">
        {ranked.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
}
