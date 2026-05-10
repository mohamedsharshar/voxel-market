import React from 'react';
import { LifeBuoy, Mail, MessageCircle, Search, Send, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Support() {
  const { showToast } = useApp();
  const [query, setQuery] = React.useState('');
  const topics = SUPPORT_TOPICS.filter((topic) => topic.toLowerCase().includes(query.toLowerCase()));

  const handleSubmit = (event) => {
    event.preventDefault();
    showToast('Support request sent', 'success');
    event.currentTarget.reset();
  };

  return (
    <PageTransition className="page">
      <motion.section 
        className="support-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="page-kicker">
            <LifeBuoy size={15} /> Support Center
          </div>
          <h1>Fast help for buyers, creators, and asset handoff.</h1>
          <p>Search common support areas, contact the team, or send a structured request.</p>
        </div>
        <div className="support-search">
          <Search size={17} />
          <label className="visually-hidden" htmlFor="support-search">
            Search support topics
          </label>
          <input
            id="support-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search licensing, invoices, uploads..."
          />
        </div>
      </motion.section>

      <div className="support-layout">
        <motion.section 
          className="panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="panel-heading">
            <h2>Popular Topics</h2>
            <ShieldCheck size={18} />
          </div>
          <div className="topic-list">
            {topics.map((topic) => (
              <button key={topic} type="button" onClick={() => showToast(`${topic} article opened`, 'info')}>
                {topic}
              </button>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="panel-heading">
            <h2>Contact Options</h2>
            <MessageCircle size={18} />
          </div>
          <div className="contact-options">
            <a href="mailto:support@voxelmarket.com">
              <Mail size={19} />
              <span>
                <strong>Email support</strong>
                <small>support@voxelmarket.com</small>
              </span>
            </a>
            <button type="button" onClick={() => showToast('Live chat is available in the full backend build.', 'info')}>
              <MessageCircle size={19} />
              <span>
                <strong>Live chat</strong>
                <small>Monday-Friday, 9am-5pm</small>
              </span>
            </button>
          </div>
        </motion.section>

        <motion.section 
          className="panel support-form-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="panel-heading">
            <h2>Send a Request</h2>
            <Send size={18} />
          </div>
          <form className="form-grid single" onSubmit={handleSubmit}>
            <label>
              Name
              <input required placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" required placeholder="you@example.com" />
            </label>
            <label>
              Subject
              <input required placeholder="What do you need help with?" />
            </label>
            <label>
              Message
              <textarea required rows={5} placeholder="Add model names, order details, or screenshots links." />
            </label>
            <button className="btn-primary" type="submit">
              <Send size={17} /> Send Request
            </button>
          </form>
        </motion.section>
      </div>
    </PageTransition>
  );
}
