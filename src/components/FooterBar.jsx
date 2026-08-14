import React from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';

export default function FooterBar() {
  const { activeView, setActiveView } = useApp();
  const isMobile = useIsMobile(768);

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
      backgroundColor: 'var(--bg-dark-secondary)',
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container-wide" style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: isMobile ? '1rem' : '1.25rem',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-display)',
        color: 'var(--text-muted)',
        paddingLeft: isMobile ? '1rem' : '1.5rem',
        paddingRight: isMobile ? '1rem' : '1.5rem'
      }}>
        {/* Left: Brand Name Bold + Operational Pitch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <strong style={{ color: 'var(--text-white)', letterSpacing: '0.06em', fontSize: '0.9rem' }}>RINGLY</strong>
          <span style={{ color: 'var(--border-subtle)' }}>|</span>
          <span style={{ color: 'var(--text-muted)' }}>REAL HUMANS. REAL CALLS. ZERO SPAM.</span>
        </div>

        {/* Center: System Status Badge & Contact Email */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(46, 204, 113, 0.1)',
            border: '1px solid rgba(46, 204, 113, 0.25)',
            padding: '0.25rem 0.65rem',
            color: 'var(--accent-green)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }} />
            SYSTEM ACTIVE
          </div>

          <div>
            CONTACT: <a href="mailto:hello@ringly.call" style={{ color: 'var(--accent-cream)', textDecoration: 'underline' }}>hello@ringly.call</a>
          </div>
        </div>

        {/* Right: Slide Deck Counter & Quick Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--accent-cream)', letterSpacing: '0.06em', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
            SLIDE {getSlideNumber()}
          </span>
          <button
            onClick={() => setActiveView(activeView === 'home' ? 'dashboard' : 'home')}
            className="nav-link-btn"
            style={{ fontSize: '0.72rem', padding: '0.4rem 0.85rem', minHeight: '44px' }}
          >
            {activeView === 'home' ? 'MY REMINDERS →' : '← SERVICE OVERVIEW'}
          </button>
        </div>
      </div>
    </footer>
  );
}
