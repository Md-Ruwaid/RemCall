import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';

export default function AuthView() {
  const {
    loginUser,
    signupUser,
    loginWithGoogle,
    requestPasswordReset,
    authError,
    setAuthError,
    isAuthLoading,
    emailConfirmationPending,
    user,
    setIsSubscribeModalOpen,
    setAuthModalMode,
    setActiveView
  } = useApp();

  const isMobile = useIsMobile(768);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [localError, setLocalError] = useState(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setAuthError(null);

    if (!email || !email.includes('@')) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (authMode !== 'forgot' && (!password || password.length < 6)) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    try {
      if (authMode === 'forgot') {
        await requestPasswordReset(email);
        setResetSuccessMessage(true);
      } else if (authMode === 'signup') {
        const res = await signupUser(fullName, email, phone, password);
        if (res?.session) {
          if (user.subscriptionActive) {
            setActiveView('dashboard');
          } else {
            setAuthModalMode('subscribe');
            setIsSubscribeModalOpen(true);
            setActiveView('dashboard');
          }
        }
      } else {
        const res = await loginUser(email, password);
        if (res?.session) {
          if (user.subscriptionActive) {
            setActiveView('dashboard');
          } else {
            setAuthModalMode('subscribe');
            setIsSubscribeModalOpen(true);
            setActiveView('dashboard');
          }
        }
      }
    } catch (err) {
      setLocalError(err.message || 'Authentication failed. Please check your details.');
    }
  };

  const handleGoogleAuth = async () => {
    setLocalError(null);
    setAuthError(null);
    try {
      await loginWithGoogle();
    } catch (err) {
      setLocalError(err.message || 'Google Sign-In failed.');
    }
  };

  return (
    <div className="view-fade-enter" style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '2rem 1rem' : '3.5rem 1.5rem',
      backgroundColor: 'var(--bg-base)'
    }}>
      <div className="ringly-card" style={{
        maxWidth: '440px',
        width: '100%',
        padding: isMobile ? '1.75rem 1.25rem' : '2.5rem',
        boxShadow: 'var(--shadow-card)'
      }}>
        {/* Header Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '1.75rem'
        }}>
          <button
            type="button"
            className="btn-ghost"
            style={{
              flex: 1,
              padding: '0.65rem 0',
              borderRadius: 0,
              borderBottom: authMode === 'signup' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: authMode === 'signup' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: authMode === 'signup' ? 600 : 500
            }}
            onClick={() => { setAuthMode('signup'); setLocalError(null); }}
          >
            Create Account
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{
              flex: 1,
              padding: '0.65rem 0',
              borderRadius: 0,
              borderBottom: authMode === 'login' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: authMode === 'login' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: authMode === 'login' ? 600 : 500
            }}
            onClick={() => { setAuthMode('login'); setLocalError(null); }}
          >
            Log In
          </button>
        </div>

        {/* Status Messages */}
        {(localError || authError) && (
          <div style={{
            backgroundColor: '#FDF2F2',
            border: '1px solid #FCA5A5',
            color: '#DC2626',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {localError || authError}
          </div>
        )}

        {resetSuccessMessage && (
          <div style={{
            backgroundColor: 'var(--accent-green-subtle)',
            border: '1px solid var(--accent-green)',
            color: 'var(--accent-green)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            Password reset link sent to your email.
          </div>
        )}

        {emailConfirmationPending && (
          <div style={{
            backgroundColor: 'var(--accent-amber-subtle)',
            border: '1px solid var(--accent-amber)',
            color: 'var(--accent-amber)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            Confirmation email sent! Please check your inbox.
          </div>
        )}

        {/* Google OAuth Button */}
        {authMode !== 'forgot' && (
          <>
            <button
              type="button"
              className="btn-secondary"
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1.25rem', gap: '0.65rem' }}
              onClick={handleGoogleAuth}
              disabled={isAuthLoading}
            >
              <span>Continue with Google</span>
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1.25rem 0',
              gap: '0.75rem',
              color: 'var(--text-tertiary)',
              fontSize: '0.8rem'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
              <span>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            </div>
          </>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {authMode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input
                type="text"
                className="ringly-input"
                placeholder="Sarah Connor"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                disabled={isAuthLoading}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Email Address
            </label>
            <input
              type="email"
              className="ringly-input"
              placeholder="sarah@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isAuthLoading}
            />
          </div>

          {authMode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Phone Number (for Operator Calls)
              </label>
              <input
                type="tel"
                className="ringly-input"
                placeholder="+1 (555) 019-2834"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                disabled={isAuthLoading}
              />
            </div>
          )}

          {authMode !== 'forgot' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.78rem', cursor: 'pointer' }}
                    onClick={() => { setAuthMode('forgot'); setLocalError(null); }}
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                className="ringly-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isAuthLoading}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary btn-coral"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
            disabled={isAuthLoading}
          >
            {isAuthLoading ? 'Processing…' : (
              authMode === 'signup' ? 'Create Account' : (
                authMode === 'login' ? 'Log In' : 'Send Reset Link'
              )
            )}
          </button>
        </form>

        {authMode === 'forgot' && (
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer' }}
              onClick={() => setAuthMode('login')}
            >
              ← Back to Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
