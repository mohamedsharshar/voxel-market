import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, Bell, Palette, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, setUser, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      showToast('Please log in to access settings', 'error');
      navigate('/');
    }
  }, [user, navigate, showToast]);

  if (!user) return null;

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUser({ ...user, name, email });
    showToast('Profile updated successfully!', 'success');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    // Simulate password update
    showToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Account Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your account preferences and settings.</p>
      </div>

      <div className="page-content" style={{ display: 'flex', gap: '3rem', maxWidth: '1100px', margin: '0 auto', alignItems: 'flex-start', padding: '0 1rem' }}>
        
        {/* Sidebar */}
        <div style={{ flex: '0 0 280px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <button 
                onClick={() => setActiveTab('profile')}
                style={{ 
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                  border: 'none', background: activeTab === 'profile' ? 'var(--bg-3)' : 'transparent', 
                  color: activeTab === 'profile' ? 'var(--text-1)' : 'var(--text-2)', 
                  borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all var(--transition-fast)'
                }}
              >
                <User size={18} /> Profile Info
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('security')}
                style={{ 
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                  border: 'none', background: activeTab === 'security' ? 'var(--bg-3)' : 'transparent', 
                  color: activeTab === 'security' ? 'var(--text-1)' : 'var(--text-2)', 
                  borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all var(--transition-fast)'
                }}
              >
                <Shield size={18} /> Security
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('notifications')}
                style={{ 
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                  border: 'none', background: activeTab === 'notifications' ? 'var(--bg-3)' : 'transparent', 
                  color: activeTab === 'notifications' ? 'var(--text-1)' : 'var(--text-2)', 
                  borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all var(--transition-fast)'
                }}
              >
                <Bell size={18} /> Notifications
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('appearance')}
                style={{ 
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                  border: 'none', background: activeTab === 'appearance' ? 'var(--bg-3)' : 'transparent', 
                  color: activeTab === 'appearance' ? 'var(--text-1)' : 'var(--text-2)', 
                  borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all var(--transition-fast)'
                }}
              >
                <Palette size={18} /> Appearance
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div style={{ flex: '1', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '3rem', border: '1px solid var(--border)' }}>
          
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ marginBottom: '2rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', width: '100%', textAlign: 'center' }}>Profile Information</h2>
              <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
                <div className="modal-field" style={{ textAlign: 'left' }}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                    id="name"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="modal-field" style={{ textAlign: 'left' }}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.8rem 2rem' }}>
                  <Save size={18} /> Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ marginBottom: '2rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', width: '100%', textAlign: 'center' }}>Change Password</h2>
              <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
                <div className="modal-field" style={{ textAlign: 'left' }}>
                  <label htmlFor="currentPassword">Current Password</label>
                  <input 
                    id="currentPassword"
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="modal-field" style={{ textAlign: 'left' }}>
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                      id="newPassword"
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="modal-field" style={{ textAlign: 'left' }}>
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input 
                      id="confirmPassword"
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.8rem 2rem' }}>
                  <Save size={18} /> Update Password
                </button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ marginBottom: '2rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', width: '100%', textAlign: 'center' }}>Notification Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
                {[
                  { id: 'marketing', label: 'Marketing Emails', desc: 'Receive updates about new features and special offers.' },
                  { id: 'updates', label: 'Order Updates', desc: 'Get notified when your purchases are ready or updated.' },
                  { id: 'security', label: 'Security Alerts', desc: 'Receive alerts about unusual account activity.' }
                ].map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{item.label}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                      <input type="checkbox" defaultChecked={item.id !== 'marketing'} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ 
                        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                        backgroundColor: item.id !== 'marketing' ? 'var(--cyan)' : 'var(--bg-secondary)', 
                        borderRadius: '24px', transition: '.4s' 
                      }}>
                        <span style={{ 
                          position: 'absolute', content: '""', height: '18px', width: '18px', 
                          left: item.id !== 'marketing' ? '22px' : '3px', bottom: '3px', backgroundColor: 'white', 
                          borderRadius: '50%', transition: '.4s' 
                        }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', width: '100%' }}>Appearance Settings</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Customize how Voxel Market looks on your device.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', width: '100%', maxWidth: '500px' }}>
                <div style={{ border: '2px solid var(--cyan)', borderRadius: 'var(--radius)', padding: '2rem', textAlign: 'center', cursor: 'pointer', background: 'var(--bg-card)', transition: 'all 0.2s' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#121212', margin: '0 auto 1.5rem', border: '1px solid var(--border)' }}></div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Dark Theme</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Default dark appearance</p>
                </div>
                <div style={{ border: '2px solid transparent', borderRadius: 'var(--radius)', padding: '2rem', textAlign: 'center', cursor: 'not-allowed', background: 'var(--bg-card)', opacity: 0.5 }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', margin: '0 auto 1.5rem', border: '1px solid #ccc' }}></div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Light Theme</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Coming soon</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
