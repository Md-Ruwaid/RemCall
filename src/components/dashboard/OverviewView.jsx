import React from 'react';
import DashboardHeader from './DashboardHeader';
import NextCallHero from './NextCallHero';
import WeeklyAllowance from './WeeklyAllowance';
import SubscriptionSummary from './SubscriptionSummary';

export default function OverviewView({
  user,
  nextCall,
  allowance,
  subscription,
  scheduledCount,
  onNavigateTab,
  onOpenSchedule
}) {
  return (
    <div className="dashboard-overview-container view-fade-enter">
      {/* 1. Header Greeting */}
      <DashboardHeader user={user} nextCall={nextCall} />

      {/* 2. Primary Hero: Next Call */}
      <NextCallHero
        call={nextCall}
        onViewCall={() => onNavigateTab('calls')}
      />

      {/* 3. Secondary Row: Allowance + Active Plan */}
      <div className="dashboard-stats-row">
        <WeeklyAllowance
          allowance={allowance}
          scheduledCount={scheduledCount}
          onViewTimeline={() => onNavigateTab('calls')}
        />
        <SubscriptionSummary
          subscription={subscription}
          onManageClick={() => onNavigateTab('subscription')}
        />
      </div>

      {/* 4. Primary Action: Schedule a Call */}
      <div className="dashboard-overview-cta-row">
        <button
          type="button"
          className="dashboard-primary-schedule-btn"
          onClick={onOpenSchedule}
        >
          <span>+ Schedule a call</span>
        </button>
      </div>
    </div>
  );
}
