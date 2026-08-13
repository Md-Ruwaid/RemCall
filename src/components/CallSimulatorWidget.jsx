import React, { useState, useEffect } from 'react';

export default function CallSimulatorWidget() {
  const [callState, setCallState] = useState('idle'); // 'idle' | 'ringing' | 'connected' | 'completed' | 'missed'
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (callState === 'connected') {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const startCallDemo = () => {
    setCallState('ringing');
    setTimeout(() => {
      setCallState('connected');
    }, 2000);
  };

  const handleAction = (status) => {
    setCallState(status);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      
      {/* Widget Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: callState === 'connected' ? '#2ECC71' : callState === 'ringing' ? '#F1C40F' : '#8EA8B6'
          }} />
          <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-mono)', fontWeight: 700 }}>
            LIVE CALL TERMINAL :: DISPATCH #9921
          </span>
        </div>
        <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {callState === 'connected' ? `CALL TIME: 00:${seconds < 10 ? '0' : ''}${seconds}` : 'STANDBY'}
        </span>
      </div>

      {/* Simulator Display Window */}
      {callState === 'idle' && (
        <div style={{ padding: '1.5rem 0', textAlign: 'center' }}>
          <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cream)', marginBottom: '0.5rem' }}>
            DAILY SCHEDULED TIME: 08:30 AM
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-white)', marginBottom: '1.5rem' }}>
            "Take Morning Heart Medication (20mg)"
          </div>
          <button
            onClick={startCallDemo}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.75rem 1.5rem', width: '100%', borderColor: 'var(--accent-cream)', color: 'var(--accent-cream)' }}
          >
            ▶ SIMULATE HUMAN CALL DISPATCH
          </button>
        </div>
      )}

      {callState === 'ringing' && (
        <div style={{ padding: '1.5rem 0', textAlign: 'center', animation: 'pulse 1s infinite' }}>
          <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-cream)' }}>
            📲 INCOMING CALL...
          </div>
          <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            +1 (555) 019-2834 · RINGLY DISPATCH
          </div>
        </div>
      )}

      {callState === 'connected' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-cream)' }}>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cream)', fontWeight: 700 }}>
              HUMAN OPERATOR (MARCUS):
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-white)', marginTop: '0.2rem' }}>
              "Hi Sarah, Marcus from Ringly calling at 8:30 AM for your 20mg heart tablet. Have you taken it with water?"
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              onClick={() => handleAction('completed')}
              style={{
                backgroundColor: '#2ECC71',
                color: '#081C10',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ✓ "YES, TAKEN"
            </button>
            <button
              onClick={() => handleAction('missed')}
              style={{
                backgroundColor: 'rgba(231, 76, 60, 0.15)',
                color: '#E74C3C',
                border: '1px solid #E74C3C',
                padding: '0.75rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ✕ "RE-DIAL IN 5m"
            </button>
          </div>
        </div>
      )}

      {callState === 'completed' && (
        <div style={{ background: 'rgba(46, 204, 113, 0.1)', border: '1px solid #2ECC71', padding: '1.25rem', borderRadius: '8px', textAlign: 'center' }}>
          <div className="font-mono" style={{ color: '#2ECC71', fontWeight: 700, fontSize: '0.85rem' }}>
            ✓ CALL VERIFIED & CONFIRMED AT 08:31 AM
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Logged in subscriber timeline. Daily count updated.
          </div>
          <button
            onClick={() => setCallState('idle')}
            style={{ marginTop: '0.75rem', background: 'none', border: 'none', color: 'var(--text-white)', textDecoration: 'underline', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            RESET SIMULATOR
          </button>
        </div>
      )}

      {callState === 'missed' && (
        <div style={{ background: 'rgba(231, 76, 60, 0.1)', border: '1px solid #E74C3C', padding: '1.25rem', borderRadius: '8px', textAlign: 'center' }}>
          <div className="font-mono" style={{ color: '#E74C3C', fontWeight: 700, fontSize: '0.85rem' }}>
            ↻ RE-DIAL QUEUED FOR 08:36 AM
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Urgent guard triggered: Operator will dial subscriber again in 5 mins.
          </div>
          <button
            onClick={() => setCallState('idle')}
            style={{ marginTop: '0.75rem', background: 'none', border: 'none', color: 'var(--text-white)', textDecoration: 'underline', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            RESET SIMULATOR
          </button>
        </div>
      )}

    </div>
  );
}
