import React from 'react';
import { useApp } from '../context/AppContext';
import WriglyClock from './WriglyClock';
import GradientRevealText from './GradientRevealText';
import SpotlightButton from './SpotlightButton';

export default function UnifiedMainView() {
  const { setIsSubscribeModalOpen } = useApp();

  return (
    <div
      className="view-fade-enter"
      style={{
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        paddingTop: '4.5rem',
        paddingBottom: '1.25rem'
      }}
    >
      {/* Hero Content Section */}
      <div className="container-wide" style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          width: '100%'
        }}>

          {/* Left Column: Direct Headline & Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="font-mono" style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--accent-cream)',
              letterSpacing: '0.08em',
              marginBottom: '1.25rem'
            }}>
              [ SERVICE TYPE: HUMAN OPERATOR TELEPHONY ]
            </div>

            {/* GSAP Gradient Reveal Main Headline */}
            <div style={{ marginBottom: '1.75rem' }}>
              <GradientRevealText lines={["WE CALL.", "YOU REMEMBER."]} />
            </div>

            <p style={{
              fontSize: 'clamp(1.18rem, 1.9vw, 1.4rem)',
              fontWeight: 600,
              color: 'var(--accent-cream)',
              lineHeight: 1.4,
              marginBottom: '2.25rem',
              maxWidth: '540px'
            }}>
              Never Miss an Event<br />
              Never Procrastinate
            </p>

            {/* Single Spotlight "FIX IT" Button */}
            <div>
              <SpotlightButton
                text="FIX IT"
                onClick={() => setIsSubscribeModalOpen(true)}
              />
            </div>
          </div>

          {/* Right Column: The Wrigly Clock Hero Animation */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WriglyClock size={400} />
          </div>

        </div>
      </div>

      {/* Operational Rate & Limit Info Bar at the Complete End of the Website */}
      <div className="container-wide" style={{ width: '100%' }}>
        <div className="font-mono" style={{
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1rem',
          paddingBottom: '0.25rem'
        }}>
          <span>RATE: ₹149/WK BASE</span>
          <span>LIMIT: 1–6 CALLS/DAY</span>
          <span>NO APP REQUIRED</span>
        </div>
      </div>
    </div>
  );
}
