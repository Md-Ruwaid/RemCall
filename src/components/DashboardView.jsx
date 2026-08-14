import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function DashboardView() {
  const { user, reminders, addReminder, deleteReminder, updateReminderStatus } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const [editingId, setEditingId] = useState(null);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime.trim()) return;
    addReminder(newTitle, newTime, newNotes);
    setNewTitle('');
    setNewTime('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const callsRemainingToday = Math.max(0, user.dailyCallLimit - user.callsUsedToday);

  return (
    <div
      className="view-fade-enter"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-white)',
        paddingTop: '6rem',
        paddingBottom: '5rem'
      }}
    >
      <div className="container-wide" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Readout Bar */}
        <div
          style={{
            background: 'var(--bg-dark-secondary, #162C37)',
            border: '1px solid var(--border-subtle, #3A5C6E)',
            borderRadius: '0px',
            padding: '1.25rem 1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem' }}>
            <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-cream)', letterSpacing: '0.08em' }}>
              [ ACCOUNT STATUS: ACTIVE ]
            </div>
            <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              [ PLAN: ₹149/WK ]
            </div>
            <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FD6B00', letterSpacing: '0.08em' }}>
              [ CALLS REMAINING TODAY: {callsRemainingToday}/{user.dailyCallLimit} ]
            </div>
          </div>

          <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            SUBSCRIBER: {user.phone}
          </div>
        </div>

        {/* Dashboard Title & Action Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
              [ TELEPHONY CONTROL DASHBOARD ]
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-white)', marginTop: '0.2rem' }}>
              ACCOUNTABILITY REMINDERS
            </h1>
          </div>

          {/* Add Reminder Button styled like SpotlightButton */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              position: 'relative',
              background: 'var(--bg-card)',
              border: '1px solid var(--accent-cream)',
              color: 'var(--accent-cream)',
              padding: '0.9rem 1.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              borderRadius: '0px',
              cursor: 'pointer'
            }}
          >
            + ADD NEW REMINDER
          </button>
        </div>

        {/* Usage & Limit Summary Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Card 1: Usage Stat */}
          <div
            style={{
              background: 'var(--bg-card, #1C3644)',
              border: '1px solid var(--border-subtle, #3A5C6E)',
              borderRadius: '0px',
              padding: '1.5rem',
              boxShadow: 'none'
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              DAILY ALLOWANCE USAGE
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-cream)', lineHeight: 1 }}>
              {user.callsUsedToday} / {user.dailyCallLimit} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>CALLS</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              RATE: {user.dailyCallLimit} CALLS/DAY · AUTO-RENEWS SUNDAY
            </div>
          </div>

          {/* Card 2: Operational Status Stat */}
          <div
            style={{
              background: 'var(--bg-card, #1C3644)',
              border: '1px solid var(--border-subtle, #3A5C6E)',
              borderRadius: '0px',
              padding: '1.5rem',
              boxShadow: 'none'
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              OPERATOR VERIFICATION
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-white)', lineHeight: 1.2 }}>
              HUMAN OPERATOR VERIFIED
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              PHONE: {user.phone} · NO APP REQUIRED
            </div>
          </div>

          {/* Card 3: Active Reminders Summary */}
          <div
            style={{
              background: 'var(--bg-card, #1C3644)',
              border: '1px solid var(--border-subtle, #3A5C6E)',
              borderRadius: '0px',
              padding: '1.5rem',
              boxShadow: 'none'
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              ACTIVE SCHEDULED QUEUE
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-white)', lineHeight: 1 }}>
              {reminders.filter(r => r.status === 'SCHEDULED').length} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>PENDING</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              TOTAL LOGGED: {reminders.length} TASKS
            </div>
          </div>

        </div>

        {/* Upcoming Reminders Stacked List */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1rem' }}>
            [ UPCOMING & LOGGED REMINDERS ]
          </div>

          {reminders.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '3rem', textAlign: 'center' }}>
              <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                NO REMINDERS SCHEDULED. CLICK "+ ADD NEW REMINDER" TO SCHEDULE YOUR NEXT HUMAN CALL.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {reminders.map((rem) => {
                let statusBg = 'var(--accent-cream)';
                let statusColor = 'var(--bg-dark)';
                if (rem.status === 'CALLED') {
                  statusBg = 'var(--text-muted)';
                  statusColor = 'var(--bg-dark)';
                } else if (rem.status === 'MISSED') {
                  statusBg = '#E74C3C';
                  statusColor = '#FFFFFF';
                }

                return (
                  <div
                    key={rem.id}
                    style={{
                      background: 'var(--bg-card, #1C3644)',
                      border: '1px solid var(--border-subtle, #3A5C6E)',
                      borderRadius: '0px',
                      padding: '1.75rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      boxShadow: 'none',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        
                        {/* Status Tag */}
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            background: statusBg,
                            color: statusColor,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '0px'
                          }}
                        >
                          {rem.status}
                        </span>

                        {/* Scheduled Call Time */}
                        <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                          ⏱ {rem.time}
                        </span>
                      </div>

                      {/* Reminder Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display, Space Grotesk, sans-serif)',
                          fontSize: '1.3rem',
                          fontWeight: 800,
                          color: 'var(--text-white)',
                          textTransform: 'uppercase',
                          margin: 0
                        }}
                      >
                        {rem.title}
                      </h3>

                      {rem.notes && (
                        <p className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem', margin: 0 }}>
                          {rem.notes}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons styled like SpotlightButton */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      
                      {rem.status === 'SCHEDULED' && (
                        <button
                          onClick={() => updateReminderStatus(rem.id, 'CALLED')}
                          style={{
                            background: 'var(--bg-dark)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-muted)',
                            padding: '0.5rem 0.9rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            borderRadius: '0px'
                          }}
                        >
                          MARK CALLED
                        </button>
                      )}

                      <button
                        onClick={() => deleteReminder(rem.id)}
                        style={{
                          background: 'var(--bg-dark)',
                          border: '1px solid #E74C3C',
                          color: '#E74C3C',
                          padding: '0.5rem 0.9rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          borderRadius: '0px'
                        }}
                      >
                        CANCEL
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ADD NEW REMINDER MODAL */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            backgroundColor: 'rgba(16, 33, 42, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            className="ringly-card view-fade-enter"
            style={{
              maxWidth: '500px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative',
              background: 'var(--bg-card, #1C3644)',
              border: '1px solid var(--border-subtle, #3A5C6E)',
              borderRadius: '0px',
              boxShadow: 'none'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.4rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
              [ SCHEDULE OPERATOR CALL ]
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-white)', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
              ADD NEW REMINDER
            </h2>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  REMINDER TASK / GOAL TITLE
                </label>
                <input
                  type="text"
                  className="ringly-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Finalize Q3 Pitch Deck Slides"
                  required
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  SCHEDULED CALL TIME & DATE
                </label>
                <input
                  type="text"
                  className="ringly-input"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="e.g. Today, 5:30 PM"
                  required
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  OPERATOR INSTRUCTIONS / NOTES (OPTIONAL)
                </label>
                <textarea
                  className="ringly-input"
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Ask if slide 12 graphics have been reviewed."
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                SCHEDULE CALL PROTOCOL
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
