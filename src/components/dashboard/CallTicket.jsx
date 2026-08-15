import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCallTime, formatCallDate, getRelativeTime, isFuture } from '../../utils/dateHelpers';

/**
 * CallTicket — Signature dashboard object for a single reminder.
 * 
 * Shows time, date, title, notes (truncated), status badge, call ID.
 * Delete action only for Scheduled calls, with confirmation flow.
 */
export default function CallTicket({ call }) {
  const { deleteReminder } = useApp();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!call) return null;

  const statusKey = call.status?.toUpperCase();
  const canDelete = statusKey === 'SCHEDULED';
  const future = call.callTime && isFuture(call.callTime);

  // Status badge config
  let badgeClass = 'badge-status badge-scheduled';
  let statusIcon = '●';
  if (statusKey === 'CALLED') { badgeClass = 'badge-status badge-called'; statusIcon = '✓'; }
  else if (statusKey === 'MISSED') { badgeClass = 'badge-status badge-missed'; statusIcon = '×'; }
  else if (statusKey === 'IN INVENTORY') { badgeClass = 'badge-status badge-inventory'; statusIcon = '↻'; }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    // Simulate async delete (mock — no real API yet)
    setTimeout(() => {
      deleteReminder(call.id);
      setIsDeleting(false);
      setConfirmDelete(false);
    }, 300);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div className="call-ticket">
      <div className="call-ticket-content">
        <div className="call-ticket-header">
          <span className={badgeClass}>
            {statusIcon} {call.status}
          </span>
          <span className="call-ticket-time">
            {call.callTime ? `${formatCallTime(call.callTime)} · ${formatCallDate(call.callTime)}` : ''}
            {future && call.callTime && (
              <span style={{ color: '#FD6B00', marginLeft: '0.5rem' }}>
                {getRelativeTime(call.callTime)}
              </span>
            )}
          </span>
        </div>

        <div className="call-ticket-title">{call.title}</div>

        {call.notes && (
          <div className="call-ticket-notes">{call.notes}</div>
        )}

        {call.id && (
          <div className="call-ticket-id">
            CALL / {call.id.replace('rem-', '').padStart(5, '0')}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="call-ticket-actions">
        {canDelete && !confirmDelete && (
          <button
            className="call-ticket-btn call-ticket-btn--danger"
            onClick={handleDelete}
            aria-label={`Cancel call: ${call.title}`}
          >
            CANCEL
          </button>
        )}

        {confirmDelete && (
          <div className="call-ticket-confirm">
            <span>CONFIRM?</span>
            <button
              className="call-ticket-btn call-ticket-btn--danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'REMOVING…' : 'YES'}
            </button>
            <button
              className="call-ticket-btn"
              onClick={handleCancelDelete}
            >
              NO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
