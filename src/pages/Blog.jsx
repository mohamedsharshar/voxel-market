import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock } from 'lucide-react';
import { ARTICLES } from '../data';

export default function Blog() {
  return (
    <div className="page">
      <div className="page-kicker">
        <BookOpen size={15} /> Articles
      </div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Marketplace Playbooks</h1>
          <p className="section-description">
            Practical guidance for buying, previewing, uploading, and selling high-quality 3D assets.
          </p>
        </div>
      </div>

      <div className="article-grid">
        {ARTICLES.map((article) => (
          <Link className="article-card" key={article.id} to="/blog">
            <img src={article.image} alt="" />
            <div>
              <span>
                <Clock size={13} />
                {article.date} - {article.readTime}
              </span>
              <strong>{article.title}</strong>
              <p>{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
