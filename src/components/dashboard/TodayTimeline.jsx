import React from 'react';
import { formatCallTime, isFuture } from '../../utils/dateHelpers';

/**
 * TodayTimeline — Chronological visualization of today's calls.
 * 
 * Vertical timeline with time markers, status dots, and call titles.
 * The next upcoming call is visually emphasized.
 */
export default function TodayTimeline({ todayCalls, nextCallId }) {
  if (!todayCalls || todayCalls.length === 0) {
    return (
      <div className="timeline-container dashboard-slide-up" id="dashboard-timeline">
        <div className="dashboard-section-label">[ TODAY ]</div>
        <div className="timeline-empty">
          NO CALLS SCHEDULED FOR TODAY
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-container dashboard-slide-up" id="dashboard-timeline">
      <div className="dashboard-section-label">[ TODAY ]</div>

      {todayCalls.map((call, index) => {
        const isNext = call.id === nextCallId;
        const isLast = index === todayCalls.length - 1;
        const statusKey = call.status?.toUpperCase();

        // Dot styling based on status
        let dotClass = 'timeline-dot';
        if (isNext) dotClass = 'timeline-dot timeline-dot--next';
        else if (statusKey === 'CALLED') dotClass = 'timeline-dot timeline-dot--called';
        else if (statusKey === 'MISSED') dotClass = 'timeline-dot timeline-dot--missed';

        // Status text + color
        let statusColor = 'var(--text-muted)';
        let statusIcon = '●';
        if (statusKey === 'CALLED') { statusColor = 'var(--accent-green)'; statusIcon = '✓'; }
        else if (statusKey === 'MISSED') { statusColor = 'var(--accent-red)'; statusIcon = '×'; }
        else if (statusKey === 'IN INVENTORY') { statusColor = '#9B59B6'; statusIcon = '↻'; }
        else if (statusKey === 'SCHEDULED' && isNext) { statusColor = 'var(--accent-cream)'; }

        return (
          <div className="timeline-row" key={call.id}>
            {/* Time column */}
            <div className="timeline-time">
              {formatCallTime(call.callTime)}
            </div>

            {/* Track column (dot + line) */}
            <div className="timeline-track">
              <div className={dotClass} />
              {!isLast && <div className="timeline-line" />}
            </div>

            {/* Content column */}
            <div className="timeline-content">
              <div className={`timeline-content-title${isNext ? ' timeline-content-title--next' : ''}`}>
                {call.title}
              </div>
              <div className="timeline-content-status" style={{ color: statusColor }}>
                {statusIcon} {call.status}
                {call.notes && (
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontWeight: 400 }}>
                    — {call.notes.length > 60 ? call.notes.slice(0, 60) + '…' : call.notes}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
