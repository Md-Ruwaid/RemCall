import React from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';
import WriglyClock from './WriglyClock';
import BlurText from './BlurText';
import SpotlightButton from './SpotlightButton';

export default function UnifiedMainView() {
  const { setActiveView } = useApp();
  const isMobile = useIsMobile(768);

  return (
    <div
      className="view-fade-enter"
      style={{
        height: isMobile ? 'auto' : '100vh',
        minHeight: '100vh',
        maxHeight: isMobile ? 'none' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: isMobile ? 'visible' : 'hidden',
        paddingTop: isMobile ? '5.5rem' : '4.5rem',
        paddingBottom: isMobile ? '2.5rem' : '1.25rem'
      }}
    >
      {/* Hero Content Section */}
      <div className="container-wide" style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: isMobile ? '2rem' : '3rem',
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

            {/* React Bits BlurText Main Headline */}
            <div style={{
              marginBottom: '1.75rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 6.5vw, 3.4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'var(--text-white)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08
            }}>
              <BlurText
                text="WE CALL."
                delay={150}
                animateBy="words"
                direction="top"
                stepDuration={0.35}
              />
              <BlurText
                text="YOU REMEMBER."
                delay={150}
                animateBy="words"
                direction="top"
                stepDuration={0.35}
              />
            </div>

            <p style={{
              fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)',
              fontWeight: 600,
              color: 'var(--accent-cream)',
              lineHeight: 1.4,
              marginBottom: '2.25rem',
              maxWidth: '540px'
            }}>
              You schedule the moment.<br />
              We make the call.
            </p>

            {/* Single Spotlight "FIX IT" Button */}
            <div>
              <SpotlightButton
                text="FIX IT"
                onClick={() => setActiveView('how-it-works')}
              />
            </div>
          </div>

          {/* Right Column: The Wrigly Clock Hero Animation */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '1rem 0' : 0 }}>
            <WriglyClock size={isMobile ? 270 : 400} />
          </div>

        </div>
      </div>

      {/* Operational Rate & Limit Info Bar at the Complete End of the Website */}
      <div className="container-wide" style={{ width: '100%', marginTop: isMobile ? '2rem' : 0 }}>
        <div className="font-mono" style={{
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isMobile ? '0.75rem' : '1.5rem',
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
