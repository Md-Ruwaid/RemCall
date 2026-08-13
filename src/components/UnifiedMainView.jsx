import React from 'react';
import { useApp } from '../context/AppContext';
import WriglyClock from './WriglyClock';
import TextPressure from './TextPressure';
import SpotlightButton from './SpotlightButton';

export default function UnifiedMainView() {
  const { setIsSubscribeModalOpen } = useApp();

  return (
    <div
      className="view-fade-enter"
      style={{
        height: 'calc(100vh - 60px)',
        maxHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '1rem 0'
      }}
    >
      <div className="container-wide" style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>

          {/* Left Column: Direct Headline & Copy */}
          <div>
            <div className="font-mono" style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--accent-cream)',
              letterSpacing: '0.08em',
              marginBottom: '1.25rem'
            }}>
              [ SERVICE TYPE: HUMAN OPERATOR TELEPHONY ]
            </div>

            {/* Dynamic Interactive TextPressure Main Headline */}
            <div style={{ position: 'relative', height: '95px', marginBottom: '1.25rem' }}>
              <TextPressure
                text="WE CALL. YOU REMEMBER."
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#FFFFFF"
                minFontSize={28}
              />
            </div>

            <p style={{
              fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
              fontWeight: 600,
              color: 'var(--accent-cream)',
              lineHeight: 1.35,
              marginBottom: '1.75rem',
              maxWidth: '520px'
            }}>
              Never Miss an Event<br />
              Never Procrastinate
            </p>

            {/* Single Spotlight "FIX IT" Button */}
            <div style={{ marginBottom: '2rem' }}>
              <SpotlightButton
                text="FIX IT"
                onClick={() => setIsSubscribeModalOpen(true)}
              />
            </div>

            <div className="font-mono" style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1rem'
            }}>
              <span>RATE: ₹149/WK BASE</span>
              <span>LIMIT: 1–6 CALLS/DAY</span>
              <span>NO APP REQUIRED</span>
            </div>
          </div>

          {/* Right Column: The Wrigly Clock Hero Animation */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WriglyClock size={340} />
          </div>

        </div>
      </div>
    </div>
  );
}
