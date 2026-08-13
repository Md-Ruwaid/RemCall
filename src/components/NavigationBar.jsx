import React from 'react';
import { useApp } from '../context/AppContext';
import Magnet from './Magnet';

export default function NavigationBar() {
  const { activeView, setActiveView, setIsSubscribeModalOpen, user, toggleRole } = useApp();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(16, 33, 42, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      paddingTop: '1.1rem',
      paddingBottom: '1.1rem'
    }}>
      <div className="container-wide" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand Identity */}
        <div 
          onClick={() => setActiveView('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--text-white)',
            textTransform: 'uppercase'
          }}>
            RINGLY
          </div>
          <span style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--accent-cream)',
            backgroundColor: 'rgba(245, 230, 200, 0.1)',
            border: '1px solid rgba(245, 230, 200, 0.2)',
            padding: '0.15rem 0.5rem',
            borderRadius: '0px',
            textTransform: 'uppercase'
          }}>
            HUMAN TELEPHONY
          </span>
        </div>

        {/* View Switcher Links with Custom Hover Effect */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            className={`nav-link-btn ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => setActiveView('home')}
          >
            SERVICE OVERVIEW
          </button>
          <button
            className={`nav-link-btn ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            MY REMINDERS
          </button>
          <button
            className={`nav-link-btn ${activeView === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveView('admin')}
          >
            ADMIN QUEUE
          </button>
        </nav>

        {/* Action Button & Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleRole}
            className="nav-link-btn"
            style={{ fontSize: '0.72rem', padding: '0.45rem 0.85rem' }}
          >
            {user.role === 'admin' ? '⚡ ADMIN MODE' : '👤 USER MODE'}
          </button>

          <Magnet padding={40} disabled={false} magnetStrength={3}>
            <button
              className="btn-primary"
              onClick={() => setIsSubscribeModalOpen(true)}
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.82rem' }}
            >
              SUBSCRIBE
            </button>
          </Magnet>
        </div>
      </div>
    </header>
  );
}
