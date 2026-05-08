import React from 'react';

export default function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About Voxel Market</h1>
        <p>Your premier destination for high-quality 3D assets.</p>
      </div>
      <div className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h2>Our Mission</h2>
        <p>
          At Voxel Market, we aim to empower game developers, architects, and 3D artists by providing
          a robust marketplace for finding, buying, and selling premium 3D models. 
        </p>
        <h2 style={{ marginTop: '2rem' }}>What We Offer</h2>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8' }}>
          <li>Curated selection of high-poly and low-poly models.</li>
          <li>Rigged and animated characters ready for game engines.</li>
          <li>Detailed PBR materials and textures.</li>
          <li>A fair compensation platform for talented 3D creators.</li>
        </ul>
      </div>
    </div>
  );
}
