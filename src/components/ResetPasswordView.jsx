import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ResetPasswordView() {
  const { updatePassword, setActiveView, authError, setAuthError } = useApp();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setAuthError(null);

    if (newPassword.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePassword(newPassword);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setActiveView('dashboard');
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setLocalError(err.message || 'Failed to update password.');
    }
  };

  return (
    <div
      className="view-fade-enter"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark, #10212A)',
        color: 'var(--text-white)',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container-wide" style={{ maxWidth: '520px', width: '100%', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            background: 'var(--bg-card, #1C3644)',
            border: '1.5px solid var(--border-subtle, #3A5C6E)',
            borderRadius: '0px',
            padding: '2.5rem'
          }}
        >
          <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
            [ RECOVERY PROTOCOL ]
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-white)', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
            SET NEW PASSWORD
          </h2>

          {(localError || authError) && (
            <div
              className="font-mono"
              style={{
                background: 'rgba(231, 76, 60, 0.15)',
                border: '1px solid #E74C3C',
                color: '#E74C3C',
                padding: '0.75rem 1rem',
                fontSize: '0.78rem',
                marginBottom: '1.25rem'
              }}
            >
              ⚠️ {localError || authError}
            </div>
          )}

          {success ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✓</div>
              <p className="font-mono" style={{ color: 'var(--accent-cream)', fontSize: '0.95rem' }}>
                PASSWORD UPDATED SUCCESSFULLY! REDIRECTING TO DASHBOARD...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  className="ringly-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  CONFIRM NEW PASSWORD
                </label>
                <input
                  type="password"
                  className="ringly-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="ringly-auth-btn"
                style={{ marginTop: '0.5rem', padding: '1rem' }}
              >
                <span>{isSubmitting ? 'UPDATING PASSWORD...' : 'UPDATE PASSWORD →'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
