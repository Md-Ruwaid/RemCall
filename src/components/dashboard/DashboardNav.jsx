import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function DashboardNav({
  activeTab,
  onTabChange,
  onOpenSchedule,
  scheduledCount,
  historyCount
}) {
  const { setActiveView, logoutUser, user } = useApp();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'calls', label: 'Calls', badge: scheduledCount > 0 ? scheduledCount : null },
    { id: 'history', label: 'History', badge: historyCount > 0 ? historyCount : null },
    { id: 'subscription', label: 'Subscription' },
  ];

  return (
    <header className="dashboard-app-nav">
      <div className="dashboard-nav-inner">
        {/* Left: Brand Identity */}
        <div className="dashboard-nav-brand" onClick={() => onTabChange('overview')}>
          <div style={{
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-coral)'
          }} />
          <span className="dashboard-nav-logo">RINGLY</span>
        </div>

        {/* Center: Tabs */}
        <nav className="dashboard-nav-tabs" aria-label="Dashboard views">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`dashboard-tab-btn ${isActive ? 'dashboard-tab-btn--active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="dashboard-tab-badge">{tab.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="dashboard-nav-actions">
          <button
            type="button"
            className="dashboard-nav-schedule-btn"
            onClick={onOpenSchedule}
            aria-label="Schedule a call"
          >
            <span>+ Schedule call</span>
          </button>

          {/* User Profile / Menu */}
          <div className="dashboard-user-menu">
            <button
              type="button"
              className="dashboard-user-trigger"
              onClick={() => setUserDropdownOpen(prev => !prev)}
            >
              <span className="dashboard-user-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </span>
              <span>{user?.name?.split(' ')[0] || 'Account'}</span>
            </button>

            {userDropdownOpen && (
              <div className="dashboard-user-dropdown view-fade-enter">
                <div className="dashboard-user-dropdown-header">
                  <div className="dashboard-user-dropdown-name">{user?.name || 'Subscriber'}</div>
                  <div className="dashboard-user-dropdown-email">{user?.email || 'subscriber@example.com'}</div>
                </div>
                <button
                  type="button"
                  className="dashboard-user-dropdown-item"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onTabChange('subscription');
                  }}
                >
                  Subscription Plan
                </button>
                <button
                  type="button"
                  className="dashboard-user-dropdown-item"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setActiveView('home');
                  }}
                >
                  Return to Home
                </button>
                <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '0.25rem 0' }} />
                <button
                  type="button"
                  className="dashboard-user-dropdown-item"
                  style={{ color: 'var(--accent-coral)' }}
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logoutUser();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
