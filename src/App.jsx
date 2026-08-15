import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import PillNav from './components/PillNav';
import UnifiedMainView from './components/UnifiedMainView';
import AboutView from './components/AboutView';
import HowItWorksView from './components/HowItWorksView';
import DashboardPage from './components/dashboard/DashboardPage';
import AuthView from './components/AuthView';
import ResetPasswordView from './components/ResetPasswordView';
import SubscribeModal from './components/SubscribeModal';
import ClickSpark from './components/ClickSpark';

import { useIsMobile } from './hooks/useIsMobile';
import { useScrollDirection } from './hooks/useScrollDirection';

function AppShell() {
  const { activeView, setActiveView, isAuthenticated } = useApp();
  const isMobile = useIsMobile(768);
  const { scrollDirection, isAtTop } = useScrollDirection();
  const isHeaderVisible = isAtTop || scrollDirection === 'up';

  const handleNavClick = (view) => {
    if (view === 'dashboard' && !isAuthenticated) {
      setActiveView('auth');
    } else {
      setActiveView(view);
    }
  };

  const navItems = isAuthenticated
    ? [
        { label: 'Home', href: '#home', onClick: () => handleNavClick('home') },
        { label: 'About Us', href: '#about', onClick: () => handleNavClick('about') },
        { label: 'Dashboard', href: '#dashboard', onClick: () => handleNavClick('dashboard') },
        { label: 'Account', href: '#auth', onClick: () => handleNavClick('auth') }
      ]
    : [
        { label: 'Home', href: '#home', onClick: () => handleNavClick('home') },
        { label: 'About Us', href: '#about', onClick: () => handleNavClick('about') },
        { label: 'Log In / Sign Up', href: '#auth', onClick: () => handleNavClick('auth') }
      ];

  // Route Guard: redirect unauthenticated users away from /dashboard
  useEffect(() => {
    if (activeView === 'dashboard' && !isAuthenticated) {
      setActiveView('auth');
    }
  }, [activeView, isAuthenticated, setActiveView]);

  // Check URL hash recovery routes on load
  useEffect(() => {
    if (window.location.hash === '#reset-password') {
      setActiveView('reset-password');
    }
  }, [setActiveView]);

  const isHomeLocked = activeView === 'home' && !isMobile;
  const isDashboardView = activeView === 'dashboard' && isAuthenticated;

  return (
    <ClickSpark
      sparkColor="#F5E6C8"
      sparkSize={12}
      sparkRadius={22}
      sparkCount={8}
      duration={450}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: isHomeLocked ? '100vh' : 'auto',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark)',
        position: 'relative',
        overflow: isHomeLocked ? 'hidden' : 'visible'
      }}>

        {/* Public Top Logo — fixed top-left (Hides on scroll down, shows on scroll up) */}
        {!isDashboardView && (
          <div
            onClick={() => handleNavClick('home')}
            style={{
              position: 'fixed',
              top: isMobile ? '1.25rem' : '1.5rem',
              left: isMobile ? '1.25rem' : '2.5rem',
              zIndex: 60,
              cursor: 'pointer',
              transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-160%)',
              opacity: isHeaderVisible ? 1 : 0,
              transition: 'transform 0.35s ease, opacity 0.35s ease',
              pointerEvents: isHeaderVisible ? 'auto' : 'none'
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? '1.25rem' : '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--text-white)',
              textTransform: 'uppercase'
            }}>
              RINGLY
            </div>
          </div>
        )}

        {/* React Bits PillNav Component for Public Marketing Pages */}
        {!isDashboardView && (
          <PillNav
            visible={isHeaderVisible}
            logoAlt="Ringly Logo"
            items={navItems}
            activeHref={`#${activeView}`}
            baseColor="#F5E6C8"
            pillColor="#162C37"
            hoveredPillTextColor="#F5E6C8"
            pillTextColor="#F5E6C8"
            ease="power2.easeOut"
            initialLoadAnimation={true}
          />
        )}

        {/* Main Full-Width Content Container */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: isHomeLocked ? '100vh' : 'auto',
          minHeight: '100vh',
          width: '100%',
          overflow: isHomeLocked ? 'hidden' : 'visible'
        }}>
          <main style={{ flex: 1, position: 'relative', zIndex: 1, overflow: isHomeLocked ? 'hidden' : 'visible' }}>
            {activeView === 'home' && <UnifiedMainView />}
            {activeView === 'about' && <AboutView />}
            {activeView === 'how-it-works' && <HowItWorksView />}
            {activeView === 'auth' && <AuthView />}
            {activeView === 'reset-password' && <ResetPasswordView />}
            {activeView === 'dashboard' && isAuthenticated && <DashboardPage />}
          </main>
          <SubscribeModal />
        </div>

      </div>
    </ClickSpark>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
