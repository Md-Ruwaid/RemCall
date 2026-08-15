import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatSubscriptionEnd } from '../../utils/dateHelpers';

/**
 * SubscriptionView — Dedicated Subscription, Allowance & Telephony Settings View
 * 
 * Provides:
 *   - Active plan specifications and weekly pricing
 *   - Daily call allowance and capacity
 *   - Subscriber phone line on file
 *   - Direct CTA to modify plan or upgrade limits
 */
export default function SubscriptionView({ user, subscription, allowance }) {
  const { setIsSubscribeModalOpen } = useApp();
  const { callsPerDay, price, endDate, isActive, inventoryCredits } = subscription;
  const { callsUsedToday, dailyLimit, remaining, usagePercent } = allowance;
  const endLabel = formatSubscriptionEnd(endDate);

  return (
    <div className="dashboard-subview-container view-fade-enter">
      {/* Subview Header */}
      <div className="subview-header">
        <div>
          <div className="subview-label font-mono">[ PROTOCOL & BILLING ]</div>
          <h1 className="subview-title font-display">SUBSCRIPTION</h1>
        </div>

        <button
          type="button"
          className="subview-action-btn font-display"
          onClick={() => setIsSubscribeModalOpen(true)}
        >
          <span>CHANGE PLAN</span>
        </button>
      </div>

      {/* Grid of Subscription Specs */}
      <div className="subscription-details-grid">
        {/* Card 1: Current Plan Details */}
        <div className="subscription-card dashboard-slide-up">
          <div className="subscription-card-header font-mono">
            <span>[ ACTIVE PROTOCOL ]</span>
            <span className="badge-status badge-called">
              {isActive ? '● ACTIVE' : 'INACTIVE'}
            </span>
          </div>

          <div className="subscription-plan-title font-display">
            {callsPerDay} CALLS / DAY
          </div>

          <div className="subscription-plan-price font-display">
            ₹{price} <span className="unit font-mono">/ WEEK</span>
          </div>

          <div className="subscription-plan-meta font-mono">
            <div>RENEWAL: {endLabel}</div>
            <div>BILLING: ₹149 BASE + ₹60 / EXTRA DAILY CALL</div>
          </div>

          <div className="subscription-card-footer">
            <button
              type="button"
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
              onClick={() => setIsSubscribeModalOpen(true)}
            >
              UPGRADE / MODIFY LIMITS
            </button>
          </div>
        </div>

        {/* Card 2: Daily Allowance & Credits */}
        <div className="subscription-card dashboard-slide-up">
          <div className="subscription-card-header font-mono">
            <span>[ USAGE CAPACITY ]</span>
            <span className="font-mono" style={{ color: 'var(--accent-cream)' }}>
              TODAY'S QUOTA
            </span>
          </div>

          <div className="subscription-plan-title font-display">
            {callsUsedToday} / {dailyLimit} <span className="unit font-mono">USED</span>
          </div>

          <div className="allowance-bar-track" style={{ height: '8px', marginTop: '1rem', marginBottom: '1rem' }}>
            <div
              className="allowance-bar-fill"
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>

          <div className="subscription-plan-meta font-mono">
            <div>REMAINING TODAY: {remaining} CALLS</div>
            <div>INVENTORY CREDITS: {inventoryCredits} RESERVED</div>
            <div>STATUS: OPERATOR DISPATCH READY</div>
          </div>
        </div>

        {/* Card 3: Registered Telephony Phone */}
        <div className="subscription-card dashboard-slide-up" style={{ gridColumn: '1 / -1' }}>
          <div className="subscription-card-header font-mono">
            <span>[ VERIFIED SUBSCRIBER LINE ]</span>
            <span className="badge-status badge-scheduled">VOICE LINE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                SUBSCRIBER: {user?.name || 'SARAH CONNOR'}
              </div>
              <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-white)', marginTop: '0.25rem' }}>
                {user?.phone || '+1 (555) 019-2834'}
              </div>
            </div>

            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.5 }}>
              * Operator calls are dispatched directly to this cellular voice line. No app notifications or internet connection required for call reception.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
