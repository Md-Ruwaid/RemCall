import React from 'react';
import TodayTimeline from './TodayTimeline';
import UpcomingCalls from './UpcomingCalls';

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
          <div className="subview-label">Active Schedule</div>
          <h1 className="subview-title">Calls</h1>
        </div>

        <button
          type="button"
          className="subview-action-btn"
          onClick={onOpenSchedule}
        >
          <span>+ Schedule call</span>
        </button>
      </div>

      {!hasCalls ? (
        <div className="subview-empty-card">
          <div className="subview-empty-icon">☎</div>
          <h3 className="subview-empty-title">No calls currently scheduled</h3>
          <p className="subview-empty-text">
            Your schedule is clear. Schedule your next reminder call with a live human operator.
          </p>
          <button
            type="button"
            className="btn-primary btn-coral"
            onClick={onOpenSchedule}
            style={{ marginTop: '0.75rem' }}
          >
            + Schedule a call
          </button>
        </div>
      ) : (
        <div className="calls-view-content">
          <TodayTimeline todayCalls={todayCalls} nextCallId={nextCall?.id} />
          {upcomingCalls && upcomingCalls.length > 0 && (
            <UpcomingCalls calls={upcomingCalls} />
          )}
        </div>
      )}
    </div>
  );
}
