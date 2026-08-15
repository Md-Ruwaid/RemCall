import React from 'react';
import { formatCallTime, formatCallDate, getRelativeTime } from '../../utils/dateHelpers';

/**
 * NextCallHero — The dashboard's primary visual anchor.
 * 
 * Displays the next upcoming call with large prominent time,
 * title, relative time, status, and direct "VIEW CALL →" action.
 * Refined in V1.1 to be vertically tight, balanced, and free of dead space.
 */
export default function NextCallHero({ call, onViewCall }) {
  if (!call) {
    return (
      <div className="next-call-hero dashboard-slide-up" id="dashboard-next-call">
        <div className="next-call-top-row">
          <div className="next-call-label font-mono">[ NEXT UPCOMING CALL ]</div>
          <span className="badge-status font-mono" style={{ background: 'rgba(160, 192, 208, 0.1)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
            QUEUE EMPTY
          </span>
        </div>
        <div className="next-call-time" style={{ color: 'var(--text-muted)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginTop: '0.5rem' }}>
          NO CALLS SCHEDULED
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          marginTop: '0.5rem',
          lineHeight: 1.5
        }}>
          Schedule your next human operator telephone call to enforce accountability.
        </div>
      </div>
    );
  }

  const time = formatCallTime(call.callTime);
  const dateLabel = formatCallDate(call.callTime);
  const relative = getRelativeTime(call.callTime);

  // Determine status badge class
  const statusKey = call.status?.toUpperCase();
  let badgeClass = 'badge-status badge-scheduled';
  let statusIcon = '●';
  if (statusKey === 'CALLED') {
    badgeClass = 'badge-status badge-called';
    statusIcon = '✓';
  } else if (statusKey === 'MISSED') {
    badgeClass = 'badge-status badge-missed';
    statusIcon = '×';
  } else if (statusKey === 'IN INVENTORY') {
    badgeClass = 'badge-status badge-inventory';
    statusIcon = '↻';
  }

  return (
    <div className="next-call-hero dashboard-slide-up" id="dashboard-next-call">
      {/* Top Header Row within Hero */}
      <div className="next-call-top-row">
        <div className="next-call-label font-mono">[ NEXT UPCOMING CALL ]</div>
        {call.id && (
          <div className="next-call-id font-mono">
            CALL / {call.id.replace('rem-', '').padStart(5, '0')}
          </div>
        )}
      </div>

      {/* Main Body Grid */}
      <div className="next-call-main">
        <div className="next-call-time-block">
          <div className="next-call-time font-display">{time}</div>
          <div className="next-call-relative font-mono">{relative}</div>
        </div>

        <div className="next-call-details-block">
          <h2 className="next-call-title font-display">{call.title}</h2>
          
          <div className="next-call-meta">
            <span className="next-call-day font-mono">{dateLabel}</span>
            <span className={badgeClass}>
              {statusIcon} {call.status}
            </span>
          </div>

          {call.notes && (
            <p className="next-call-notes">
              {call.notes}
            </p>
          )}
        </div>
      </div>

      {/* Hero Bottom Action Row */}
      {onViewCall && (
        <div className="next-call-footer">
          <button
            type="button"
            className="next-call-action-btn font-mono"
            onClick={onViewCall}
          >
            VIEW IN FULL SCHEDULE →
          </button>
        </div>
      )}
    </div>
  );
}
