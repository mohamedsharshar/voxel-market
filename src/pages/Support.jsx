import React from 'react';
import { useApp } from '../context/AppContext';

export default function Support() {
  const { showToast } = useApp();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent to our support team!', 'success');
    e.target.reset();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Support Center</h1>
        <p>How can we help you today?</p>
      </div>
      <div className="page-content" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <form onSubmit={handleSubmit} className="auth-form" style={{ background: 'var(--bg-2)', padding: '2rem', borderRadius: 'var(--radius)' }}>
          <div className="modal-field">
            <label>Name</label>
            <input type="text" required placeholder="Your Name" />
          </div>
          <div className="modal-field">
            <label>Email</label>
            <input type="email" required placeholder="Your Email Address" />
          </div>
          <div className="modal-field">
            <label>Message</label>
            <textarea required placeholder="Describe your issue..." rows={5} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-3)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', color: 'var(--text-1)' }}></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
