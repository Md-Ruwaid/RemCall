import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CustomCheckbox from './CustomCheckbox';
import CustomRadioGroup from './CustomRadio';
import Magnet from './Magnet';

export default function EditorialServiceView() {
  const { setActiveView, setIsSubscribeModalOpen, calculatePrice } = useApp();

  // Interactive Preference Sandbox State
  const [selectedCallCount, setSelectedCallCount] = useState(2);
  const [preferences, setPreferences] = useState({
    morning: true,
    afternoon: true,
    evening: false,
    urgentOnly: false
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="view-fade-enter">

      {/* SECTION 1: EDITORIAL HERO */}
      <section className="section-spacing" style={{ paddingTop: '6rem' }}>
        <div className="container-wide">
          
          <div className="ringly-card" style={{ padding: '6rem 4rem', position: 'relative' }}>
            
            <div style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--accent-cream)',
              textTransform: 'uppercase',
              marginBottom: '2.5rem'
            }}>
              [ SLIDE 02 — DETAILED SERVICE ARCHITECTURE ]
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.92,
              color: 'var(--text-white)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginBottom: '3rem'
            }}>
              NEVER FORGET<br />AGAIN.
            </h1>

            <p style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: 'var(--accent-cream)',
              fontWeight: 500,
              maxWidth: '780px',
              lineHeight: 1.4,
              marginBottom: '4rem'
            }}>
              A dedicated human operator dials your personal phone at the exact time you schedule. We don't send emails. We don't push badges. We talk to you.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Magnet padding={60} disabled={false} magnetStrength={3}>
                <button
                  className="btn-primary"
                  onClick={() => setIsSubscribeModalOpen(true)}
                  style={{ padding: '1.25rem 2.8rem', fontSize: '1.05rem' }}
                >
                  START YOUR SERVICE
                </button>
              </Magnet>

              <Magnet padding={50} disabled={false} magnetStrength={4}>
                <button
                  className="btn-secondary"
                  onClick={() => setActiveView('dashboard')}
                  style={{ padding: '1.2rem 2.2rem', fontSize: '0.95rem' }}
                >
                  OPEN MY DASHBOARD →
                </button>
              </Magnet>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 2: HOW IT WORKS (3 MINIMAL NUMBERED STEPS) */}
      <section className="section-spacing" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-wide">
          
          <div style={{
            fontSize: '0.85rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--accent-cream)',
            textTransform: 'uppercase',
            marginBottom: '4rem'
          }}>
            [ HOW IT WORKS — THREE STEPS ]
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem'
          }}>
            
            {/* Step 01 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  color: 'var(--accent-cream)',
                  lineHeight: 1,
                  marginBottom: '1.5rem'
                }}>
                  01
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-white)',
                  marginBottom: '1rem',
                  letterSpacing: '0.04em'
                }}>
                  TELL US WHAT TO REMEMBER
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  Log into your simple portal or send us a text. Specify your medicine time, critical presentation, mom's call, or daily standup.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  color: 'var(--accent-cream)',
                  lineHeight: 1,
                  marginBottom: '1.5rem'
                }}>
                  02
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-white)',
                  marginBottom: '1rem',
                  letterSpacing: '0.04em'
                }}>
                  WE CALL YOU AT THE RIGHT TIME
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  At your requested minute, your phone rings. Not an app alert. Not a robotic sound clip. An actual human being line.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  color: 'var(--accent-cream)',
                  lineHeight: 1,
                  marginBottom: '1.5rem'
                }}>
                  03
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-white)',
                  marginBottom: '1rem',
                  letterSpacing: '0.04em'
                }}>
                  A REAL PERSON REMINDS YOU
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  We stay on the line until you confirm you've taken action. If you don't pick up, we try again in 5 minutes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 3: WHY A CALL, NOT A NOTIFICATION */}
      <section className="section-spacing-lg" style={{
        backgroundColor: 'var(--bg-dark-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container-narrow">
          
          <div style={{
            fontSize: '0.85rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--accent-cream)',
            textTransform: 'uppercase',
            marginBottom: '3rem'
          }}>
            [ THE PHILOSOPHY ]
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--text-white)',
            textTransform: 'uppercase',
            marginBottom: '3rem'
          }}>
            WHY A CALL, NOT A NOTIFICATION?
          </h2>

          <p style={{
            fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
            lineHeight: 1.5,
            color: 'var(--text-white)',
            fontWeight: 400,
            marginBottom: '2rem'
          }}>
            Notifications are swiped away in half a second and buried beneath forty other app badges. You don't read them. You just clear them.
          </p>

          <p style={{
            fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
            lineHeight: 1.5,
            color: 'var(--accent-cream)',
            fontWeight: 500
          }}>
            A ringing phone demands presence. A human voice asking if you took your medicine creates accountability. We don't send banners—we make sure it gets done.
          </p>

        </div>
      </section>


      {/* SECTION 4: INTERACTIVE PREFERENCE BUILDER (SCRATCH-BUILT CUSTOM CHECKBOXES) */}
      <section className="section-spacing">
        <div className="container-wide">
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            <div className="ringly-card" style={{ padding: '4rem 3.5rem' }}>
              
              <div style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--accent-cream)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}>
                [ INTERACTIVE REMINDER BUILDER ]
              </div>

              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                CONFIGURE YOUR CALL PREFERENCES
              </h2>

              <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.05rem' }}>
                Test our scratch-built minimal checkbox and toggle system. Select when you want human calls delivered each day.
              </p>

              {/* Custom Checkbox Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                
                <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <CustomCheckbox
                    label="MORNING CALL (08:00 AM)"
                    subtext="Ideal for daily medication & morning priority"
                    checked={preferences.morning}
                    onChange={() => togglePreference('morning')}
                  />
                </div>

                <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <CustomCheckbox
                    label="AFTERNOON CALL (01:30 PM)"
                    subtext="Post-lunch task review & meeting reminder"
                    checked={preferences.afternoon}
                    onChange={() => togglePreference('afternoon')}
                  />
                </div>

                <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <CustomCheckbox
                    label="EVENING CALL (08:00 PM)"
                    subtext="Nightly reflection, journal & habit check-in"
                    checked={preferences.evening}
                    onChange={() => togglePreference('evening')}
                  />
                </div>

                <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <CustomCheckbox
                    label="URGENT RE-DIAL GUARD"
                    subtext="Re-call after 5 mins if first call goes unanswered"
                    checked={preferences.urgentOnly}
                    onChange={() => togglePreference('urgentOnly')}
                  />
                </div>

              </div>

              {/* Status Output Box */}
              <div style={{
                background: 'rgba(245, 230, 200, 0.05)',
                border: '1px solid rgba(245, 230, 200, 0.2)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.08em' }}>
                    CURRENTLY ACTIVE TIME SLOTS:
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem', color: 'var(--text-white)' }}>
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
                  style={{ padding: '0.8rem 1.5rem', fontSize: '0.85rem' }}
                >
                  SAVE & SUBSCRIBE
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* SECTION 5: PRD PRICING RULE SELECTOR */}
      <section className="section-spacing" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-wide">
          
          <div style={{ maxWidth: '840px', margin: '0 auto', textCenter: 'center' }}>
            
            <div style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--accent-cream)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              [ TRANSPARENT PRICING ]
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              CHOOSE YOUR DAILY CALL ALLOWANCE
            </h2>

            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '3.5rem', fontSize: '1.1rem' }}>
              Calculated using the official formula: <code style={{ color: 'var(--accent-cream)', background: 'rgba(245,230,200,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>₹149 + ₹60 × (calls − 1)</code>
            </p>

            {/* Daily Call Selector Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', marginBottom: '3rem' }}>
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isActive = selectedCallCount === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedCallCount(num)}
                    style={{
                      background: isActive ? 'var(--accent-cream)' : 'var(--bg-dark-secondary)',
                      color: isActive ? 'var(--bg-dark)' : 'var(--text-white)',
                      border: `1px solid ${isActive ? 'var(--accent-cream)' : 'var(--border-subtle)'}`,
                      borderRadius: '12px',
                      padding: '1.25rem 0.5rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {num} {num === 1 ? 'CALL' : 'CALLS'}
                  </button>
                );
              })}
            </div>

            {/* Calculation Price Card */}
            <div className="ringly-card" style={{ padding: '3.5rem 3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                WEEKLY SUBSCRIPTION COST ({selectedCallCount} {selectedCallCount === 1 ? 'CALL' : 'CALLS'} / DAY)
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4.5rem',
                fontWeight: 800,
                color: 'var(--accent-cream)',
                lineHeight: 1,
                marginBottom: '1rem'
              }}>
                ₹{calculatePrice(selectedCallCount)}
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 400 }}> / WEEK</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                Includes {selectedCallCount * 7} total human call attempts per week. Cancel anytime before Sunday.
              </p>

              <Magnet padding={60} disabled={false} magnetStrength={3}>
                <button
                  className="btn-primary"
                  onClick={() => setIsSubscribeModalOpen(true)}
                  style={{ padding: '1.25rem 3rem', fontSize: '1.05rem' }}
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
