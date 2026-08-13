import React from 'react';
import { useApp } from '../context/AppContext';
import Magnet from './Magnet';

export default function SplashView() {
  const { setActiveView, setIsSubscribeModalOpen } = useApp();

  return (
    <div className="view-fade-enter" style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {/* Container with massive negative space */}
      <div className="container-wide" style={{ paddingTop: '6rem', paddingBottom: '10rem' }}>
        
        {/* Main Editorial Hero Slide Card */}
        <div className="ringly-card" style={{
          padding: '5rem 4rem',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative'
        }}>

          {/* Top Label Tag */}
          <div style={{
            fontSize: '0.85rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--accent-cream)',
            textTransform: 'uppercase',
            marginBottom: '3rem'
          }}>
            [ SLIDE 01 — THE HUMANS-ONLY REMINDER SERVICE ]
          </div>

          {/* Massive Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 6.2rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            color: 'var(--text-white)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem'
          }}>
            WE CALL.<br />YOU REMEMBER.
          </h1>

          {/* Cream Subtext */}
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'var(--accent-cream)',
            fontWeight: 500,
            maxWidth: '680px',
            lineHeight: 1.4,
            marginBottom: '4rem'
          }}>
            A real human calls your phone every day at the exact time you choose to remind you of what matters. No bot voices. No app notifications to swipe away.
          </p>

          {/* Primary Action Row with Magnet Effects */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Magnet padding={60} disabled={false} magnetStrength={3}>
              <button
                className="btn-primary"
                onClick={() => setIsSubscribeModalOpen(true)}
                style={{ padding: '1.25rem 2.8rem', fontSize: '1.05rem' }}
              >
                SUBSCRIBE NOW
              </button>
            </Magnet>

            <Magnet padding={50} disabled={false} magnetStrength={4}>
              <button
                className="btn-secondary"
                onClick={() => setActiveView('full')}
                style={{ padding: '1.2rem 2.2rem', fontSize: '0.95rem' }}
              >
                EXPLORE FULL SERVICE →
              </button>
            </Magnet>
          </div>

          {/* Massive Negative Space Indicator / Footnote */}
          <div style={{
            marginTop: '8rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-subtle)',
            fontFamily: 'var(--font-display)'
          }}>
            <span>DAILY CALL CAPACITY: 1–6 CALLS / DAY</span>
            <span>HUMAN OPERATORS ACTIVE 24/7</span>
            <span>WEEKLY ALLOWANCE: FROM ₹149/WK</span>
          </div>

        </div>

      </div>

    </div>
  );
}
