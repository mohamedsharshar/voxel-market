import React from 'react';

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="models-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index} aria-hidden>
          <div className="skeleton-media" />
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}
