import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useDashboardData } from '../../hooks/useDashboardData';
import DashboardNav from './DashboardNav';
import OverviewView from './OverviewView';
import CallsView from './CallsView';
import HistoryView from './HistoryView';
import SubscriptionView from './SubscriptionView';
import ScheduleCallModal from './ScheduleCallModal';
import './Dashboard.css';

export default function DashboardPage() {
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

  const [activeTab, setActiveTab] = useState('overview');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <div className="dashboard-app-root view-fade-enter">
      {/* 1. Clean Navigation Bar */}
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
    </div>
  );
}
