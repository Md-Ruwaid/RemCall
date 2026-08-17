import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatSubscriptionEnd } from '../../utils/dateHelpers';

export default function SubscriptionView({ user, subscription, allowance }) {
  const { setIsSubscribeModalOpen, setAuthModalMode } = useApp();
  const { callsPerDay, price, endDate, isActive, inventoryCredits } = subscription;
  const { callsUsedToday, dailyLimit, remaining, usagePercent } = allowance;
  const endLabel = formatSubscriptionEnd(endDate);

  const handleModifyPlan = () => {
    setAuthModalMode('subscribe');
    setIsSubscribeModalOpen(true);
  };

  return (
    <div className="dashboard-subview-container view-fade-enter">
      {/* Subview Header */}
      <div className="subview-header">
        <div>
          <div className="subview-label">Plan & Billing</div>
          <h1 className="subview-title">Subscription</h1>
        </div>

        <button
          type="button"
          className="subview-action-btn"
          onClick={handleModifyPlan}
        >
          <span>Modify plan</span>
        </button>
      </div>

      {/* Grid of Subscription Specs */}
      <div className="subscription-details-grid">
        {/* Card 1: Current Plan Details */}
        <div className="subscription-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Current Plan
            </span>
            <span className="badge-status badge-called">
              {isActive ? '● Active' : 'Inactive'}
            </span>
          </div>

          <div>
            <div className="subscription-plan-title">
              {callsPerDay} {callsPerDay === 1 ? 'call' : 'calls'} / day
            </div>
            <div className="subscription-plan-price">
              ₹{price} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/ week</span>
            </div>
          </div>

          <div className="subscription-plan-meta">
            <div><strong>Renews:</strong> {endLabel}</div>
            <div><strong>Billing rate:</strong> ₹149 base + ₹60 / extra daily call</div>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
            onClick={handleModifyPlan}
          >
            Upgrade / Modify Limits
          </button>
        </div>

        {/* Card 2: Daily Allowance & Credits */}
        <div className="subscription-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Daily Allowance
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Today
            </span>
          </div>

          <div>
            <div className="subscription-plan-title">
              {callsUsedToday} of {dailyLimit} calls used
            </div>

            <div className="allowance-bar-track" style={{ height: '8px', marginTop: '1rem', marginBottom: '1rem' }}>
              <div
                className="allowance-bar-fill"
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              />
            </div>
          </div>

          <div className="subscription-plan-meta">
            <div><strong>Remaining today:</strong> {remaining} {remaining === 1 ? 'call' : 'calls'}</div>
            <div><strong>Inventory credits:</strong> {inventoryCredits} reserved</div>
            <div><strong>Operator status:</strong> Dispatch ready</div>
          </div>
        </div>

        {/* Card 3: Registered Telephony Phone */}
        <div className="subscription-card" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Registered Voice Line
            </span>
            <span className="badge-status badge-scheduled">Verified</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Subscriber: <strong>{user?.name || 'Sarah Connor'}</strong>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {user?.phone || '+1 (555) 019-2834'}
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', maxWidth: '420px', lineHeight: 1.5 }}>
              * Operator calls are dispatched directly to this voice line. No smartphone app or active internet connection is required for call reception.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
