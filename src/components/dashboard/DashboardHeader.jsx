import React from 'react';
import { getGreeting, getRelativeTime, formatCallTime } from '../../utils/dateHelpers';

/**
 * DashboardHeader — Greeting + Awareness Indicator
 * 
 * Shows a time-of-day greeting for the subscriber
 * and a subtle awareness indicator showing proximity to next call.
 */
export default function DashboardHeader({ user, nextCall }) {
  const greeting = getGreeting();
  const firstName = user?.name?.split(' ')[0] || 'Subscriber';

  // Determine awareness state
  let awarenessLabel = 'STANDING BY';
  let awarenessTime = '';
  let dotClass = 'awareness-dot';

  if (nextCall?.callTime) {
    const now = new Date();
    const callDate = new Date(nextCall.callTime);
    const diffMin = Math.floor((callDate - now) / (1000 * 60));

    if (diffMin <= 0) {
      awarenessLabel = 'ACTIVE SIGNAL';
      awarenessTime = 'NOW';
      dotClass = 'awareness-dot awareness-dot--imminent';
    } else if (diffMin <= 15) {
      awarenessLabel = 'ACTIVE SIGNAL';
      awarenessTime = getRelativeTime(nextCall.callTime);
      dotClass = 'awareness-dot awareness-dot--imminent';
    } else if (diffMin <= 60) {
      awarenessLabel = 'NEXT EVENT';
      awarenessTime = getRelativeTime(nextCall.callTime);
      dotClass = 'awareness-dot awareness-dot--active';
    } else {
      awarenessLabel = 'AWARE';
      awarenessTime = formatCallTime(nextCall.callTime);
      dotClass = 'awareness-dot';
    }
  }

  return (
    <div className="dashboard-header">
      <div>
        <h1 className="dashboard-greeting">
          {greeting}, {firstName}
        </h1>
        <div className="dashboard-greeting-sub font-mono">
          [ TELEPHONY CONTROL CONSOLE ]
        </div>
      </div>

      <div className="awareness-indicator" aria-label={`Awareness: ${awarenessLabel} ${awarenessTime}`}>
        <span className={dotClass} aria-hidden="true" />
        <span>{awarenessLabel}</span>
        {awarenessTime && (
          <span style={{ color: 'var(--accent-cream)', marginLeft: '0.25rem' }}>
            {awarenessTime}
          </span>
        )}
      </div>
    </div>
  );
}
