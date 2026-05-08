import React from 'react';
import { useApp } from '../context/AppContext';
import { MODELS, CREATORS } from '../data';
import { Navigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user } = useApp();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, models, and platform settings.</p>
      </div>
      <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div style={{ background: 'var(--bg-2)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
            <h3>Platform Stats</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-2)' }}>Total Models:</span>
                <span style={{ fontWeight: 'bold' }}>{MODELS.length}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-2)' }}>Total Creators:</span>
                <span style={{ fontWeight: 'bold' }}>{CREATORS.length}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-2)' }}>Active Users:</span>
                <span style={{ fontWeight: 'bold' }}>1,245</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-2)' }}>Total Revenue:</span>
                <span style={{ fontWeight: 'bold', color: 'var(--cyan)' }}>$14,230</span>
              </li>
            </ul>
          </div>

          <div style={{ background: 'var(--bg-2)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-primary">Add New Category</button>
              <button className="btn-secondary">Review Pending Models</button>
              <button className="btn-secondary">Manage Users</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
