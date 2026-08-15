import React from 'react';

/**
 * WeeklyAllowance — Compact allowance/usage card.
 * 
 * Shows daily call usage vs limit with a visual progress bar.
 * Provides direct link to view full schedule timeline in Calls tab.
 */
export default function WeeklyAllowance({ allowance, scheduledCount, onViewTimeline }) {
  const { callsUsedToday, dailyLimit, remaining, usagePercent } = allowance;

  return (
    <div className="stat-card dashboard-slide-up" id="dashboard-allowance">
      <div className="stat-card-header">
        <div className="stat-card-label font-mono">DAILY ALLOWANCE</div>
        {onViewTimeline && (
          <button
            type="button"
            className="stat-card-link-btn font-mono"
            onClick={onViewTimeline}
          >
            TIMELINE →
          </button>
        )}
      </div>

      <div className="stat-card-value font-display">
        {callsUsedToday} / {dailyLimit}
        <span className="unit font-mono">CALLS</span>
      </div>

      <div className="allowance-bar-track">
        <div
          className="allowance-bar-fill"
          style={{ width: `${Math.min(usagePercent, 100)}%` }}
          role="progressbar"
          aria-valuenow={callsUsedToday}
          aria-valuemin={0}
          aria-valuemax={dailyLimit}
          aria-label={`${callsUsedToday} of ${dailyLimit} daily calls used`}
        />
      </div>

      <div className="stat-card-sub font-mono">
        {remaining > 0
          ? `${remaining} REMAINING · ${scheduledCount} SCHEDULED`
          : `LIMIT REACHED · ${scheduledCount} SCHEDULED`
        }
      </div>
    </div>
  );
}
