import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCallTime, formatCallDate, getRelativeTime, isFuture } from '../../utils/dateHelpers';

export default function CallTicket({ call }) {
  const { deleteReminder } = useApp();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!call) return null;

  const statusKey = call.status?.toUpperCase();
  const canDelete = statusKey === 'SCHEDULED';
  const future = (call.callTime || call.time) && isFuture(call.callTime || call.time);

  let badgeClass = 'badge-status badge-scheduled';
  if (statusKey === 'CALLED') badgeClass = 'badge-status badge-called';
  else if (statusKey === 'MISSED') badgeClass = 'badge-status badge-missed';
  else if (statusKey === 'IN INVENTORY') badgeClass = 'badge-status badge-inventory';

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    setTimeout(() => {
      deleteReminder(call.id);
      setIsDeleting(false);
      setConfirmDelete(false);
    }, 300);
  };

  const timeVal = call.callTime || call.time;

  return (
    <div className="call-ticket-card">
      <div className="call-ticket-top">
        <span className={badgeClass}>
          {call.status}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {timeVal ? `${formatCallDate(timeVal)} · ${formatCallTime(timeVal)}` : ''}
          {future && timeVal && (
            <span style={{ color: 'var(--accent-coral)', marginLeft: '0.4rem', fontWeight: 500 }}>
              ({getRelativeTime(timeVal)})
            </span>
          )}
        </span>
      </div>

      <h3 className="call-ticket-title">{call.title}</h3>

      {call.notes && (
        <div className="call-ticket-notes">
          <strong>Note:</strong> {call.notes}
        </div>
      )}

      {canDelete && (
        <div className="call-ticket-actions">
          {!confirmDelete ? (
            <button
              type="button"
              className="btn-ghost"
              style={{ color: '#DC2626', fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}
              onClick={handleDelete}
            >
              Cancel call
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Confirm cancellation?</span>
              <button
                type="button"
                className="btn-ghost"
                style={{ color: '#DC2626', fontWeight: 600, padding: '0.2rem 0.4rem' }}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Cancelling…' : 'Yes'}
              </button>
              <button
                type="button"
                className="btn-ghost"
                style={{ padding: '0.2rem 0.4rem' }}
                onClick={() => setConfirmDelete(false)}
              >
                No
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
