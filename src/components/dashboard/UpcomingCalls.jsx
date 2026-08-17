import React from 'react';
import CallTicket from './CallTicket';

export default function UpcomingCalls({ calls }) {
  if (!calls || calls.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 className="section-subtitle">Upcoming Calls</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {calls.map(call => (
          <CallTicket key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
}
