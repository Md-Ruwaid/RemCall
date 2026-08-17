import React from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';

export default function AboutView() {
  const { setActiveView, setIsSubscribeModalOpen, isAuthenticated, setAuthModalMode } = useApp();
  const isMobile = useIsMobile(768);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setActiveView('dashboard');
    } else {
      setAuthModalMode('subscribe');
      setIsSubscribeModalOpen(true);
    }
  };

  return (
    <div className="view-fade-enter" style={{
      paddingTop: isMobile ? '3rem' : '4.5rem',
      paddingBottom: '5rem'
    }}>
      <div className="container-narrow">
        
        {/* Section Label */}
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--accent-coral)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          About Ringly
        </div>

        <h1 style={{
          fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          marginBottom: '2rem'
        }}>
          The anti-app reminder service.
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '3rem'
        }}>
          Push notifications are swiped away in milliseconds without thought. We replace silent software alerts with real human telephone operators who stay on the line until you complete what you planned.
        </p>

        {/* Narrative Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '3.5rem'
        }}>
          <div className="ringly-card" style={{ padding: '2rem' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              01 · Why we built this
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Notification Fatigue
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Modern smartphones produce hundreds of low-priority pings every day. Important deadlines get lost in the noise. A ringing phone call breaks through passive procrastination.
            </p>
          </div>

          <div className="ringly-card" style={{ padding: '2rem' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              02 · Real Human Operators
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Direct Telephony Lines
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Every reminder call is dialed by a trained human operator directly to your voice line. No robocalls, no synthetic bots. Genuine human-to-human accountability.
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            className="btn-primary btn-coral"
            style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
            onClick={handleGetStarted}
          >
            Get started
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}
            onClick={() => setActiveView('home')}
          >
            Return to home
          </button>
        </div>

      </div>
    </div>
  );
}
