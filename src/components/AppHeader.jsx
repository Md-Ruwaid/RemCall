import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';

export default function AppHeader() {
  const { activeView, setActiveView, isAuthenticated, user, setIsSubscribeModalOpen, setAuthModalMode } = useApp();
  const isMobile = useIsMobile(768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    setMobileMenuOpen(false);
    if (view === 'dashboard' && !isAuthenticated) {
      setActiveView('auth');
    } else {
      setActiveView(view);
    }
  };

  const handleGetStarted = () => {
    setMobileMenuOpen(false);
    if (isAuthenticated) {
      setActiveView('dashboard');
    } else {
      setAuthModalMode('auth');
      setActiveView('auth');
    }
  };

  // If in dashboard and authenticated, let DashboardNav manage in-app tabs, but provide minimal brand bar
  const isDashboard = activeView === 'dashboard' && isAuthenticated;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(247, 246, 242, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'all 0.2s ease'
    }}>
      <div className="container-wide" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Brand Wordmark */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-coral)'
          }} />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.15rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--text-primary)'
          }}>
            RINGLY
          </span>
        </div>

        {/* Desktop Nav Items */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn-ghost"
              style={{
                color: activeView === 'home' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeView === 'home' ? 600 : 500
              }}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>

            <button
              type="button"
              className="btn-ghost"
              style={{
                color: activeView === 'about' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeView === 'about' ? 600 : 500
              }}
              onClick={() => handleNavClick('about')}
            >
              About
            </button>

            {isAuthenticated ? (
              <button
                type="button"
                className="btn-ghost"
                style={{
                  color: activeView === 'dashboard' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: activeView === 'dashboard' ? 600 : 500
                }}
                onClick={() => handleNavClick('dashboard')}
              >
                Dashboard
              </button>
            ) : (
              <button
                type="button"
                className="btn-ghost"
                style={{
                  color: activeView === 'auth' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: activeView === 'auth' ? 600 : 500
                }}
                onClick={() => handleNavClick('auth')}
              >
                Log In
              </button>
            )}

            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-subtle)', margin: '0 0.5rem' }} />

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get started'}
            </button>
          </nav>
        )}

        {/* Mobile Menu Trigger */}
        {isMobile && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Navigation Menu"
            style={{ padding: '0.5rem', fontSize: '1.25rem', lineHeight: 1 }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobile && mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <button
            type="button"
            className="btn-ghost"
            style={{ justifyContent: 'flex-start', padding: '0.65rem 0.5rem', fontSize: '1rem' }}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ justifyContent: 'flex-start', padding: '0.65rem 0.5rem', fontSize: '1rem' }}
            onClick={() => handleNavClick('about')}
          >
            About
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ justifyContent: 'flex-start', padding: '0.65rem 0.5rem', fontSize: '1rem' }}
            onClick={() => handleNavClick(isAuthenticated ? 'dashboard' : 'auth')}
          >
            {isAuthenticated ? 'Dashboard' : 'Log In'}
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{ marginTop: '0.5rem', width: '100%', padding: '0.75rem' }}
            onClick={handleGetStarted}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get started'}
          </button>
        </div>
      )}
    </header>
  );
}
