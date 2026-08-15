import React, { useState, useMemo } from 'react';
import { formatCallTime, formatCallDate } from '../../utils/dateHelpers';

/**
 * HistoryView — Dedicated Call History & Log Archive View
 * 
 * Provides:
 *   - Clear filterable list of all completed, missed, or inventory calls
 *   - Detailed verification notes and operator logs
 *   - Calmer, scannable presentation
 */
export default function HistoryView({ history = [] }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'CALLED' | 'MISSED' | 'IN INVENTORY'

  const filteredHistory = useMemo(() => {
    if (filter === 'ALL') return history;
    return history.filter(call => call.status?.toUpperCase() === filter);
  }, [history, filter]);

  const counts = useMemo(() => {
    return {
      all: history.length,
      called: history.filter(c => c.status?.toUpperCase() === 'CALLED').length,
      missed: history.filter(c => c.status?.toUpperCase() === 'MISSED').length,
      inventory: history.filter(c => c.status?.toUpperCase() === 'IN INVENTORY').length,
    };
  }, [history]);

  return (
    <div className="dashboard-subview-container view-fade-enter">
      {/* Subview Header */}
      <div className="subview-header">
        <div>
          <div className="subview-label font-mono">[ LOG ARCHIVE ]</div>
          <h1 className="subview-title font-display">CALL HISTORY</h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="history-filter-bar">
        {[
          { id: 'ALL', label: `ALL (${counts.all})` },
          { id: 'CALLED', label: `CALLED (${counts.called})` },
          { id: 'MISSED', label: `MISSED (${counts.missed})` },
          { id: 'IN INVENTORY', label: `INVENTORY (${counts.inventory})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`history-filter-btn font-mono ${filter === tab.id ? 'history-filter-btn--active' : ''}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredHistory.length === 0 ? (
        <div className="subview-empty-card">
          <div className="subview-empty-icon">✓</div>
          <h3 className="subview-empty-title font-display">NO HISTORY RECORDS FOUND</h3>
          <p className="subview-empty-text">
            {filter === 'ALL'
              ? 'Past completed and verified reminder calls will be logged here.'
              : `No calls found with status "${filter}".`}
          </p>
        </div>
      ) : (
        <div className="history-detailed-list">
          {filteredHistory.map((call) => {
            const statusKey = call.status?.toUpperCase();

            let badgeClass = 'badge-status badge-called';
            let statusIcon = '✓';
            if (statusKey === 'MISSED') {
              badgeClass = 'badge-status badge-missed';
              statusIcon = '×';
            } else if (statusKey === 'IN INVENTORY') {
              badgeClass = 'badge-status badge-inventory';
              statusIcon = '↻';
            }

            return (
              <div className="history-card dashboard-slide-up" key={call.id}>
                <div className="history-card-top">
                  <div className="history-card-badges">
                    <span className={badgeClass}>
                      {statusIcon} {call.status}
                    </span>
                    <span className="history-card-time font-mono">
                      {call.callTime ? `${formatCallDate(call.callTime)} · ${formatCallTime(call.callTime)}` : ''}
                    </span>
                  </div>

                  {call.id && (
                    <div className="history-card-id font-mono">
                      LOG / {call.id.replace('rem-', '').padStart(5, '0')}
                    </div>
                  )}
                </div>

                <h3 className="history-card-title font-display">{call.title}</h3>

                {call.notes && (
                  <div className="history-card-notes font-mono">
                    <span className="notes-label">[ OPERATOR LOG ]:</span> {call.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
