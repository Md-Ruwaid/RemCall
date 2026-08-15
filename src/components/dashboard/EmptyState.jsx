import React from 'react';

/**
 * EmptyState — First-use empty dashboard state.
 * 
 * Communicates: no calls yet, why that matters, and what to do next.
 * Primary action: Schedule a call.
 * Never shows "No data found" — this is intentional product copy.
 */
export default function EmptyState({ onScheduleClick }) {
  return (
    <div className="empty-state dashboard-fade-in">
      <div className="empty-state-icon" aria-hidden="true">
        ☎
      </div>

      <h2 className="empty-state-title">
        NO CALLS YET
      </h2>

      <p className="empty-state-text">
        Your first human operator call is one step away. Schedule a call and we'll ring you at the exact time — no app notifications, no silent alerts.
      </p>

      <button
        className="empty-state-cta"
        onClick={onScheduleClick}
      >
        <span style={{ fontSize: '1.1rem', fontWeight: 400 }}>+</span>
        SCHEDULE A CALL
      </button>

      <div style={{
        marginTop: '2.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'rgba(160, 192, 208, 0.4)',
        letterSpacing: '0.06em'
      }}>
        A REAL HUMAN WILL CALL YOUR PHONE
      </div>
    </div>
  );
}
