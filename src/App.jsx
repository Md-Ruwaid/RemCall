import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import NavigationBar from './components/NavigationBar';
import UnifiedMainView from './components/UnifiedMainView';
import SubscriberDashboard from './components/SubscriberDashboard';
import AdminConsole from './components/AdminConsole';
import SubscribeModal from './components/SubscribeModal';
import FooterBar from './components/FooterBar';
import Particles from './components/Particles';

function MainContent() {
  const { activeView } = useApp();

  return (
    <main style={{ minHeight: 'calc(100vh - 120px)', position: 'relative', zIndex: 1 }}>
      {activeView === 'home' && <UnifiedMainView />}
      {activeView === 'dashboard' && <SubscriberDashboard />}
      {activeView === 'admin' && <AdminConsole />}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)', position: 'relative', overflowX: 'hidden' }}>
        
        {/* Interactive WebGL Particles Background (High Visibility) */}
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.92
        }}>
          <Particles
            particleColors={['#F5E6C8', '#FFFFFF', '#8EA8B6', '#E74C3C', '#2ECC71']}
            particleCount={260}
            particleSpread={16}
            speed={0.12}
            particleBaseSize={160}
            sizeRandomness={1.2}
            alphaParticles={true}
            moveParticlesOnHover={true}
            particleHoverFactor={0.6}
            disableRotation={false}
          />
        </div>

        <NavigationBar />
        <MainContent />
        <SubscribeModal />
        <FooterBar />
      </div>
    </AppProvider>
  );
}
