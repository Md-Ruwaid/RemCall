import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import PillNav from './components/PillNav';
import UnifiedMainView from './components/UnifiedMainView';
import SubscriberDashboard from './components/SubscriberDashboard';
import AdminConsole from './components/AdminConsole';
import SubscribeModal from './components/SubscribeModal';
import FooterBar from './components/FooterBar';

function AppShell() {
  const { activeView, setActiveView } = useApp();

  const navItems = [
    { label: 'Overview', href: '#home', onClick: () => setActiveView('home') },
    { label: 'My Reminders', href: '#dashboard', onClick: () => setActiveView('dashboard') },
    { label: 'Admin Queue', href: '#admin', onClick: () => setActiveView('admin') }
  ];

  return (
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
        onClick={() => setActiveView('home')}
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

      {/* React Bits PillNav Component centered at top */}
      <PillNav
        logo={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#162C37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        }
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
          {activeView === 'dashboard' && <SubscriberDashboard />}
          {activeView === 'admin' && <AdminConsole />}
        </main>
        <SubscribeModal />
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
