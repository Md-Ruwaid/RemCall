import React from 'react';
import CallTicket from './CallTicket';

/**
 * UpcomingCalls — Future scheduled calls rendered as CallTickets.
 * 
 * Handles empty, one, and many calls.
 * Visually separated from Today section.
 */
export default function UpcomingCalls({ calls }) {
  if (!calls || calls.length === 0) {
    return null; // Don't render section if no upcoming calls beyond the next one
  }

  return (
    <div className="dashboard-slide-up" id="dashboard-upcoming">
      <div className="dashboard-section-label">[ UPCOMING ]</div>
      <div className="upcoming-calls-list">
        {calls.map(call => (
          <CallTicket key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
}
