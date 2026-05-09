import React from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3 } from 'lucide-react';
import { CATEGORIES } from '../data';
import { useApp } from '../context/AppContext';

export default function Categories() {
  const { models } = useApp();

  return (
    <div className="page">
      <div className="page-kicker">
        <Grid3X3 size={15} /> Categories
      </div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Browse by Category</h1>
          <p className="section-description">
            Start from a clear asset class and drill into technical filters from there.
          </p>
        </div>
      </div>
      <div className="category-page-grid">
        {CATEGORIES.map((category) => {
          const sample = models.find((model) => model.category === category.name) || models[0];
          return (
            <Link key={category.name} to={`/browse?category=${encodeURIComponent(category.name)}`}>
              <img src={sample.image} alt="" />
              <span>
                <strong>{category.name}</strong>
                <small>{category.description}</small>
                <em>{category.count} assets</em>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
