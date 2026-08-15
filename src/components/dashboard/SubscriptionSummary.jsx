import React from 'react';
import { formatSubscriptionEnd } from '../../utils/dateHelpers';

/**
 * SubscriptionSummary — Compact plan information card.
 * 
 * Shows: calls/day, weekly price, subscription end, and manage action.
 */
export default function SubscriptionSummary({ subscription, onManageClick }) {
  const { isActive, callsPerDay, price, endDate } = subscription;
  const endLabel = formatSubscriptionEnd(endDate);

  return (
    <div className="stat-card dashboard-slide-up" id="dashboard-subscription">
      <div className="stat-card-header">
        <div className="stat-card-label font-mono">YOUR PLAN</div>
        {onManageClick && (
          <button
            type="button"
            className="stat-card-link-btn font-mono"
            onClick={onManageClick}
          >
            DETAILS →
          </button>
        )}
      </div>

      <div className="stat-card-value font-display">
        {callsPerDay}
        <span className="unit font-mono">CALLS / DAY</span>
      </div>

      <div className="stat-card-sub font-mono">
        <span>
          ₹{price} / WEEK · {isActive ? endLabel : 'INACTIVE'}
        </span>
      </div>
    </div>
  );
}
