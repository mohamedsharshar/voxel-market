import React from 'react';
import { Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { showToast } = useApp();

  const submit = (event) => {
    event.preventDefault();
    showToast('Message sent to the Voxel Market team', 'success');
    event.currentTarget.reset();
  };

  return (
    <div className="page">
      <div className="page-kicker">
        <Mail size={15} /> Contact
      </div>
      <section className="contact-layout">
        <div>
          <h1>Talk to the marketplace team.</h1>
          <p>
            Use this page for partnerships, creator onboarding, enterprise purchasing, or marketplace
            operations questions.
          </p>
          <div className="contact-options">
            <a href="mailto:hello@voxelmarket.com">
              <Mail size={20} />
              <span>
                <strong>hello@voxelmarket.com</strong>
                <small>General inquiries</small>
              </span>
            </a>
            <button type="button" onClick={() => showToast('Community Discord opens in the full backend build.', 'info')}>
              <MessageCircle size={20} />
              <span>
                <strong>Community Discord</strong>
                <small>Creator and buyer community</small>
              </span>
            </button>
            <span className="contact-static">
              <MapPin size={20} />
              <span>
                <strong>Remote-first</strong>
                <small>Serving creators globally</small>
              </span>
            </span>
          </div>
        </div>
        <form className="panel form-grid single" onSubmit={submit}>
          <label>
            Name
            <input required placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" required placeholder="you@example.com" />
          </label>
          <label>
            Topic
            <select defaultValue="partnership">
              <option value="partnership">Partnership</option>
              <option value="creator">Creator onboarding</option>
              <option value="enterprise">Enterprise purchasing</option>
              <option value="support">Support escalation</option>
            </select>
          </label>
          <label>
            Message
            <textarea required rows={6} placeholder="How can we help?" />
          </label>
          <button className="btn-primary" type="submit">
            <Send size={17} /> Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
