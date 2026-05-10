import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock } from 'lucide-react';
import { ARTICLES } from '../data';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Blog() {
  return (
    <PageTransition className="page">
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

      <motion.div 
        className="article-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {ARTICLES.map((article) => (
          <motion.div key={article.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <Link className="article-card" to="/blog">
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
          </motion.div>
        ))}
      </motion.div>
    </PageTransition>
  );
}
