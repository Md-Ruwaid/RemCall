import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SubscriberDashboard() {
  const { user, reminders, addReminder, deleteReminder, setIsSubscribeModalOpen } = useApp();

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getTodayYYYYMMDD());
  const [time, setTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sunday cutoff calculation
  const sundayLimitStr = user.subscriptionEnd ? new Date(user.subscriptionEnd).toISOString().split('T')[0] : getUpcomingSundayYYYYMMDD();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!user.subscriptionActive) {
      setErrorMsg('Subscription inactive. Please subscribe to schedule daily calls.');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please enter a reminder title.');
      return;
    }

    // Validate callTime is in the future
    const scheduledDateTime = new Date(`${date}T${time}:00`);
    if (isNaN(scheduledDateTime.getTime()) || scheduledDateTime < new Date()) {
      setErrorMsg('Cannot schedule a call reminder in the past. Please select a future time.');
      return;
    }

    // Validate callTime is before subscriptionEnd (Sunday cutoff rule)
    const subEndDateTime = new Date(user.subscriptionEnd);
    if (scheduledDateTime >= subEndDateTime) {
      setErrorMsg(`PRD Rule Violation: Call time must be strictly before Sunday cutoff (${subEndDateTime.toLocaleString()}).`);
      return;
    }

    // Enforce Daily Call Limit rule
    const callsOnSelectedDate = reminders.filter((r) => {
      if (r.userId !== 'usr-1' || r.status === 'Cancelled' || r.status === 'Missed') return false;
      const rDate = new Date(r.callTime);
      return (
        rDate.getFullYear() === scheduledDateTime.getFullYear() &&
        rDate.getMonth() === scheduledDateTime.getMonth() &&
        rDate.getDate() === scheduledDateTime.getDate()
      );
    });

    if (callsOnSelectedDate.length >= user.dailyCallLimit) {
      setErrorMsg(`Daily Limit Reached: Your subscription allows a maximum of ${user.dailyCallLimit} call(s) per day.`);
      return;
    }

    // Add reminder
    addReminder({
      title,
      callTime: scheduledDateTime.toISOString(),
      notes
    });

    setSuccessMsg('Reminder successfully scheduled! Our human operators have queued your call.');
    setTitle('');
    setNotes('');
  };

  const userReminders = reminders.filter((r) => r.userId === 'usr-1');

  return (
    <div className="view-fade-enter section-spacing">
      <div className="container-wide">
        
        {/* Top Header Card */}
        <div className="ringly-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.1em' }}>
                [ SUBSCRIBER CONSOLE ]
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '0.2rem' }}>
                MY SCHEDULED CALLS
              </h1>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                ACCOUNT: <strong style={{ color: 'var(--text-white)' }}>{user.name}</strong> ({user.phone}) · ALLOWANCE: <strong style={{ color: 'var(--accent-cream)' }}>{user.dailyCallLimit} CALLS/DAY</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                background: user.subscriptionActive ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                border: `1px solid ${user.subscriptionActive ? '#2ECC71' : '#E74C3C'}`,
                padding: '0.6rem 1.2rem',
                borderRadius: '0px',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: user.subscriptionActive ? '#2ECC71' : '#E74C3C',
                textTransform: 'uppercase'
              }}>
                {user.subscriptionActive ? 'SUBSCRIPTION ACTIVE' : 'SUBSCRIPTION EXPIRED'}
              </div>
              {!user.subscriptionActive && (
                <button className="btn-primary" onClick={() => setIsSubscribeModalOpen(true)} style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>
                  RENEW NOW
                </button>
              )}
            </div>
          </div>
        </div>


        {/* Main Grid: Form + Boarding Pass List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: '2.5rem' }}>
          
          {/* Scheduling Form */}
          <div className="ringly-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--text-white)' }}>
              NEW CALL REMINDER
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Enter instructions for the human operator who will call your phone.
            </p>

            {errorMsg && (
              <div style={{ background: 'rgba(231,76,60,0.15)', border: '1px solid #E74C3C', color: '#E74C3C', padding: '0.8rem', borderRadius: '0px', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div style={{ background: 'rgba(46,204,113,0.15)', border: '1px solid #2ECC71', color: '#2ECC71', padding: '0.8rem', borderRadius: '0px', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  REMINDER TITLE / WHAT TO REMEMBER
                </label>
                <input
                  type="text"
                  className="ringly-input"
                  placeholder="e.g. Take 20mg Blood Pressure Tablet"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    DATE (MAX: SUNDAY)
                  </label>
                  <input
                    type="date"
                    className="ringly-input"
                    max={sundayLimitStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    CALL TIME
                  </label>
                  <input
                    type="time"
                    className="ringly-input"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  OPERATOR NOTES (OPTIONAL)
                </label>
                <textarea
                  className="ringly-input"
                  rows={3}
                  placeholder="e.g. Ensure I acknowledge taking it with water before hanging up."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                SCHEDULE HUMAN CALL
              </button>
            </form>
          </div>


          {/* Boarding Pass Ticket Reminder Cards List */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-white)' }}>
                ACTIVE TICKETS ({userReminders.length})
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                SUNDAY CUTOFF ENFORCED
              </span>
            </div>

            {userReminders.length === 0 ? (
              <div className="ringly-card" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No call reminders scheduled yet. Create your first reminder using the form!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {userReminders.map((rem) => {
                  const callDate = new Date(rem.callTime);
                  return (
                    <div
                      key={rem.id}
                      className="ringly-card"
                      style={{
                        padding: '1.75rem 2rem',
                        borderLeft: '5px solid var(--accent-cream)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        position: 'relative'
                      }}
                    >
                      {/* Ticket Header Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-display)', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.08em' }}>
                            TICKET ID: {rem.id.toUpperCase()}
                          </div>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-white)', marginTop: '0.15rem' }}>
                            {rem.title}
                          </h3>
                        </div>

                        {/* Status Badge & Cancel Action */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {rem.status === 'Scheduled' && (
                            <>
                              <span className="badge-status badge-scheduled">
                                <span className="dot-indicator" /> SCHEDULED
                              </span>
                              <button
                                onClick={() => deleteReminder(rem.id)}
                                style={{
                                  background: 'transparent',
                                  border: '1px solid var(--border-subtle)',
                                  color: 'var(--text-muted)',
                                  fontSize: '0.7rem',
                                  fontFamily: 'var(--font-mono)',
                                  padding: '0.25rem 0.55rem',
                                  borderRadius: '0px',
                                  cursor: 'pointer'
                                }}
                                title="Cancel this scheduled call"
                              >
                                ✕ CANCEL
                              </button>
                            </>
                          )}
                          {rem.status === 'Called' && (
                            <span className="badge-status badge-called">
                              ✓ CALLED
                            </span>
                          )}
                          {rem.status === 'Missed' && (
                            <span className="badge-status badge-missed">
                              ✕ MISSED
                            </span>
                          )}
                          {rem.status === 'In Inventory' && (
                            <span className="badge-status badge-inventory">
                              ↻ IN INVENTORY
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Ticket Details Bar */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        paddingTop: '0.75rem',
                        borderTop: '1px dashed var(--border-subtle)',
                        flexWrap: 'wrap'
                      }}>
                        <div>
                          📅 <strong style={{ color: 'var(--text-white)' }}>{callDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong>
                        </div>
                        <div>
                          ⏰ <strong style={{ color: 'var(--accent-cream)' }}>{callDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</strong>
                        </div>
                        <div>
                          📞 <strong style={{ color: 'var(--text-white)' }}>{rem.phone}</strong>
                        </div>
                      </div>

                      {rem.notes && (
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', background: 'var(--bg-dark)', padding: '0.6rem 0.9rem', borderRadius: '0px' }}>
                          Note for caller: "{rem.notes}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

function getTodayYYYYMMDD() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getUpcomingSundayYYYYMMDD() {
  const d = new Date();
  const day = d.getDay();
  const daysUntilSunday = (7 - day) % 7;
  const sunday = new Date(d);
  sunday.setDate(d.getDate() + daysUntilSunday);
  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const dateStr = String(sunday.getDate()).padStart(2, '0');
  return `${year}-${month}-${dateStr}`;
}
