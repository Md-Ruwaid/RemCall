import React from 'react';
import { formatCallTime, formatCallDate, getRelativeTime } from '../../utils/dateHelpers';

export default function NextCallHero({ call, onViewCall }) {
  if (!call) {
    return (
      <div className="next-call-hero">
        <div className="next-call-hero-header">
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Next Call
          </span>
          <span className="badge-status" style={{ backgroundColor: 'var(--bg-surface-subtle)', color: 'var(--text-secondary)' }}>
            No calls scheduled
          </span>
        </div>

        <div style={{ padding: '1rem 0' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Your call queue is clear
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
            Schedule an operator reminder to ensure important tasks get verified on time.
          </p>
        </div>
      </div>
    );
  }

  const time = formatCallTime(call.callTime || call.time);
  const dateLabel = formatCallDate(call.callTime || call.time);
  const relative = getRelativeTime(call.callTime || call.time);

  return (
    <div className="next-call-hero">
      <div className="next-call-hero-header">
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Next Call
        </span>
        <span className="next-call-badge">
          ● Scheduled
        </span>
      </div>

      <div>
        <div className="next-call-time-block">
          <div className="next-call-time">{time}</div>
          <div className="next-call-relative">{relative} · {dateLabel}</div>
        </div>

        <h2 className="next-call-title">{call.title}</h2>

        {call.notes && (
          <div className="next-call-notes" style={{ marginTop: '0.85rem' }}>
            <strong>Operator Instructions:</strong> {call.notes}
          </div>
        )}
      </div>

      {onViewCall && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '0.25rem' }}>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '0.4rem 0', color: 'var(--text-primary)', fontWeight: 600 }}
            onClick={onViewCall}
          >
            View call schedule →
          </button>
        </div>
      )}
    </div>
  );
}
