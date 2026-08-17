import React from 'react';

export default function EmptyState({ onScheduleClick }) {
  return (
    <div className="subview-empty-card">
      <div className="subview-empty-icon" aria-hidden="true">
        ☎
      </div>

      <h2 className="subview-empty-title">
        No calls scheduled yet
      </h2>

      <p className="subview-empty-text">
        Your first human operator call is one step away. Schedule a call and we'll ring you at the exact time — no app notifications, no silent alerts.
      </p>

      <button
        type="button"
        className="btn-primary btn-coral"
        onClick={onScheduleClick}
        style={{ marginTop: '0.75rem' }}
      >
        + Schedule a call
      </button>
    </div>
  );
}
