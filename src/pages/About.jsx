import React from 'react';
import { Box, Users, Target, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem', background: 'linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)', borderRadius: 'var(--radius)', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(90deg, var(--cyan) 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Empowering the 3D Creator Economy
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-2)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Voxel Market is the premier destination for finding, buying, and selling high-quality 3D assets. We bridge the gap between talented creators and ambitious developers.
        </p>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Mission & Vision */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ padding: '2rem', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
            <Target size={32} color="var(--cyan)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: '1.6' }}>
              To democratize game development and 3D design by providing an accessible, fair, and high-quality marketplace where creators can thrive and developers can build faster.
            </p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
            <Globe size={32} color="#a855f7" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Vision</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: '1.6' }}>
              To become the global standard for 3D asset exchange, fostering a vibrant community of millions of artists and developers shaping the future of digital experiences.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>Our Core Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={28} color="var(--cyan)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Uncompromised Quality</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: '1.5' }}>Every model is carefully curated to ensure it meets our strict technical and visual standards.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Users size={28} color="#a855f7" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Community First</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: '1.5' }}>We put our creators and users at the heart of every decision we make.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 171, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Zap size={28} color="#ffab00" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Fast & Seamless</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: '1.5' }}>From finding the right asset to integrating it into your project, we make the process frictionless.</p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box size={48} color="var(--cyan)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to start building?</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '2rem', maxWidth: '500px' }}>Join thousands of developers and artists on Voxel Market today.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/browse" className="btn-primary" style={{ textDecoration: 'none', padding: '0.8rem 2rem', fontSize: '1rem' }}>Explore Assets</Link>
            <Link to="/creators" className="btn-secondary" style={{ textDecoration: 'none', padding: '0.8rem 2rem', fontSize: '1rem', background: 'var(--bg-3)', color: 'var(--text-1)', borderRadius: 'var(--radius)' }}>Join as Creator</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
