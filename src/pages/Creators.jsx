import React from 'react';
import { Search } from 'lucide-react';
import CreatorCard from '../components/CreatorCard';
import { CREATORS } from '../data';

export default function Creators() {
  const [search, setSearch] = React.useState('');
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);

  const filtered = CREATORS.filter(c => {
    const q = search.toLowerCase();
    const match = !q || c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q);
    return match && (!verifiedOnly || c.verified);
  });

  return (
    <div className="page">
      <h1 className="browse-page-title">Creators Directory</h1>
      <p className="browse-page-sub" style={{ marginBottom: 32, maxWidth: 520 }}>
        Discover talented 3D artists, game developers, and technical directors publishing their work on Voxel Market.
      </p>

      {/* Search + Verified toggle */}
      <div className="creators-search-bar">
        <div className="creators-search-wrap">
          <Search size={15} />
          <input
            placeholder="Search creators by name or handle..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => setVerifiedOnly(v => !v)}
        >
          <div className={`toggle-switch${verifiedOnly ? ' on' : ''}`} style={{ flexShrink: 0 }}>
            <div className="toggle-knob" />
          </div>
          <span style={{ fontSize: 14, color: verifiedOnly ? 'var(--cyan)' : 'var(--text-secondary)' }}>
            Show Verified Only
          </span>
        </div>
      </div>

      <div className="creators-grid">
        {filtered.map(c => <CreatorCard key={c.id} creator={c} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
          No creators found.
        </div>
      )}
    </div>
  );
}
