import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Palette, Save, Shield, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function Settings() {
  const { setUser, showToast, user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('profile');
  const [name, setName] = React.useState(user?.name || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  React.useEffect(() => {
    if (!user) {
      showToast('Please log in to access settings', 'error');
      navigate('/');
    }
  }, [navigate, showToast, user]);

  if (!user) return null;

  const saveProfile = (event) => {
    event.preventDefault();
    setUser({ ...user, name, email });
    showToast('Profile updated', 'success');
  };

  const savePassword = (event) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated', 'success');
  };

  return (
    <div className="page">
      <div className="page-kicker">Account</div>
      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div className="profile-mini">
            <span>{user.name?.[0]?.toUpperCase()}</span>
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <section className="settings-panel panel">
          {activeTab === 'profile' && (
            <>
              <div className="panel-heading">
                <h1>Profile Information</h1>
                <User size={20} />
              </div>
              <form className="form-grid single" onSubmit={saveProfile}>
                <label>
                  Display name
                  <input value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label>
                  Email address
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <button className="btn-primary" type="submit">
                  <Save size={17} /> Save Changes
                </button>
              </form>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <div className="panel-heading">
                <h1>Security</h1>
                <Shield size={20} />
              </div>
              <form className="form-grid single" onSubmit={savePassword}>
                <label>
                  New password
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </label>
                <label>
                  Confirm new password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </label>
                <button className="btn-primary" type="submit">
                  <Save size={17} /> Update Password
                </button>
              </form>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <div className="panel-heading">
                <h1>Notifications</h1>
                <Bell size={20} />
              </div>
              <div className="settings-list">
                {[
                  ['Asset updates', 'Notify me when purchased assets are updated.'],
                  ['Creator activity', 'Notify me when followed creators publish new models.'],
                  ['Security alerts', 'Notify me about login and account changes.'],
                ].map(([title, body], index) => (
                  <label className="settings-toggle-row" key={title}>
                    <span>
                      <strong>{title}</strong>
                      <small>{body}</small>
                    </span>
                    <input type="checkbox" defaultChecked={index !== 1} />
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              <div className="panel-heading">
                <h1>Appearance</h1>
                <Palette size={20} />
              </div>
              <div className="theme-grid">
                <button className="theme-card active" type="button">
                  <span className="theme-swatch dark" />
                  <strong>Dark Studio</strong>
                  <small>Current production theme</small>
                </button>
                <button className="theme-card" type="button" disabled>
                  <span className="theme-swatch light" />
                  <strong>Light Review</strong>
                  <small>Coming soon</small>
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
