import React from 'react';
import { useApp } from '../context/AppContext';

export default function AboutView() {
  const { setActiveView, setIsSubscribeModalOpen } = useApp();

  return (
    <div
      className="view-fade-enter"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-white)',
        paddingTop: '6rem',
        paddingBottom: '4rem'
      }}
    >
      <div className="container-wide" style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Header Tag */}
        <div className="font-mono" style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--accent-cream)',
          letterSpacing: '0.08em',
          marginBottom: '1.25rem'
        }}>
          [ ABOUT RINGLY · HUMAN TELEPHONY OPERATORS ]
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          THE ANTI-APP REMINDER SERVICE
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Mission */}
          <div className="ringly-card" style={{ padding: '2rem', borderRadius: '0px' }}>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--accent-cream)',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              01. WHY WE BUILT THIS
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-white)',
              lineHeight: 1.6,
              margin: 0
            }}>
              Push notifications are broken. We swipe them away in milliseconds without thinking.
              Ringly replaces silent app alerts with real human telephone callers who stay on the line
              until you actually complete what you set out to do.
            </p>
          </div>

          {/* Column 2: Operators */}
          <div className="ringly-card" style={{ padding: '2rem', borderRadius: '0px' }}>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--accent-cream)',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              02. REAL HUMAN OPERATORS
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-white)',
              lineHeight: 1.6,
              margin: 0
            }}>
              Every call is placed by trained human operators operating direct telephony circuits.
              No pre-recorded robocalls. No AI synthetic voices. Pure human-to-human accountability.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase' }}>
              READY TO END PROCRASTINATION?
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Explore how human telephony reminder calls work step-by-step.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setActiveView('how-it-works')}
              className="primary-button"
              style={{ padding: '0.85rem 2rem' }}
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => setActiveView('home')}
              className="btn-secondary"
              style={{ borderRadius: '0px' }}
            >
              RETURN HOME
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
