import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Box,
  ChevronRight,
  Download,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import CreatorCard from '../components/CreatorCard';
import ModelCard from '../components/ModelCard';
import SectionHeader from '../components/SectionHeader';
import { CATEGORIES, COLLECTIONS, COMMUNITY_POSTS, TRENDING_SEARCHES } from '../data';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const { addSearchHistory, creators, models } = useApp();
  const [query, setQuery] = React.useState('');
  const featured = models.filter((model) => model.featured).slice(0, 6);
  const trending = models.filter((model) => model.trending).slice(0, 4);
  const topCreators = creators.slice(0, 4);

  const submitSearch = (event, value = query) => {
    event.preventDefault();
    const term = value.trim();
    if (!term) return;
    addSearchHistory(term);
    navigate(`/browse?q=${encodeURIComponent(term)}`);
  };

  return (
    <PageTransition className="">
      <section className="hero">
        <div className="hero-city" />
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <ShieldCheck size={15} />
              Curated game-ready 3D assets
            </div>
            <h1>Voxel Market</h1>
            <p>
              Explore premium models with real-time previews, technical filters, creator profiles,
              and buyer-friendly workflows for production teams.
            </p>
            <form className="hero-search" onSubmit={submitSearch} role="search">
              <Search size={18} />
              <label className="visually-hidden" htmlFor="hero-search">
                Search marketplace
              </label>
              <input
                id="hero-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cyberpunk kits, rigged characters, PBR props..."
              />
              <button type="submit">
                Search <ArrowRight size={16} />
              </button>
            </form>
            <div className="hero-trends" aria-label="Trending searches">
              {TRENDING_SEARCHES.slice(0, 4).map((term) => (
                <button key={term} type="button" onClick={(event) => submitSearch(event, term)}>
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-metrics" aria-label="Marketplace highlights">
            <span>
              <strong>12k+</strong>
              curated assets
            </span>
            <span>
              <strong>92%</strong>
              game-ready
            </span>
            <span>
              <strong>4.8</strong>
              avg rating
            </span>
          </div>
        </div>
      </section>

      <div className="page home-page">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="category-strip" 
          aria-label="Browse categories"
        >
          {CATEGORIES.map((category) => (
            <Link key={category.name} to={`/browse?category=${encodeURIComponent(category.name)}`}>
              <span>{category.name}</span>
              <small>{category.count} assets</small>
              <ChevronRight size={16} />
            </Link>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Live marketplace"
            title="Trending Now"
            description="High-intent assets buyers are inspecting and saving this week."
            actionLabel="View trending"
            actionTo="/trending"
          />
          <div className="models-grid models-grid-4">
            {trending.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="insight-band"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="insight-item">
            <Layers3 size={22} />
            <strong>Technical metadata first</strong>
            <span>Polygon counts, formats, PBR flags, rigging, and animation states are surfaced before checkout.</span>
          </div>
          <div className="insight-item">
            <Box size={22} />
            <strong>Interactive preview flow</strong>
            <span>Buyers can inspect materials, lighting, wireframes, scale cues, and full-screen previews.</span>
          </div>
          <div className="insight-item">
            <Download size={22} />
            <strong>Production handoff</strong>
            <span>Purchase history, download history, saved collections, and creator support keep teams moving.</span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Curated"
            title="Featured Models"
            description="Staff-reviewed assets with clean presentation, strong licensing, and predictable import paths."
            actionLabel="View featured"
            actionTo="/featured"
          />
          <div className="models-grid">
            {featured.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Collections"
            title="Build Faster With Curated Packs"
            description="Model groups organized around real production use cases."
            actionLabel="All collections"
            actionTo="/collections"
          />
          <div className="collections-grid">
            {COLLECTIONS.map((collection) => (
              <Link className="collection-card" key={collection.id} to={`/collections/${collection.id}`}>
                <img src={collection.image} alt="" />
                <span className="collection-card-shade" />
                <div>
                  <strong>{collection.name}</strong>
                  <p>{collection.description}</p>
                  <small>{collection.modelIds.length} models</small>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Creators"
            title="Top Sellers"
            description="Verified artists with consistent quality, support, and buyer satisfaction."
            actionLabel="Explore creators"
            actionTo="/creators"
          />
          <div className="creators-grid compact">
            {topCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Community"
            title="Showcase"
            description="Real buyer and creator work made with marketplace assets."
            actionLabel="Open community"
            actionTo="/community"
          />
          <div className="community-grid">
            {COMMUNITY_POSTS.map((post) => (
              <article className="community-card" key={post.id}>
                <img src={post.image} alt={post.title} />
                <div>
                  <span>
                    <Sparkles size={13} /> {post.creator}
                  </span>
                  <strong>{post.title}</strong>
                  <small>
                    <Star size={13} fill="currentColor" /> {post.likes.toLocaleString()}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="creator-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="eyebrow">
              <Users size={14} /> Creator tools
            </div>
            <h2>Upload, manage, and grow a 3D asset storefront.</h2>
            <p>
              The dashboard includes upload review, sales widgets, saved collections, notifications,
              and asset health checks designed for serious creators.
            </p>
          </div>
          <div className="creator-cta-actions">
            <Link to="/dashboard" className="btn-primary">
              Open Dashboard
            </Link>
            <Link to="/top-sellers" className="btn-secondary">
              See Top Sellers
            </Link>
          </div>
        </motion.section>

        <motion.section 
          className="trust-row" 
          aria-label="Platform trust indicators"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>
            <BadgeCheck size={16} /> Verified creators
          </span>
          <span>
            <TrendingUp size={16} /> Live discovery signals
          </span>
          <span>
            <ShieldCheck size={16} /> Commercial licensing
          </span>
        </motion.section>
      </div>
    </PageTransition>
  );
}
