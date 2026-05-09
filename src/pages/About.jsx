import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Globe2, ShieldCheck, Target, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="page">
      <section className="about-hero">
        <div className="page-kicker">
          <Globe2 size={15} /> About Voxel Market
        </div>
        <h1>A marketplace designed for serious 3D asset decisions.</h1>
        <p>
          Voxel Market brings real-time previewing, technical filters, creator trust, and purchase
          workflows into one focused platform for developers, artists, and production teams.
        </p>
      </section>

      <section className="insight-band">
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
      </section>

      <section className="about-values">
        {[
          ['Creator-first economics', Users, 'Tools for storefronts, uploads, asset health, and predictable support.'],
          ['Production metadata', BadgeCheck, 'Structured fields that help technical buyers compare assets quickly.'],
          ['Immersive inspection', Globe2, 'Interactive 3D preview controls that support real evaluation, not just browsing.'],
        ].map(([title, Icon, body]) => (
          <article className="panel" key={title}>
            <Icon size={26} />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="creator-cta">
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
      </section>
    </div>
  );
}
