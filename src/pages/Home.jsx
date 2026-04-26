import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Star, ChevronRight } from 'lucide-react';
import ModelCard from '../components/ModelCard';
import CreatorCard from '../components/CreatorCard';
import { MODELS, CREATORS, CATEGORIES } from '../data';

export default function Home() {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const featured = MODELS.filter(m => m.featured);
  const topCreators = CREATORS.slice(0, 4);
  const bottomCreators = CREATORS.slice(4);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-city" />
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">
            <Gamepad2 size={15} />
            Premium Game Assets
          </div>
          <h1>
            Game-ready <span className="cyan">3D</span> <span className="cyan">models</span><br />
            for your next project
          </h1>
          <p>
            Discover thousands of high-quality meshes, props, and characters
            from verified independent creators. Built for indie devs and 3D enthusiasts.
          </p>
          <div className="hero-buttons">
            <Link to="/browse" className="btn-primary">Browse Catalog</Link>
            <Link to="/creators" className="btn-secondary">Meet Creators</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES + FEATURED */}
      <div className="page">

        {/* Browse by Category */}
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              className={`category-pill${activeCategory === cat.name ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.name === activeCategory ? 'All' : cat.name)}
            >
              {cat.name} <span className="count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Featured */}
        <div className="featured-header">
          <div>
            <div className="featured-label"><Star size={13} /> FEATURED</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Curated Models</h2>
          </div>
          <Link to="/browse" className="view-all">View all <ChevronRight size={16} /></Link>
        </div>

        <div className="models-grid models-grid-4" style={{ marginBottom: 48 }}>
          {featured
            .filter(m => activeCategory === 'All' || m.category === activeCategory)
            .map(m => <ModelCard key={m.id} model={m} nameWhite={false} />)
          }
        </div>

        {/* Top Creators */}
        <div className="featured-header">
          <div>
            <h2 className="section-title" style={{ marginBottom: 4 }}>Top Creators</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              The most popular artists on the platform.
            </p>
          </div>
          <Link to="/creators" className="view-all">View all <ChevronRight size={16} /></Link>
        </div>

        <div className="top-creators-grid">
          {topCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
        <div className="top-creators-grid-bottom" style={{ marginTop: 16 }}>
          {bottomCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </div>
    </>
  );
}
