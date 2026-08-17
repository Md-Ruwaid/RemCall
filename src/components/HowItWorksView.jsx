import React from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';

export default function HowItWorksView() {
  const { setActiveView, setIsSubscribeModalOpen, isAuthenticated, setAuthModalMode } = useApp();
  const isMobile = useIsMobile(768);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setActiveView('dashboard');
    } else {
      setAuthModalMode('subscribe');
      setIsSubscribeModalOpen(true);
    }
  };

  return (
    <div className="view-fade-enter" style={{
      paddingTop: isMobile ? '3rem' : '4.5rem',
      paddingBottom: '5rem'
    }}>
      <div className="container-narrow">
        
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--accent-coral)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          Protocol & Process
        </div>

        <h1 style={{
          fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          marginBottom: '2rem'
        }}>
          How Ringly works.
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '3rem'
        }}>
          A simple three-step workflow designed to protect your attention from distraction and missed deadlines.
        </p>

        {/* Step-by-Step Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3.5rem' }}>
          {[
            {
              step: '01',
              title: 'Schedule your moment',
              desc: 'Select the date and exact time you need to be prompted. Enter the specific task or verification criteria for the operator.'
            },
            {
              step: '02',
              title: 'Direct human phone call',
              desc: 'At the scheduled time, our live operator places a direct telephone call to your verified cellular phone line. No app or Wi-Fi needed.'
            },
            {
              step: '03',
              title: 'Verified task completion',
              desc: 'The operator speaks with you directly, confirms your progress, and logs the outcome in your personal dashboard archive.'
            }
          ].map((item, idx) => (
            <div key={idx} className="ringly-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div className="font-mono" style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--accent-coral)',
                minWidth: '32px'
              }}>
                {item.step}
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap'
        }}>
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
            onClick={() => setActiveView('home')}
          >
            Return to home
          </button>
        </div>

      </div>
    </div>
  );
}
