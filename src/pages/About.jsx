import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Globe2, ShieldCheck, Target, Users, Zap } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <PageTransition className="page">
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="page-kicker">
          <Globe2 size={15} /> About Voxel Market
        </div>
        <h1>A marketplace designed for serious 3D asset decisions.</h1>
        <p>
          Voxel Market brings real-time previewing, technical filters, creator trust, and purchase
          workflows into one focused platform for developers, artists, and production teams.
        </p>
        </p>
      </motion.section>

      <motion.section 
        className="insight-band"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="insight-item">
          <Target size={22} />
          <strong>Reduce buyer uncertainty</strong>
          <span>Every key detail is surfaced before checkout: formats, topology, PBR, rigging, animation, and licensing.</span>
        </div>
        <div className="insight-item">
          <ShieldCheck size={22} />
          <strong>Build trust into the UI</strong>
          <span>Verified creators, ratings, support cues, and review states help buyers make faster decisions.</span>
        </div>
        <div className="insight-item">
          <Zap size={22} />
          <strong>Keep workflows fast</strong>
          <span>Search, quick view, wishlist, history, and recommendations reduce unnecessary navigation steps.</span>
        </div>
        </div>
      </motion.section>

      <motion.section 
        className="about-values"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {[
          ['Creator-first economics', Users, 'Tools for storefronts, uploads, asset health, and predictable support.'],
          ['Production metadata', BadgeCheck, 'Structured fields that help technical buyers compare assets quickly.'],
          ['Immersive inspection', Globe2, 'Interactive 3D preview controls that support real evaluation, not just browsing.'],
        ].map(([title, Icon, body]) => (
          <motion.article className="panel" key={title} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <Icon size={26} />
            <h2>{title}</h2>
            <p>{body}</p>
          </motion.article>
        ))}
      </motion.section>

      <motion.section 
        className="creator-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <div className="eyebrow">Next step</div>
          <h2>Explore the marketplace experience.</h2>
          <p>Browse assets, inspect previews, or open the creator dashboard to review the upload flow.</p>
        </div>
        <div className="creator-cta-actions">
          <Link className="btn-primary" to="/browse">
            Browse Assets
          </Link>
          <Link className="btn-secondary" to="/dashboard">
            Creator Dashboard
          </Link>
        </div>
        </div>
      </motion.section>
    </PageTransition>
  );
}
