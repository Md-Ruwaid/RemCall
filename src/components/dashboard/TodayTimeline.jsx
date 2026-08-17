import React from 'react';
import { formatCallTime } from '../../utils/dateHelpers';

export default function TodayTimeline({ todayCalls, nextCallId }) {
  if (!todayCalls || todayCalls.length === 0) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.92rem'
      }}>
        No reminder calls scheduled for today.
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      <h3 className="section-subtitle">Today's Schedule</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {todayCalls.map((call, index) => {
          const isNext = call.id === nextCallId;
          const timeVal = call.callTime || call.time;

          return (
            <div
              key={call.id || index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                paddingBottom: index < todayCalls.length - 1 ? '1rem' : 0,
                borderBottom: index < todayCalls.length - 1 ? '1px solid var(--border-subtle)' : 'none'
              }}
            >
              <div style={{
                minWidth: '75px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: isNext ? 'var(--accent-coral)' : 'var(--text-primary)'
              }}>
                {formatCallTime(timeVal)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: isNext ? 700 : 600,
                  color: 'var(--text-primary)'
                }}>
                  {call.title}
                </div>

                {call.notes && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {call.notes}
                  </div>
                )}
              </div>

              <div>
                <span className={`badge-status badge-${call.status?.toLowerCase() || 'scheduled'}`}>
                  {call.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
