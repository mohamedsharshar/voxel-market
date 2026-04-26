import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import ModelCard from '../components/ModelCard';
import { MODELS } from '../data';

const CATEGORIES = ['All Categories', 'Characters', 'Vehicles', 'Weapons', 'Environment', 'Creatures'];
const SORT_OPTIONS = ['Newest First', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

function CustomSelect({ value, options, onChange }) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <div style={{ position: 'relative' }}>
      <button
        className={`custom-select-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span>{value}</span>
        <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
      </button>
      
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
          <div className="custom-select-menu">
            {options.map(opt => (
              <div
                key={opt}
                className={`custom-select-option ${value === opt ? 'active' : ''}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
                {value === opt && <Check size={14} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Browse() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get('q') || '');
  const [category, setCategory] = React.useState('All Categories');
  const [sort, setSort] = React.useState('Newest First');
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);
  const [catOpen, setCatOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    let list = [...MODELS];
    if (search) list = list.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.creator.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'All Categories') list = list.filter(m => m.category === category);
    if (verifiedOnly) list = list.filter(m => m.verified);
    if (sort === 'Price: Low to High')
      list.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    if (sort === 'Price: High to Low')
      list.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
    return list;
  }, [search, category, sort, verifiedOnly]);

  return (
    <div className="page">
      <h1 className="browse-page-title">Browse Catalog</h1>
      <p className="browse-page-sub">Discover high-quality 3D assets for your projects.</p>

      <div className="browse-layout">
        {/* SIDEBAR */}
        <aside className="filters-sidebar">
          <div className="filters-title">
            <SlidersHorizontal size={16} /> Filters
          </div>

          {/* Search */}
          <div className="filter-group">
            <div className="filter-input-wrap">
              <Search size={14} />
              <input
                className="filter-input"
                placeholder="Search models..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
          </div>

          {/* Category */}
          <div className="filter-group">
            <div className="filter-label">Category</div>
            <CustomSelect
              value={category}
              options={CATEGORIES}
              onChange={setCategory}
            />
          </div>

          {/* Sort */}
          <div className="filter-group">
            <div className="filter-label">Sort By</div>
            <CustomSelect
              value={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
            />
          </div>

          {/* Verified Toggle */}
          <div className="filter-group">
            <div className="filter-toggle">
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Verified Creators Only</span>
              <div
                className={`toggle-switch${verifiedOnly ? ' on' : ''}`}
                onClick={() => setVerifiedOnly(v => !v)}
              >
                <div className="toggle-knob" />
              </div>
            </div>
          </div>

          <button
            className="btn-reset"
            onClick={() => { setSearch(''); setCategory('All Categories'); setSort('Newest First'); setVerifiedOnly(false); }}
          >
            Reset Filters
          </button>
        </aside>

        {/* GRID */}
        <div className="browse-grid">
          {filtered.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', padding: '60px 0', textAlign: 'center' }}>
              No models found.
            </div>
          ) : (
            <div className="models-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {filtered.map(m => <ModelCard key={m.id} model={m} nameWhite />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
