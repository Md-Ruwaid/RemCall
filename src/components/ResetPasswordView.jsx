import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';

export default function ResetPasswordView() {
  const { updatePassword, setActiveView, authError, setAuthError } = useApp();
  const isMobile = useIsMobile(768);
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
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem'
        }}>
          Account Security
        </div>

        <h1 style={{
          fontSize: '1.65rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '1.5rem'
        }}>
          Set new password
        </h1>

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

        {success ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--accent-green)' }}>✓</div>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
              Password updated successfully! Redirecting…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                New Password
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
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Confirm New Password
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
              className="btn-primary btn-coral"
              style={{ marginTop: '0.5rem', padding: '0.85rem' }}
            >
              {isSubmitting ? 'Updating password…' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
