import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CustomCheckbox from './CustomCheckbox';
import WriglyClock from './WriglyClock';
import TextPressure from './TextPressure';
import SpotlightButton from './SpotlightButton';
import Magnet from './Magnet';

export default function UnifiedMainView() {
  const { setActiveView, setIsSubscribeModalOpen, calculatePrice } = useApp();

  // Interactive Preference Sandbox State
  const [selectedCallCount, setSelectedCallCount] = useState(2);
  const [preferences, setPreferences] = useState({
    morning: true,
    afternoon: true,
    evening: false,
    urgentOnly: true
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="view-fade-enter">

      {/* ASYMMETRIC HERO SECTION WITH WRIGLY CLOCK HERO ANIMATION */}
      <section style={{ paddingTop: '4.5rem', paddingBottom: '5rem' }}>
        <div className="container-wide">

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>

            {/* Left: Raw Direct Headline & Copy */}
            <div>

              <div className="font-mono" style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-cream)',
                letterSpacing: '0.08em',
                marginBottom: '1.5rem'
              }}>
                [ SERVICE TYPE: HUMAN OPERATOR TELEPHONY ]
              </div>

              {/* Dynamic Interactive TextPressure Main Headline */}
              <div style={{ position: 'relative', height: '110px', marginBottom: '2rem' }}>
                <TextPressure
                  text="WE CALL. YOU REMEMBER."
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#FFFFFF"
                  minFontSize={32}
                />
              </div>

              <p style={{
                fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
                fontWeight: 600,
                color: 'var(--accent-cream)',
                lineHeight: 1.4,
                marginBottom: '2rem',
                maxWidth: '560px'
              }}>
                Never Miss an Event<br />
                Never Procrastinate
              </p>

              {/* Single Spotlight "FIX IT" Button */}
              <div style={{ marginBottom: '3rem' }}>
                <SpotlightButton
                  text="FIX IT"
                  onClick={() => setIsSubscribeModalOpen(true)}
                />
              </div>

              <div className="font-mono" style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1.25rem'
              }}>
                <span>RATE: ₹149/WK BASE</span>
                <span>LIMIT: 1–6 CALLS/DAY</span>
                <span>NO APP REQUIRED</span>
              </div>

            </div>

            {/* Right: The Wrigly Clock Hero Animation Component */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <WriglyClock size={360} />
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 2: COMPARISON TABLE (REAL PRODUCT DIFFERENCE, NO FAKE BENTO BOXES) */}
      <section style={{
        backgroundColor: 'var(--bg-dark-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}>
        <div className="container-wide">

          <div className="font-mono" style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--accent-cream)',
            marginBottom: '1rem'
          }}>
            [ WHY TELEPHONY BEATS NOTIFICATIONS ]
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '3rem'
          }}>
            APP NOTIFICATIONS VS A HUMAN PHONE CALL
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cream)' }}>
                  <th style={{ padding: '1rem' }}>OPERATIONAL FEATURE</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>STANDARD MOBILE APP ALERT</th>
                  <th style={{ padding: '1rem', color: 'var(--accent-cream)' }}>RINGLY HUMAN PHONE CALL</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 700 }}>ATTENTION DEMAND</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)' }}>Swiped away in 0.5s with zero memory retention</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--text-white)', fontWeight: 600 }}>Phone rings out loud; requires human voice answer</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 700 }}>COMPLIANCE VERIFICATION</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)' }}>App assumes you did it just because you dismissed the badge</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--text-white)', fontWeight: 600 }}>Operator asks "Did you swallow the blue tablet?" before ending call</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 700 }}>UNANSWERED BEHAVIOR</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)' }}>Buried under 30 other notification badges</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--accent-cream)', fontWeight: 700 }}>Automatic urgent re-dial 5 minutes later</td>
                </tr>
                <tr>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 700 }}>SETUP REQUIREMENT</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)' }}>Must download app, enable permissions, turn off silent mode</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--text-white)', fontWeight: 600 }}>Zero apps. Works on any cell phone or landline</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>


      {/* SECTION 3: CUSTOM CHECKBOX REMINDER PREFERENCE SELECTOR */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-wide">

          <div className="ringly-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>

            <div className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cream)', marginBottom: '0.75rem' }}>
              [ CUSTOM PREFERENCE SELECTOR ]
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              CONFIGURE YOUR DAILY TIME WINDOWS
            </h2>

            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem' }}>
              Select which windows during the day our human operators have authorization to call your line.
            </p>

            {/* Custom Checkboxes Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>

              <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <CustomCheckbox
                  label="MORNING (08:00 AM)"
                  subtext="Daily medicine & critical morning routine"
                  checked={preferences.morning}
                  onChange={() => togglePreference('morning')}
                />
              </div>

              <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <CustomCheckbox
                  label="AFTERNOON (01:30 PM)"
                  subtext="Post-lunch review & priority check-in"
                  checked={preferences.afternoon}
                  onChange={() => togglePreference('afternoon')}
                />
              </div>

              <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <CustomCheckbox
                  label="EVENING (08:00 PM)"
                  subtext="Nightly medication & task completion"
                  checked={preferences.evening}
                  onChange={() => togglePreference('evening')}
                />
              </div>

              <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <CustomCheckbox
                  label="URGENT RE-CALL GUARD"
                  subtext="Automatic 5-minute retry if no answer"
                  checked={preferences.urgentOnly}
                  onChange={() => togglePreference('urgentOnly')}
                />
              </div>

            </div>

            <div style={{
              background: 'rgba(245, 230, 200, 0.05)',
              border: '1px solid rgba(245, 230, 200, 0.2)',
              borderRadius: '8px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cream)', fontWeight: 700 }}>
                  AUTHORIZED CALL SLOTS:
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '0.2rem', color: 'var(--text-white)' }}>
                  {[
                    preferences.morning && 'MORNING (8:00 AM)',
                    preferences.afternoon && 'AFTERNOON (1:30 PM)',
                    preferences.evening && 'EVENING (8:00 PM)'
                  ].filter(Boolean).join(' · ') || 'NO SLOTS SELECTED'}
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => setIsSubscribeModalOpen(true)}
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.82rem' }}
              >
                SAVE & SUBSCRIBE
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 4: PRD PRICING ENGINE */}
      <section style={{
        backgroundColor: 'var(--bg-dark-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}>
        <div className="container-wide">

          <div style={{ maxWidth: '820px', margin: '0 auto' }}>

            <div className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cream)', marginBottom: '0.75rem', textAlign: 'center' }}>
              [ PRD FORMULA: ₹149 + ₹60 × (CALLS − 1) ]
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              SELECT DAILY CALL ALLOWANCE
            </h2>

            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '3rem', fontSize: '1rem' }}>
              Select how many daily calls you want scheduled across your week.
            </p>

            {/* Daily Call Pill Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.6rem', marginBottom: '2.5rem' }}>
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isActive = selectedCallCount === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedCallCount(num)}
                    style={{
                      background: isActive ? 'var(--accent-cream)' : 'var(--bg-dark)',
                      color: isActive ? 'var(--bg-dark)' : 'var(--text-white)',
                      border: `1px solid ${isActive ? 'var(--accent-cream)' : 'var(--border-subtle)'}`,
                      borderRadius: '8px',
                      padding: '1rem 0.25rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      cursor: 'pointer'
                    }}
                  >
                    {num} {num === 1 ? 'CALL' : 'CALLS'}
                  </button>
                );
              })}
            </div>

            {/* Pricing Output Card */}
            <div className="ringly-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                WEEKLY COST FOR {selectedCallCount} DAILY CALL(S)
              </div>

              <div className="font-mono" style={{
                fontSize: '4rem',
                fontWeight: 700,
                color: 'var(--accent-cream)',
                lineHeight: 1,
                marginBottom: '1rem'
              }}>
                ₹{calculatePrice(selectedCallCount)}
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/WEEK</span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Includes {selectedCallCount * 7} total human call dispatches per week.
              </p>

              <Magnet padding={50} disabled={false} magnetStrength={3}>
                <button
                  className="btn-primary"
                  onClick={() => setIsSubscribeModalOpen(true)}
                  style={{ padding: '1.1rem 2.5rem', fontSize: '0.95rem' }}
                >
                  SUBSCRIBE FOR ₹{calculatePrice(selectedCallCount)}/WK
                </button>
              </Magnet>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
