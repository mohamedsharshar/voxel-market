import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';

export default function Support() {
  const { showToast } = useApp();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent to our support team!', 'success');
    e.target.reset();
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, var(--cyan), #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Support Center
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Have a question or need help? We're here for you. Reach out to us through any of the channels below or send us a direct message.
        </p>
      </div>

      <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '50%', color: 'var(--cyan)' }}>
                <Mail size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Email Us</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>We'll respond within 24 hours.</p>
                <a href="mailto:support@voxelmarket.com" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: '500' }}>support@voxelmarket.com</a>
              </div>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '50%', color: '#a855f7' }}>
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Live Chat</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Available Monday to Friday, 9am - 5pm EST.</p>
                <span style={{ color: '#a855f7', fontWeight: '500', cursor: 'pointer' }}>Start a chat</span>
              </div>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255, 171, 0, 0.1)', borderRadius: '50%', color: '#ffab00' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Office</h3>
                <p style={{ color: 'var(--text-secondary)' }}>123 Creator Blvd, Suite 400<br/>San Francisco, CA 94107</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Send us a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="modal-field">
                <label>Your Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="modal-field">
                <label>Email Address</label>
                <input type="email" required placeholder="john@example.com" />
              </div>
              <div className="modal-field">
                <label>Subject</label>
                <input type="text" required placeholder="How can we help you?" />
              </div>
              <div className="modal-field">
                <label>Message</label>
                <textarea 
                  required 
                  placeholder="Describe your issue or question in detail..." 
                  rows={5} 
                  style={{ 
                    width: '100%', padding: '1rem', background: 'var(--bg-input)', 
                    border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', 
                    color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical' 
                  }}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
