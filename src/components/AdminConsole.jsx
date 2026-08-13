import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function AdminConsole() {
  const { reminders, updateReminderStatus } = useApp();
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());
  const [searchQuery, setSearchQuery] = useState('');

  // Auto Refresh Queue every 30 seconds as specified in Section 6.6 of PRD
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setLastRefreshed(new Date().toLocaleTimeString());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter Queue: Only Scheduled and In Inventory, sorted ascending by callTime
  const activeQueue = reminders
    .filter((r) => r.status === 'Scheduled' || r.status === 'In Inventory')
    .filter((r) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        r.userName.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.phone.includes(q)
      );
    })
    .sort((a, b) => new Date(a.callTime) - new Date(b.callTime));

  const completedCount = reminders.filter((r) => r.status === 'Called').length;

  return (
    <div className="view-fade-enter section-spacing">
      <div className="container-wide">
        
        {/* Operations Header Banner */}
        <div className="ringly-card" style={{ padding: '2.5rem 3rem', marginBottom: '2.5rem', background: '#0E1F27' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.12em' }}>
                [ OPERATOR DISPATCH CONSOLE ]
              </div>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '0.2rem' }}>
                LIVE CALL DISPATCH QUEUE
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                HUMAN OPERATORS ENGINE · SORTED ASCENDING BY SCHEDULED TIME
              </p>
            </div>

            {/* Auto Refresh Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  AUTO QUEUE SYNC
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cream)' }}>
                  NEXT REFRESH IN {secondsRemaining}s
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                  LAST SYNCED AT {lastRefreshed}
                </div>
              </div>

              <button
                className="btn-secondary"
                onClick={() => {
                  setLastRefreshed(new Date().toLocaleTimeString());
                  setSecondsRemaining(30);
                }}
                style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}
              >
                SYNC NOW
              </button>
            </div>
          </div>
        </div>


        {/* Operational Stats & Search Filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '0.8rem 1.4rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACTIVE QUEUE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cream)' }}>{activeQueue.length} CALLS</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '0.8rem 1.4rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>COMPLETED TODAY</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2ECC71' }}>{completedCount} CALLED</div>
            </div>
          </div>

          <div style={{ width: '320px' }}>
            <input
              type="text"
              className="ringly-input"
              placeholder="Search queue by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>


        {/* Queue Items List (Large Action Targets for Operators) */}
        {activeQueue.length === 0 ? (
          <div className="ringly-card" style={{ padding: '5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            🎉 Queue is clean! No scheduled calls pending right now.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeQueue.map((item, index) => {
              const callDate = new Date(item.callTime);
              return (
                <div
                  key={item.id}
                  className="ringly-card"
                  style={{
                    padding: '2rem 2.5rem',
                    borderLeft: index === 0 ? '6px solid var(--accent-cream)' : '1px solid var(--border-subtle)',
                    background: index === 0 ? 'var(--bg-card)' : 'var(--bg-dark-secondary)'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
                    
                    {/* Left: Call Context */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.4rem' }}>
                        {index === 0 && (
                          <span style={{
                            background: 'var(--accent-cream)',
                            color: 'var(--bg-dark)',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.6rem',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-display)'
                          }}>
                            NEXT IN LINE
                          </span>
                        )}
                        <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent-cream)' }}>
                          ⏰ {callDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span style={{ color: 'var(--text-subtle)' }}>·</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          {callDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '0.5rem' }}>
                        {item.title}
                      </h2>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <div>
                          SUBSCRIBER: <strong style={{ color: 'var(--text-white)' }}>{item.userName}</strong>
                        </div>
                        <div>
                          PHONE: <strong style={{ color: 'var(--accent-cream)', fontSize: '1.1rem' }}>{item.phone}</strong>
                        </div>
                      </div>

                      {item.notes && (
                        <div style={{
                          marginTop: '0.8rem',
                          background: 'var(--bg-dark)',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                          color: 'var(--accent-cream)'
                        }}>
                          📌 OPERATOR INSTRUCTION: "{item.notes}"
                        </div>
                      )}
                    </div>

                    {/* Right: Large Operational Action Targets */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '220px' }}>
                      <button
                        onClick={() => updateReminderStatus(item.id, 'Called')}
                        style={{
                          backgroundColor: '#2ECC71',
                          color: '#0A2514',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.9rem 1.25rem',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '0.88rem',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 12px rgba(46, 204, 113, 0.2)'
                        }}
                      >
                        ✓ MARK CALLED
                      </button>

                      <button
                        onClick={() => updateReminderStatus(item.id, 'Missed')}
                        style={{
                          backgroundColor: 'rgba(231, 76, 60, 0.15)',
                          color: '#E74C3C',
                          border: '1px solid #E74C3C',
                          borderRadius: '8px',
                          padding: '0.75rem 1.25rem',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        ✕ NO ANSWER / MISSED
                      </button>

                      <button
                        onClick={() => updateReminderStatus(item.id, 'In Inventory')}
                        style={{
                          backgroundColor: 'rgba(155, 89, 182, 0.15)',
                          color: '#9B59B6',
                          border: '1px solid #9B59B6',
                          borderRadius: '8px',
                          padding: '0.75rem 1.25rem',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        ↻ INVENTORY / SICK
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
