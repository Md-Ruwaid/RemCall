import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';
import WriglyClock from './WriglyClock';

export default function UnifiedMainView() {
  const { setActiveView, setIsSubscribeModalOpen, isAuthenticated, calculatePrice, setAuthModalMode } = useApp();
  const isMobile = useIsMobile(768);

  // Pricing interactive state
  const [callsPerDay, setCallsPerDay] = useState(3);
  const currentPrice = calculatePrice ? calculatePrice(callsPerDay) : 149 + 60 * (callsPerDay - 1);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setActiveView('dashboard');
    } else {
      setAuthModalMode('subscribe');
      setIsSubscribeModalOpen(true);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="view-fade-enter" style={{ width: '100%' }}>
      
      {/* ─── 1. HERO SECTION ─── */}
      <section style={{
        paddingTop: isMobile ? '3rem' : '5rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
            gap: isMobile ? '3rem' : '4rem',
            alignItems: 'center'
          }}>
            
            {/* Left Column: Headline & Action */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                padding: '0.25rem 0.65rem',
                backgroundColor: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-coral)' }} />
                Human Telephony Reminder Service
              </div>

              <h1 style={{
                fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}>
                WE CALL.<br />
                YOU REMEMBER.
              </h1>

              <p style={{
                fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '2.5rem',
                maxWidth: '480px'
              }}>
                You schedule the moment.<br />
                A live human operator makes the call.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-primary btn-coral"
                  style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                  onClick={handleGetStarted}
                >
                  Get started
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}
                  onClick={() => scrollToSection('problem-section')}
                >
                  How it works ↓
                </button>
              </div>

              <div style={{
                marginTop: '2.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-tertiary)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap'
              }}>
                <span>✓ No app download required</span>
                <span>✓ Works on any phone line</span>
                <span>✓ Real human accountability</span>
              </div>
            </div>

            {/* Right Column: Beautiful Clock & 4:00 Narrative */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '1.5rem 1rem' : '2.5rem',
              boxShadow: 'var(--shadow-card)',
              position: 'relative'
            }}>
              <WriglyClock size={isMobile ? 280 : 360} />
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. PROBLEM STORY SECTION ─── */}
      <section id="problem-section" style={{
        paddingTop: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)'
      }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--accent-coral)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              The Problem
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              You get busy.
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto'
            }}>
              App notifications are swiped away in milliseconds without thought. Silent reminders get buried under daily noise.
            </p>
          </div>

          {/* Time Progression Sequence */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            {[
              { time: '03:12', label: 'WORKING', note: 'Focusing on tasks' },
              { time: '03:41', label: 'STILL WORKING', note: 'Lost track of time' },
              { time: '03:59', label: 'ONE MINUTE', note: 'Deadline approaching' },
              { time: '04:00', label: 'MISSED', note: 'Silent alert ignored', isMissed: true }
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: step.isMissed ? 'var(--accent-coral-subtle)' : 'var(--bg-base)',
                  border: `1px solid ${step.isMissed ? 'var(--accent-coral)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div className="font-mono" style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: step.isMissed ? 'var(--accent-coral)' : 'var(--text-primary)'
                }}>
                  {step.time}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: step.isMissed ? 'var(--accent-coral)' : 'var(--text-primary)',
                  letterSpacing: '0.02em'
                }}>
                  {step.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: step.isMissed ? 'var(--accent-coral)' : 'var(--text-tertiary)'
                }}>
                  {step.note}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
              A ringing phone call demands conscious attention. A real human voice enforces true accountability.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. HOW IT WORKS (3 STEPS ONLY) ─── */}
      <section style={{
        paddingTop: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              How It Works
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--text-primary)'
            }}>
              Three simple steps.
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {[
              {
                number: '01',
                title: 'Schedule',
                desc: 'Tell us what matters and when you need to be called. Add optional operator verification notes.'
              },
              {
                number: '02',
                title: 'We call',
                desc: 'At the exact scheduled moment, a trained human operator dials your personal cellular voice line.'
              },
              {
                number: '03',
                title: 'You remember',
                desc: 'The operator speaks with you directly and confirms task completion. Nothing gets forgotten.'
              }
            ].map((step, i) => (
              <div
                key={i}
                className="ringly-card"
                style={{
                  padding: isMobile ? '1.75rem' : '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div className="font-mono" style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--accent-coral)',
                  letterSpacing: '0.05em'
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. PRODUCT DEMONSTRATION (REAL CALL TICKET ARTIFACT) ─── */}
      <section style={{
        paddingTop: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)'
      }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2.5rem' : '4rem',
            alignItems: 'center'
          }}>
            
            {/* Left: Product Explanation */}
            <div>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem'
              }}>
                Product Experience
              </div>
              <h2 style={{
                fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '1.25rem'
              }}>
                Clear, physical accountability.
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.75rem'
              }}>
                Every reminder generates a dedicated Call Ticket. You can track scheduled times, inspect verified operator call logs, and manage your weekly allowance in one quiet place.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.93rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span>
                  <span>Real-time countdown to your next operator call</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.93rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span>
                  <span>Detailed operator verification notes & logs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.93rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span>
                  <span>One-click schedule cancellation and rescheduling</span>
                </div>
              </div>
            </div>

            {/* Right: Realistic Call Ticket Artifact */}
            <div style={{
              backgroundColor: 'var(--bg-base)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '1.5rem' : '2.25rem',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.85rem'
                }}>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    CALL / 00281
                  </span>
                  <span className="badge-status badge-scheduled">
                    ● Scheduled
                  </span>
                </div>

                <div>
                  <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    08:00 PM
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    PROJECT DISCUSSION
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Thursday · In 42 min
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Operator Note:</strong> Confirm final slides before client board presentation.
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.82rem',
                  color: 'var(--text-tertiary)',
                  paddingTop: '0.25rem'
                }}>
                  <span>Voice Line: +1 (555) 019-2834</span>
                  <span style={{ color: 'var(--accent-coral)', fontWeight: 600 }}>Operator Queued</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 5. INTERACTIVE PRICING SELECTOR ─── */}
      <section style={{
        paddingTop: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              Pricing
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem'
            }}>
              Simple weekly subscription.
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              margin: '0 auto'
            }}>
              Choose how many operator calls you need per day. Scale or cancel at any time.
            </p>
          </div>

          {/* Interactive Pricing Card */}
          <div className="ringly-card" style={{
            padding: isMobile ? '2rem 1.5rem' : '3rem',
            textAlign: 'center',
            maxWidth: '520px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              CALLS PER DAY
            </div>

            {/* Stepper Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <button
                type="button"
                className="btn-secondary"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '1.35rem',
                  padding: 0
                }}
                onClick={() => setCallsPerDay(prev => Math.max(1, prev - 1))}
                disabled={callsPerDay <= 1}
                aria-label="Decrease calls per day"
              >
                −
              </button>

              <span className="font-mono" style={{
                fontSize: '2.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                minWidth: '60px'
              }}>
                {callsPerDay}
              </span>

              <button
                type="button"
                className="btn-secondary"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '1.35rem',
                  padding: 0
                }}
                onClick={() => setCallsPerDay(prev => Math.min(6, prev + 1))}
                disabled={callsPerDay >= 6}
                aria-label="Increase calls per day"
              >
                +
              </button>
            </div>

            {/* Live Computed Price */}
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                ₹{currentPrice}
              </span>
              <span style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginLeft: '0.35rem' }}>
                / week
              </span>
            </div>

            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-tertiary)',
              marginBottom: '2rem'
            }}>
              ₹149 base (1 call/day) + ₹60 per extra daily call
            </div>

            <button
              type="button"
              className="btn-primary btn-coral"
              style={{ width: '100%', padding: '0.95rem', fontSize: '1rem' }}
              onClick={handleGetStarted}
            >
              Get started with {callsPerDay} {callsPerDay === 1 ? 'call' : 'calls'}/day
            </button>
          </div>
        </div>
      </section>

      {/* ─── 6. FINAL CALM CTA ─── */}
      <section style={{
        paddingTop: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <div className="container-narrow">
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Don't trust your attention to remember everything.
          </h2>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem'
          }}>
            Let us call you.
          </p>

          <button
            type="button"
            className="btn-primary btn-coral"
            style={{ padding: '0.95rem 2.25rem', fontSize: '1.05rem' }}
            onClick={handleGetStarted}
          >
            Get started
          </button>
        </div>
      </section>

      {/* ─── 7. QUIET FOOTER ─── */}
      <footer style={{
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-tertiary)',
        fontSize: '0.85rem'
      }}>
        <div className="container-wide" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>RINGLY</span>
            <span>· Human Operator Telephony Reminder Service</span>
          </div>

          <div className="font-mono" style={{ fontSize: '0.78rem' }}>
            RATE: ₹149/WK BASE · LIMIT: 1–6 CALLS/DAY · NO APP REQUIRED
          </div>
        </div>
      </footer>

    </div>
  );
}
