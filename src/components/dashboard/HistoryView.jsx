import React, { useState, useMemo } from 'react';
import { formatCallTime, formatCallDate } from '../../utils/dateHelpers';

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
          <div className="subview-label">Activity Log</div>
          <h1 className="subview-title">Call History</h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="history-filter-bar">
        {[
          { id: 'ALL', label: `All (${counts.all})` },
          { id: 'CALLED', label: `Completed (${counts.called})` },
          { id: 'MISSED', label: `Missed (${counts.missed})` },
          { id: 'IN INVENTORY', label: `Inventory (${counts.inventory})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`history-filter-btn ${filter === tab.id ? 'history-filter-btn--active' : ''}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredHistory.length === 0 ? (
        <div className="subview-empty-card">
          <div className="subview-empty-icon">✓</div>
          <h3 className="subview-empty-title">No history records found</h3>
          <p className="subview-empty-text">
            {filter === 'ALL'
              ? 'Past completed and verified reminder calls will be logged here.'
              : `No calls found with status "${filter}".`}
          </p>
        </div>
      ) : (
        <div className="history-detailed-list">
          {filteredHistory.map((call) => {
            const timeVal = call.callTime || call.time;
            const statusKey = call.status?.toUpperCase();

            let badgeClass = 'badge-status badge-called';
            if (statusKey === 'MISSED') badgeClass = 'badge-status badge-missed';
            else if (statusKey === 'IN INVENTORY') badgeClass = 'badge-status badge-inventory';

            return (
              <div className="history-card" key={call.id}>
                <div className="history-card-top">
                  <span className={badgeClass}>
                    {call.status}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {timeVal ? `${formatCallDate(timeVal)} · ${formatCallTime(timeVal)}` : ''}
                  </span>
                </div>

                <h3 className="history-card-title">{call.title}</h3>

                {call.notes && (
                  <div className="history-card-notes">
                    <strong>Operator Log:</strong> {call.notes}
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
