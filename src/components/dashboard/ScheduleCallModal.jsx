import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * ScheduleCallModal — Schedule a new human operator call modal.
 * 
 * Clean overlay modal with title, datetime, notes inputs.
 * Handles: idle → submitting → success states.
 * Prevents duplicate submissions.
 */
export default function ScheduleCallModal({ isOpen, onClose }) {
  const { addReminder } = useApp();

  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dateTime.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Parse the datetime-local input into an ISO string
    const callTime = new Date(dateTime);

    // Simulate async (mock — backend integration ready)
    setTimeout(() => {
      addReminder(title, callTime, notes);
      setIsSubmitting(false);
      setShowSuccess(true);

      // Auto-close after success confirmation
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1200);
    }, 400);
  };

  const resetForm = () => {
    setTitle('');
    setDateTime('');
    setNotes('');
    setIsSubmitting(false);
    setShowSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Get min datetime (now, rounded up to next 15 minutes)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="schedule-modal-overlay" onClick={handleClose}>
      <div
        className="schedule-modal view-fade-enter"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Schedule a call"
      >
        <button
          className="schedule-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {showSuccess ? (
          /* ─── Success State ─── */
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: 'var(--accent-green)'
            }}>
              ✓
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 800,
              color: 'var(--text-white)',
              textTransform: 'uppercase'
            }}>
              CALL SCHEDULED
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginTop: '0.5rem'
            }}>
              YOUR HUMAN OPERATOR WILL RING AT THE SCHEDULED TIME.
            </div>
          </div>
        ) : (
          /* ─── Form ─── */
          <>
            <div className="font-mono" style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontWeight: 700,
              letterSpacing: '0.08em'
            }}>
              [ SCHEDULE OPERATOR CALL ]
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--text-white)',
              marginTop: '0.25rem',
              marginBottom: '1.5rem'
            }}>
              NEW REMINDER
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="font-mono" style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase'
                }}>
                  CALL TITLE / TASK
                </label>
                <input
                  type="text"
                  className="ringly-input"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Finalize Q3 Pitch Deck"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="font-mono" style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase'
                }}>
                  CALL DATE & TIME
                </label>
                <input
                  type="datetime-local"
                  className="ringly-input"
                  value={dateTime}
                  onChange={e => setDateTime(e.target.value)}
                  min={getMinDateTime()}
                  required
                  disabled={isSubmitting}
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div>
                <label className="font-mono" style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase'
                }}>
                  OPERATOR INSTRUCTIONS (OPTIONAL)
                </label>
                <textarea
                  className="ringly-input"
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Verify slide 12 readiness before board meeting."
                  style={{ resize: 'vertical' }}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'SCHEDULING…' : 'SCHEDULE CALL'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
