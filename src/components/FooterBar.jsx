import React from 'react';
import { useApp } from '../context/AppContext';

export default function FooterBar() {
  const { activeView, setActiveView } = useApp();

  const getSlideNumber = () => {
    switch (activeView) {
      case 'home': return '01 / 03 · OVERVIEW';
      case 'dashboard': return '02 / 03 · REMINDERS';
      case 'admin': return '03 / 03 · OPERATIONS QUEUE';
      default: return '01 / 03';
    }
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-dark)',
      paddingTop: '1.25rem',
      paddingBottom: '1.25rem',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container-wide" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-display)',
        color: 'var(--text-muted)'
      }}>
        {/* Left: Brand Name Bold + Pitch tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <strong style={{ color: 'var(--text-white)', letterSpacing: '0.05em' }}>RINGLY</strong>
          <span style={{ color: 'var(--text-subtle)' }}>·</span>
          <span>REAL HUMANS. REAL CALLS. ZERO SPAM.</span>
        </div>

        {/* Center: Contact Email */}
        <div>
          CONTACT: <a href="mailto:hello@ringly.call" style={{ color: 'var(--accent-cream)', textDecoration: 'underline' }}>hello@ringly.call</a>
        </div>

        {/* Right: Slide Deck Counter & Quick Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: 'var(--accent-cream)', letterSpacing: '0.06em', fontWeight: 600 }}>
            SLIDE {getSlideNumber()}
          </span>
          <button
            onClick={() => setActiveView(activeView === 'home' ? 'dashboard' : 'home')}
            className="nav-link-btn"
            style={{ fontSize: '0.72rem', padding: '0.4rem 0.85rem' }}
          >
            {activeView === 'home' ? 'MY REMINDERS →' : '← SERVICE OVERVIEW'}
          </button>
        </div>
      </div>
    </footer>
  );
}
