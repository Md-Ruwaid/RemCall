import React from 'react';
import { formatCallTime, formatCallDate } from '../../utils/dateHelpers';

/**
 * RecentHistory — Compact historical list of past calls.
 * 
 * Visually quieter than upcoming calls.
 * Shows status icon + title + time, one line per entry.
 */
export default function RecentHistory({ history }) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="dashboard-slide-up" id="dashboard-history">
      <div className="dashboard-section-label">[ RECENT ]</div>
      <div className="history-list">
        {history.map(call => {
          const statusKey = call.status?.toUpperCase();

          let iconClass = 'history-icon';
          let icon = '●';
          if (statusKey === 'CALLED') { iconClass = 'history-icon history-icon--called'; icon = '✓'; }
          else if (statusKey === 'MISSED') { iconClass = 'history-icon history-icon--missed'; icon = '×'; }
          else if (statusKey === 'IN INVENTORY') { iconClass = 'history-icon history-icon--inventory'; icon = '↻'; }

          return (
            <div className="history-row" key={call.id}>
              <div className="history-left">
                <span className={iconClass}>{icon}</span>
                <span className="history-title">{call.title}</span>
              </div>
              <span className="history-time">
                {call.callTime ? `${formatCallTime(call.callTime)} · ${formatCallDate(call.callTime)}` : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
