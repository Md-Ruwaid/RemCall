import React from 'react';
import DashboardHeader from './DashboardHeader';
import NextCallHero from './NextCallHero';
import WeeklyAllowance from './WeeklyAllowance';
import SubscriptionSummary from './SubscriptionSummary';

/**
 * OverviewView — Dashboard V1.1 Refined Overview
 * 
 * Fits naturally into the initial viewport on normal desktop screens.
 * Answers the 4 core questions in under 2 seconds:
 *   1. What is my next call? (NextCallHero)
 *   2. What calls do I have today? (Today allowance & schedule card)
 *   3. How much of my allowance have I used? (Allowance card)
 *   4. What can I do next? (+ SCHEDULE A CALL primary action)
 */
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
      {/* 1. Header with Greeting and Real-time Awareness */}
      <DashboardHeader user={user} nextCall={nextCall} />

      {/* 2. Primary Hero: Next Call */}
      <NextCallHero
        call={nextCall}
        onViewCall={() => onNavigateTab('calls')}
      />

      {/* 3. Secondary Row: Today / Allowance + Active Plan */}
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

      {/* 4. Primary CTA: Schedule a Call */}
      <div className="dashboard-overview-cta-row">
        <button
          type="button"
          className="dashboard-primary-schedule-btn font-display"
          onClick={onOpenSchedule}
        >
          <span className="btn-plus-icon">+</span>
          SCHEDULE A CALL
        </button>
      </div>
    </div>
  );
}
