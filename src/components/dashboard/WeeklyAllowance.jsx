import React from 'react';

export default function WeeklyAllowance({ allowance, scheduledCount, onViewTimeline }) {
  const { callsUsedToday, dailyLimit, remaining, usagePercent } = allowance;

  return (
    <div className="dashboard-stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="dashboard-stat-label">Today's Allowance</span>
        {onViewTimeline && (
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '0.2rem 0', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}
            onClick={onViewTimeline}
          >
            Timeline →
          </button>
        )}
      </div>

      <div>
        <div className="dashboard-stat-value">
          {callsUsedToday} of {dailyLimit} <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>calls used</span>
        </div>

        <div className="allowance-bar-track" style={{ marginTop: '0.75rem' }}>
          <div
            className="allowance-bar-fill"
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
            role="progressbar"
            aria-valuenow={callsUsedToday}
            aria-valuemin={0}
            aria-valuemax={dailyLimit}
          />
        </div>
      </div>

      <div className="dashboard-stat-sub">
        {remaining > 0
          ? `${remaining} remaining today · ${scheduledCount} total scheduled`
          : `Quota reached for today · ${scheduledCount} total scheduled`
        }
      </div>
    </div>
  );
}
