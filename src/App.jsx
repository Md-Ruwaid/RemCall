import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import PillNav from './components/PillNav';
import UnifiedMainView from './components/UnifiedMainView';
import AboutView from './components/AboutView';
import HowItWorksView from './components/HowItWorksView';
import DashboardView from './components/DashboardView';
import AuthView from './components/AuthView';
import SubscribeModal from './components/SubscribeModal';
import ClickSpark from './components/ClickSpark';

function AppShell() {
  const { activeView, setActiveView, isAuthenticated } = useApp();

  const handleNavClick = (view) => {
    if (view === 'dashboard' && !isAuthenticated) {
      setActiveView('auth');
    } else {
      setActiveView(view);
    }
  };

  const navItems = [
    { label: 'Home', href: '#home', onClick: () => handleNavClick('home') },
    { label: 'About Us', href: '#about', onClick: () => handleNavClick('about') },
    { label: 'Dashboard', href: '#dashboard', onClick: () => handleNavClick('dashboard') },
    { label: isAuthenticated ? 'Account' : 'Log In / Sign Up', href: '#auth', onClick: () => handleNavClick('auth') }
  ];

  // Route Guard: redirect unauthenticated users away from /dashboard
  useEffect(() => {
    if (activeView === 'dashboard' && !isAuthenticated) {
      setActiveView('auth');
    }
  }, [activeView, isAuthenticated, setActiveView]);

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
        height: activeView === 'home' ? '100vh' : 'auto',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark)',
        position: 'relative',
        overflow: activeView === 'home' ? 'hidden' : 'visible'
      }}>

        {/* Top Logo — fixed top-left */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            position: 'fixed',
            top: '1.5rem',
            left: '2.5rem',
            zIndex: 60,
            cursor: 'pointer'
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--text-white)',
            textTransform: 'uppercase'
          }}>
            RINGLY
          </div>
        </div>

        {/* React Bits PillNav Component (Home, About Us, Dashboard, Auth) */}
        <PillNav
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

        {/* Main Full-Width Content Container */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: activeView === 'home' ? '100vh' : 'auto',
          minHeight: '100vh',
          width: '100%',
          overflow: activeView === 'home' ? 'hidden' : 'visible'
        }}>
          <main style={{ flex: 1, position: 'relative', zIndex: 1, overflow: activeView === 'home' ? 'hidden' : 'visible' }}>
            {activeView === 'home' && <UnifiedMainView />}
            {activeView === 'about' && <AboutView />}
            {activeView === 'how-it-works' && <HowItWorksView />}
            {activeView === 'auth' && <AuthView />}
            {activeView === 'dashboard' && isAuthenticated && <DashboardView />}
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
