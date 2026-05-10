import React from 'react';
import { BadgeCheck, Search, Users } from 'lucide-react';
import CreatorCard from '../components/CreatorCard';
import EmptyState from '../components/EmptyState';
import SectionHeader from '../components/SectionHeader';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Creators() {
  const { creators } = useApp();
  const [search, setSearch] = React.useState('');
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);

  const filtered = creators.filter((creator) => {
    const query = search.toLowerCase();
    const matches =
      !query ||
      creator.name.toLowerCase().includes(query) ||
      creator.handle.toLowerCase().includes(query) ||
      creator.specialty.toLowerCase().includes(query);
    return matches && (!verifiedOnly || creator.verified);
  });

  return (
    <PageTransition className="page">
      <div className="page-kicker">
        <Users size={15} /> Creator directory
      </div>
      <SectionHeader
        title="Discover Creators"
        description="Find specialists by style, discipline, support history, and marketplace performance."
        actionLabel="Top sellers"
        actionTo="/top-sellers"
      />

      <div className="creators-toolbar">
        <div className="creators-search-wrap">
          <Search size={16} />
          <label className="visually-hidden" htmlFor="creator-search">
            Search creators
          </label>
          <input
            id="creator-search"
            placeholder="Search by creator, handle, or specialty..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <button
          className={`filter-token ${verifiedOnly ? 'active' : ''}`}
          type="button"
          onClick={() => setVerifiedOnly((value) => !value)}
          aria-pressed={verifiedOnly}
        >
          <BadgeCheck size={14} />
          Verified only
        </button>
      </div>

      <div className="creator-directory-meta">
        <span>{filtered.length} creators</span>
        <span>{filtered.reduce((sum, creator) => sum + creator.models, 0)} models</span>
        <span>{filtered.filter((creator) => creator.verified).length} verified</span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No creators match your search"
          message="Try a broader specialty, handle, or creator name."
        />
      ) : (
        <motion.div 
          className="creators-grid"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
        >
          {filtered.map((creator) => (
            <motion.div key={creator.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <CreatorCard creator={creator} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageTransition>
  );
}
