import React from 'react';
import { useApp } from '../context/AppContext';

export default function GlobalLoader() {
  const { globalLoading } = useApp();

  if (!globalLoading) return null;

  return (
    <div
      className="global-loader"
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
    >
      <div className="global-loader-bar" />
    </div>
  );
}
