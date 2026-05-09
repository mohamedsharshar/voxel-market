import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BadgeCheck,
  Box,
  Check,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import EmptyState from '../components/EmptyState';
import ModelCard from '../components/ModelCard';
import SkeletonGrid from '../components/SkeletonGrid';
import { CATEGORIES, TRENDING_SEARCHES } from '../data';
import { useApp } from '../context/AppContext';

const FILE_TYPES = ['GLB', 'FBX', 'OBJ', 'BLEND', 'USDZ'];
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Best match' },
  { value: 'popular', label: 'Most popular' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'polys-asc', label: 'Lowest polygons' },
];

function ToggleFilter({ active, children, onClick }) {
  return (
    <button className={`filter-token ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      {active && <Check size={13} />}
      {children}
    </button>
  );
}

export default function Browse() {
  const [searchParams] = useSearchParams();
  const { addSearchHistory, models, searchHistory } = useApp();
  const initialCategory = searchParams.get('category');
  const [search, setSearch] = React.useState(searchParams.get('q') || '');
  const [categories, setCategories] = React.useState(initialCategory ? [initialCategory] : []);
  const [sort, setSort] = React.useState('relevance');
  const [priceMax, setPriceMax] = React.useState(60);
  const [polyMax, setPolyMax] = React.useState(30000);
  const [fileTypes, setFileTypes] = React.useState([]);
  const [flags, setFlags] = React.useState({
    verified: false,
    rigged: false,
    animated: false,
    lowPoly: false,
    pbr: false,
    gameReady: false,
  });
  const [loading, setLoading] = React.useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 280);
    return () => window.clearTimeout(timer);
  }, [categories, fileTypes, flags, polyMax, priceMax, search, sort]);

  React.useEffect(() => {
    const nextQuery = searchParams.get('q') || '';
    setSearch(nextQuery);
  }, [searchParams]);

  const suggestions = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return models
      .filter(
        (model) =>
          model.name.toLowerCase().includes(q) ||
          model.creator.toLowerCase().includes(q) ||
          model.tags.some((tag) => tag.toLowerCase().includes(q))
      )
      .slice(0, 4);
  }, [models, search]);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    const next = models.filter((model) => {
      const matchesSearch =
        !q ||
        model.name.toLowerCase().includes(q) ||
        model.creator.toLowerCase().includes(q) ||
        model.category.toLowerCase().includes(q) ||
        model.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesCategory = categories.length === 0 || categories.includes(model.category);
      const matchesPrice = model.priceValue <= priceMax;
      const matchesPolys = model.polygons <= polyMax;
      const matchesFile = fileTypes.length === 0 || fileTypes.some((type) => model.fileTypes.includes(type));
      const matchesFlags =
        (!flags.verified || model.verified) &&
        (!flags.rigged || model.rigged) &&
        (!flags.animated || model.animated) &&
        (!flags.lowPoly || model.lowPoly) &&
        (!flags.pbr || model.pbr) &&
        (!flags.gameReady || model.gameReady);

      return matchesSearch && matchesCategory && matchesPrice && matchesPolys && matchesFile && matchesFlags;
    });

    if (sort === 'popular') next.sort((a, b) => b.likes - a.likes);
    if (sort === 'rating') next.sort((a, b) => b.rating - a.rating);
    if (sort === 'price-asc') next.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === 'price-desc') next.sort((a, b) => b.priceValue - a.priceValue);
    if (sort === 'polys-asc') next.sort((a, b) => a.polygons - b.polygons);

    return next;
  }, [categories, fileTypes, flags, models, polyMax, priceMax, search, sort]);

  const activeFilterCount =
    categories.length +
    fileTypes.length +
    Object.values(flags).filter(Boolean).length +
    (priceMax < 60 ? 1 : 0) +
    (polyMax < 30000 ? 1 : 0);

  const toggleCategory = (category) => {
    setCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category]
    );
  };

  const toggleFileType = (type) => {
    setFileTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  };

  const setFlag = (key) => {
    setFlags((current) => ({ ...current, [key]: !current[key] }));
  };

  const resetFilters = () => {
    setSearch('');
    setCategories([]);
    setFileTypes([]);
    setFlags({
      verified: false,
      rigged: false,
      animated: false,
      lowPoly: false,
      pbr: false,
      gameReady: false,
    });
    setPriceMax(60);
    setPolyMax(30000);
    setSort('relevance');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (search.trim()) addSearchHistory(search);
  };

  const filters = (
    <aside className="filters-sidebar" aria-label="Advanced filters">
      <div className="filters-title">
        <SlidersHorizontal size={16} />
        Filters
        {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
      </div>

      <div className="filter-group">
        <div className="filter-label">Categories</div>
        <div className="filter-token-grid">
          {CATEGORIES.map((category) => (
            <ToggleFilter
              key={category.name}
              active={categories.includes(category.name)}
              onClick={() => toggleCategory(category.name)}
            >
              {category.name}
            </ToggleFilter>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-label">Price range</div>
        <div className="range-row">
          <span>$0</span>
          <strong>${priceMax}</strong>
        </div>
        <input
          className="cyan-slider wide"
          type="range"
          min="8"
          max="60"
          value={priceMax}
          onChange={(event) => setPriceMax(Number(event.target.value))}
        />
      </div>

      <div className="filter-group">
        <div className="filter-label">Polygon budget</div>
        <div className="range-row">
          <span>0</span>
          <strong>{polyMax.toLocaleString()}</strong>
        </div>
        <input
          className="cyan-slider wide"
          type="range"
          min="3000"
          max="30000"
          step="500"
          value={polyMax}
          onChange={(event) => setPolyMax(Number(event.target.value))}
        />
      </div>

      <div className="filter-group">
        <div className="filter-label">File types</div>
        <div className="filter-token-grid">
          {FILE_TYPES.map((type) => (
            <ToggleFilter key={type} active={fileTypes.includes(type)} onClick={() => toggleFileType(type)}>
              {type}
            </ToggleFilter>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-label">Production flags</div>
        <div className="filter-token-grid">
          <ToggleFilter active={flags.verified} onClick={() => setFlag('verified')}>
            Verified
          </ToggleFilter>
          <ToggleFilter active={flags.rigged} onClick={() => setFlag('rigged')}>
            Rigged
          </ToggleFilter>
          <ToggleFilter active={flags.animated} onClick={() => setFlag('animated')}>
            Animated
          </ToggleFilter>
          <ToggleFilter active={flags.lowPoly} onClick={() => setFlag('lowPoly')}>
            Low poly
          </ToggleFilter>
          <ToggleFilter active={flags.pbr} onClick={() => setFlag('pbr')}>
            PBR
          </ToggleFilter>
          <ToggleFilter active={flags.gameReady} onClick={() => setFlag('gameReady')}>
            Game-ready
          </ToggleFilter>
        </div>
      </div>

      <button className="btn-reset" type="button" onClick={resetFilters}>
        <RotateCcw size={15} /> Reset filters
      </button>
    </aside>
  );

  return (
    <div className="page browse-page">
      <div className="page-kicker">
        <Sparkles size={15} /> Marketplace discovery
      </div>
      <div className="browse-heading">
        <div>
          <h1 className="browse-page-title">Browse Catalog</h1>
          <p className="browse-page-sub">
            Search, filter, compare, and inspect production-ready 3D models without losing context.
          </p>
        </div>
        <button
          className="btn-secondary filter-mobile-button"
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="discovery-toolbar">
        <form className="browse-search-card" onSubmit={handleSearchSubmit}>
          <Search size={18} />
          <label htmlFor="browse-search" className="visually-hidden">
            Search models
          </label>
          <input
            id="browse-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by model, creator, category, or tag..."
          />
          {search && (
            <button className="search-clear" type="button" onClick={() => setSearch('')} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </form>
        <label className="sort-control">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="search-assist">
        {suggestions.length > 0 && (
          <div>
            <strong>Instant results</strong>
            {suggestions.map((model) => (
              <button key={model.id} type="button" onClick={() => setSearch(model.name)}>
                <img src={model.image} alt="" />
                {model.name}
              </button>
            ))}
          </div>
        )}
        <div>
          <strong>Trending</strong>
          {TRENDING_SEARCHES.slice(0, 4).map((term) => (
            <button key={term} type="button" onClick={() => setSearch(term)}>
              {term}
            </button>
          ))}
        </div>
        <div>
          <strong>History</strong>
          {searchHistory.slice(0, 4).map((term) => (
            <button key={term} type="button" onClick={() => setSearch(term)}>
              {term}
            </button>
          ))}
        </div>
      </div>

      <div className="browse-layout">
        {filters}

        <section className="browse-grid" aria-live="polite">
          <div className="results-summary">
            <span>
              <Box size={15} />
              {filtered.length} models
            </span>
            <span>
              <BadgeCheck size={15} />
              {filtered.filter((model) => model.verified).length} verified creators
            </span>
          </div>

          {loading ? (
            <SkeletonGrid count={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No models match those filters"
              message="Try widening the price range, clearing a category, or searching a related term."
              action={
                <button className="btn-primary" type="button" onClick={resetFilters}>
                  Reset filters
                </button>
              }
            />
          ) : (
            <div className="models-grid">
              {filtered.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          )}
        </section>
      </div>

      {mobileFiltersOpen && (
        <div className="mobile-filter-drawer" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="drawer-backdrop" onClick={() => setMobileFiltersOpen(false)} />
          <div className="drawer-panel">
            <button
              className="modal-close"
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
            {filters}
          </div>
        </div>
      )}
    </div>
  );
}
