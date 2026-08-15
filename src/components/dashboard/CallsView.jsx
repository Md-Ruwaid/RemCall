import React from 'react';
import TodayTimeline from './TodayTimeline';
import UpcomingCalls from './UpcomingCalls';
import CallTicket from './CallTicket';

/**
 * CallsView — Dedicated Active & Scheduled Calls View
 * 
 * Provides:
 *   - Chronological Today's Timeline
 *   - Upcoming Scheduled Call Tickets with cancellation confirmation
 *   - Quick Schedule CTA
 */
export default function CallsView({
  todayCalls,
  upcomingCalls,
  nextCall,
  onOpenSchedule
}) {
  const hasCalls = (todayCalls && todayCalls.length > 0) || (upcomingCalls && upcomingCalls.length > 0);

  return (
    <div className="dashboard-subview-container view-fade-enter">
      {/* Subview Header */}
      <div className="subview-header">
        <div>
          <div className="subview-label font-mono">[ ACTIVE CALL QUEUE ]</div>
          <h1 className="subview-title font-display">CALL SCHEDULE</h1>
        </div>

        <button
          type="button"
          className="subview-action-btn font-display"
          onClick={onOpenSchedule}
        >
          <span>+ SCHEDULE CALL</span>
        </button>
      </div>

      {!hasCalls ? (
        <div className="subview-empty-card">
          <div className="subview-empty-icon">☎</div>
          <h3 className="subview-empty-title font-display">NO ACTIVE CALLS SCHEDULED</h3>
          <p className="subview-empty-text">
            Your call schedule is clear. Schedule your next reminder call with a live human operator.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenSchedule}
            style={{ marginTop: '1rem' }}
          >
            + SCHEDULE A CALL
          </button>
        </div>
      ) : (
        <div className="calls-view-content">
          {/* Section 1: Chronological Today's Timeline */}
          <div className="calls-timeline-section">
            <TodayTimeline todayCalls={todayCalls} nextCallId={nextCall?.id} />
          </div>

          {/* Section 2: Upcoming Scheduled Calls */}
          {upcomingCalls && upcomingCalls.length > 0 && (
            <div className="calls-upcoming-section">
              <UpcomingCalls calls={upcomingCalls} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
