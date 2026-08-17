import React from 'react';
import { formatSubscriptionEnd } from '../../utils/dateHelpers';

export default function SubscriptionSummary({ subscription, onManageClick }) {
  const { isActive, callsPerDay, price, endDate } = subscription;
  const endLabel = formatSubscriptionEnd(endDate);

  return (
    <div className="dashboard-stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="dashboard-stat-label">Active Plan</span>
        {onManageClick && (
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '0.2rem 0', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}
            onClick={onManageClick}
          >
            Manage →
          </button>
        )}
      </div>

      <div className="dashboard-stat-value">
        {callsPerDay} {callsPerDay === 1 ? 'call' : 'calls'} / day
      </div>

      <div className="dashboard-stat-sub">
        ₹{price} / week · {isActive ? endLabel : 'Plan Inactive'}
      </div>
    </div>
  );
}
