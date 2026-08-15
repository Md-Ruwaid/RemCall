import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * DashboardNav — Dedicated Authenticated Product Navigation
 * 
 * Separates public marketing navigation from the application navigation.
 * Features:
 *   - Stable RINGLY logo + subscriber console badge (never overlaps content)
 *   - Subview tabs: OVERVIEW | CALLS | HISTORY | SUBSCRIPTION
 *   - Quick "+ SCHEDULE" button
 *   - "← EXIT TO SITE" navigation to return to the public marketing site
 *   - Mobile tab switcher / drawer
 */
export default function DashboardNav({
  activeTab,
  onTabChange,
  onOpenSchedule,
  onOpenTutorial,
  scheduledCount,
  historyCount
}) {
  const { setActiveView, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'calls', label: 'CALLS', badge: scheduledCount > 0 ? scheduledCount : null },
    { id: 'history', label: 'HISTORY', badge: historyCount > 0 ? historyCount : null },
    { id: 'subscription', label: 'SUBSCRIPTION' },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="dashboard-app-nav">
      <div className="dashboard-nav-inner">
        {/* Left: Brand Identity */}
        <div className="dashboard-nav-brand" onClick={() => handleTabClick('overview')}>
          <span className="dashboard-nav-logo">RINGLY</span>
          <span className="dashboard-nav-badge font-mono">[ CONSOLE ]</span>
        </div>

        {/* Center: Product Subview Tabs (Desktop) */}
        <nav className="dashboard-nav-tabs" aria-label="Dashboard views">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`dashboard-tab-btn ${isActive ? 'dashboard-tab-btn--active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {isActive && <span className="nav-active-dot" />}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="dashboard-tab-badge font-mono">{tab.badge}</span>
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
            <span>+ SCHEDULE</span>
          </button>

          {onOpenTutorial && (
            <button
              type="button"
              className="dashboard-nav-exit-btn font-mono"
              onClick={onOpenTutorial}
              aria-label="Open onboarding tutorial"
              title="Re-open Onboarding Tutorial"
              style={{ borderColor: 'var(--accent-cream)', color: 'var(--accent-cream)' }}
            >
              ? TUTORIAL
            </button>
          )}

          <button
            type="button"
            className="dashboard-nav-exit-btn font-mono"
            onClick={() => {
              if (logoutUser) {
                logoutUser();
              } else {
                setActiveView('home');
              }
            }}
            aria-label="Sign out"
            title="Sign out & Return to Public Site"
          >
            SIGN OUT
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="dashboard-nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Tabs Drawer */}
      {mobileMenuOpen && (
        <div className="dashboard-nav-mobile-drawer view-fade-enter">
          <div className="dashboard-nav-mobile-list">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`dashboard-mobile-tab-btn ${isActive ? 'dashboard-mobile-tab-btn--active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="dashboard-tab-badge font-mono">{tab.badge}</span>
                  )}
                </button>
              );
            })}
            <button
              type="button"
              className="dashboard-mobile-tab-btn font-mono"
              onClick={() => {
                if (logoutUser) {
                  logoutUser();
                } else {
                  setActiveView('home');
                }
              }}
            >
              SIGN OUT / EXIT TO SITE
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
