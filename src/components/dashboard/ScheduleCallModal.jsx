import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

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
    const callTime = new Date(dateTime);

    setTimeout(() => {
      addReminder(title, callTime, notes);
      setIsSubmitting(false);
      setShowSuccess(true);

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
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '0.75rem',
              color: 'var(--accent-green)'
            }}>
              ✓
            </div>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Call scheduled
            </h2>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)'
            }}>
              Your human operator will dial your phone at the scheduled time.
            </p>
          </div>
        ) : (
          <>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '0.35rem'
            }}>
              New Reminder
            </div>

            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem'
            }}>
              Schedule operator call
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}>
                  What should we call you about?
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
                <label style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}>
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="ringly-input"
                  value={dateTime}
                  onChange={e => setDateTime(e.target.value)}
                  min={getMinDateTime()}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}>
                  Operator Instructions (Optional)
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
                className="btn-primary btn-coral"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem'
                }}
              >
                {isSubmitting ? 'Scheduling…' : 'Schedule Call'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
