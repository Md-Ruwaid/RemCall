import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import WriglyClock from './WriglyClock';

/**
 * HowItWorksView Component
 * 
 * DEVELOPER NOTE:
 * Navigation for this page currently features a direct return-to-home action.
 * As additional application sections and sub-views are implemented, this top header
 * will expand into a comprehensive internal navigation header.
 * 
 * MOTION NOTE:
 * Each section below is built with modular container wrappers and structured handles
 * to easily support scroll-driven GSAP or Framer Motion timelines in future updates.
 */
export default function HowItWorksView() {
  const { setActiveView, calculatePrice, setIsSubscribeModalOpen } = useApp();
  const [selectedCalls, setSelectedCalls] = useState(2);

  const weeklyCost = calculatePrice(selectedCalls);

  return (
    <div
      className="view-fade-enter"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-white)',
        paddingTop: '2rem',
        paddingBottom: '4rem'
      }}
    >
      {/* View Top Navigation Bar */}
      <div
        className="container-wide"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div
          onClick={() => setActiveView('home')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--text-white)',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}
        >
          RINGLY
        </div>

        <button
          onClick={() => setActiveView('home')}
          className="btn-secondary"
          style={{ fontSize: '0.82rem', padding: '0.6rem 1.2rem', borderRadius: '0px' }}
        >
          ← BACK TO HOME
        </button>
      </div>

      {/* SECTION 1: Clock Animation Hero (Placeholder for pre-miss call arrival animation) */}
      <section
        className="how-it-works-section"
        style={{
          padding: '3rem 0',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1rem' }}>
              [ STEP 01 · TIMED TELEPHONY CALLS ]
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              THE CALL ARRIVES BEFORE THE MISS
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: '520px' }}>
              Our system dispatches a human phone call exactly when your event or task is scheduled.
              Before procrastination sets in at the 4 o'clock mark, a real caller is on the line.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WriglyClock size={360} />
          </div>
        </div>
      </section>

      {/* SECTION 2: Explanation & Tips on Human Telephony Solves Procrastination */}
      <section
        className="how-it-works-section"
        style={{
          padding: '4rem 0',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div className="container-wide">
          <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1rem' }}>
            [ STEP 02 · HUMAN OPERATOR PROTOCOL ]
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            HOW REAL HUMAN CALLERS ENFORCE ACCOUNTABILITY
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <div className="ringly-card" style={{ padding: '2rem', borderRadius: '0px' }}>
              <div className="font-mono" style={{ color: 'var(--accent-cream)', fontWeight: 700, marginBottom: '0.5rem' }}>01 / DIRECT PHONE CALL</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>NO SILENT PUSH ALERTS</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                Your phone rings with an incoming telephone line. You answer a real person, eliminating the habit of swiping away silent push notifications.
              </p>
            </div>

            <div className="ringly-card" style={{ padding: '2rem', borderRadius: '0px' }}>
              <div className="font-mono" style={{ color: 'var(--accent-cream)', fontWeight: 700, marginBottom: '0.5rem' }}>02 / VERIFICATION PROTOCOL</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>TASK VERIFICATION</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                The operator confirms you are physically starting or completing the task before hanging up.
              </p>
            </div>

            <div className="ringly-card" style={{ padding: '2rem', borderRadius: '0px' }}>
              <div className="font-mono" style={{ color: 'var(--accent-cream)', fontWeight: 700, marginBottom: '0.5rem' }}>03 / NO APP INSTALLATION</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>WORKS ON ANY PHONE</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                Works on landlines, basic feature phones, and smartphones alike. Zero software to download or configure.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Pricing & Subscription Engine (Primary CTA Location) */}
      <section
        className="how-it-works-section"
        style={{
          padding: '4rem 0'
        }}
      >
        <div className="container-wide" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              [ STEP 03 · TRANSPARENT PRICING & SUBSCRIPTION ]
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              CHOOSE YOUR DAILY CALL ALLOWANCE
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Base rate starts at ₹149/week for 1 call/day. Add extra daily call capacity for just ₹60/week per call.
            </p>
          </div>

          <div className="ringly-card" style={{ padding: '2.5rem', borderRadius: '0px' }}>
            
            {/* Daily Call Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                SELECT DAILY CALLS (1 TO 6 CALLS PER DAY)
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedCalls(num)}
                    style={{
                      background: selectedCalls === num ? 'var(--accent-cream)' : 'var(--bg-dark)',
                      color: selectedCalls === num ? 'var(--bg-dark)' : 'var(--text-white)',
                      border: `1.5px solid ${selectedCalls === num ? 'var(--accent-cream)' : 'var(--border-subtle)'}`,
                      borderRadius: '0px',
                      padding: '0.85rem 0',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Price Display */}
            <div style={{
              background: 'var(--bg-dark)',
              padding: '1.5rem',
              borderRadius: '0px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  PRICING FORMULA: ₹149 + ₹60 × ({selectedCalls} − 1)
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--text-white)', fontWeight: 700, marginTop: '0.2rem' }}>
                  {selectedCalls} {selectedCalls === 1 ? 'Human Call' : 'Human Calls'} Daily · Auto-Renews Weekly
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-cream)' }}>
                ₹{weeklyCost}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/wk</span>
              </div>
            </div>

            {/* Primary Subscription CTA */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="primary-button"
                style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem' }}
              >
                ACTIVATE RINGLY SERVICE (₹{weeklyCost}/WK)
              </button>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                🔒 Instant setup via Razorpay. Cancel anytime with 1-click.
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
