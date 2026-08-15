import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useDashboardData } from '../../hooks/useDashboardData';
import DashboardNav from './DashboardNav';
import OverviewView from './OverviewView';
import CallsView from './CallsView';
import HistoryView from './HistoryView';
import SubscriptionView from './SubscriptionView';
import ScheduleCallModal from './ScheduleCallModal';
import DashboardTutorial from './DashboardTutorial';
import './Dashboard.css';

// Feature Flag: Tutorial disabled for V1.1 as requested (preserved for future release)
const TUTORIAL_ENABLED = false;

/**
 * DashboardPage — Authenticated Subscriber Dashboard V1.1
 * 
 * Re-architected into clear subviews:
 *   - OVERVIEW: High-impact single-viewport summary (Next Call, Today summary, Plan summary, Primary CTA)
 *   - CALLS: Chronological Today's Timeline + Upcoming Scheduled Call Tickets
 *   - HISTORY: Log archive of completed, missed, and inventory calls
 *   - SUBSCRIPTION: Managed telephony protocol, daily allowance, line settings
 */
export default function DashboardPage() {
  const { hasSeenTutorial, completeTutorial } = useApp();

  const {
    nextCall,
    todayCalls,
    upcomingCalls,
    recentHistory,
    scheduledCount,
    allowance,
    subscription,
    user,
  } = useDashboardData();

  // Active Subview Tab: 'overview' | 'calls' | 'history' | 'subscription'
  const [activeTab, setActiveTab] = useState('overview');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(TUTORIAL_ENABLED && !hasSeenTutorial);

  const handleTutorialComplete = () => {
    completeTutorial();
    setShowTutorial(false);
  };

  return (
    <div className="dashboard-app-root view-fade-enter">
      {/* 1. Dedicated Application Navigation Bar */}
      <DashboardNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSchedule={() => setIsScheduleModalOpen(true)}
        scheduledCount={scheduledCount}
        historyCount={recentHistory.length}
      />

      {/* 2. Main Subview Container */}
      <main className="dashboard-app-main">
        <div className="dashboard-app-container">
          {activeTab === 'overview' && (
            <OverviewView
              user={user}
              nextCall={nextCall}
              allowance={allowance}
              subscription={subscription}
              scheduledCount={scheduledCount}
              onNavigateTab={setActiveTab}
              onOpenSchedule={() => setIsScheduleModalOpen(true)}
            />
          )}

          {activeTab === 'calls' && (
            <CallsView
              todayCalls={todayCalls}
              upcomingCalls={upcomingCalls}
              nextCall={nextCall}
              onOpenSchedule={() => setIsScheduleModalOpen(true)}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView history={recentHistory} />
          )}

          {activeTab === 'subscription' && (
            <SubscriptionView
              user={user}
              subscription={subscription}
              allowance={allowance}
            />
          )}
        </div>
      </main>

      {/* 3. Schedule Call Modal */}
      <ScheduleCallModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      {/* 4. Onboarding Tutorial (Preserved for future use) */}
      {showTutorial && (
        <DashboardTutorial onComplete={handleTutorialComplete} />
      )}
    </div>
  );
}
