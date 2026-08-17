import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AppHeader from './components/AppHeader';
import UnifiedMainView from './components/UnifiedMainView';
import AboutView from './components/AboutView';
import HowItWorksView from './components/HowItWorksView';
import DashboardPage from './components/dashboard/DashboardPage';
import AuthView from './components/AuthView';
import ResetPasswordView from './components/ResetPasswordView';
import SubscribeModal from './components/SubscribeModal';

function AppShell() {
  const { activeView, setActiveView, isAuthenticated } = useApp();

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

  // When on dashboard and authenticated, DashboardPage renders its own navigation
  const isDashboard = activeView === 'dashboard' && isAuthenticated;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-base)',
      color: 'var(--text-primary)',
      position: 'relative'
    }}>
      {/* Quiet, Minimal App Header for Public & General Navigation */}
      {!isDashboard && <AppHeader />}

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {activeView === 'home' && <UnifiedMainView />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'how-it-works' && <HowItWorksView />}
        {activeView === 'auth' && <AuthView />}
        {activeView === 'reset-password' && <ResetPasswordView />}
        {isDashboard && <DashboardPage />}
      </main>

      {/* Subscription Overlay Modal */}
      <SubscribeModal />
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
