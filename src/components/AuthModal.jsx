import React from 'react';
import { X, Box, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function AuthModal({ mode, onClose, onSwitch }) {
  const isLogin = mode === 'login';
  const { setUser, showToast } = useApp();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const firstInputRef = React.useRef(null);
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  React.useEffect(() => {
    // focus first input for keyboard users
    setTimeout(() => firstInputRef.current && firstInputRef.current.focus(), 10);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab' || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setError('Please enter a password with 6+ characters');
      return;
    }

    // placeholder: would call auth API
    const username = email.split('@')[0];
    const role = email.startsWith('admin') ? 'admin' : 'user';
    setUser({ email, name: username, role });
    showToast(isLogin ? `Welcome back, ${username}!` : `Account created for ${username}!`, 'success');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        aria-describedby="auth-desc"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          <X size={16} />
        </button>

        <div className="modal-icon" aria-hidden>
          <Box size={26} />
        </div>

        <h2 id="auth-title" className="modal-title">
          {isLogin ? 'Sign in to Voxel Market' : 'Create your account'}
        </h2>
        <p id="auth-desc" className="modal-sub">
          {isLogin
            ? 'Welcome back! Please sign in to continue'
            : 'Welcome! Please fill in the details to get started.'}
        </p>

        <button className="btn-google" type="button" aria-label="Continue with Google">
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="modal-divider" aria-hidden>
          or
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="modal-field">
            <label htmlFor="auth-email">Email address</label>
            <input
              id="auth-email"
              ref={firstInputRef}
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              name="password"
              type="password"
              placeholder={isLogin ? 'Enter your password' : 'Create a password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          {error && (
            <div role="alert" className="form-error">
              {error}
            </div>
          )}

          <button className="btn-modal-submit" type="submit" aria-label="Continue">
            Continue <ChevronRight size={16} />
          </button>
        </form>

        <div className="modal-switch">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => onSwitch('signup')} aria-label="Switch to Sign up">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => onSwitch('login')} aria-label="Switch to Sign in">
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
