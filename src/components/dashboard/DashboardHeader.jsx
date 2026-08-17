import React from 'react';
import { getGreeting } from '../../utils/dateHelpers';

export default function DashboardHeader({ user, nextCall }) {
  const greeting = getGreeting();
  const firstName = user?.name?.split(' ')[0] || 'Subscriber';

  const todayStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="dashboard-header">
      <div>
        <h1 className="dashboard-greeting">
          {greeting}, {firstName}.
        </h1>
      </div>

      <div className="dashboard-date-indicator">
        {todayStr}
      </div>
    </div>
  );
}
