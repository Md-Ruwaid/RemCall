/**
 * RemCall Dashboard — Date & Time Helpers
 * 
 * Centralized date utilities for dashboard display.
 * All presentation formatting lives here — components never calculate dates directly.
 */

/**
 * Get relative time string from a date.
 * Returns "In 42 min", "In 2 hours", "3 hours ago", etc.
 */
export function getRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target - now;
  const absDiffMs = Math.abs(diffMs);
  const isFutureDate = diffMs > 0;

  const minutes = Math.floor(absDiffMs / (1000 * 60));
  const hours = Math.floor(absDiffMs / (1000 * 60 * 60));
  const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return isFutureDate ? 'NOW' : 'JUST NOW';
  if (minutes < 60) {
    const label = minutes === 1 ? '1 MIN' : `${minutes} MIN`;
    return isFutureDate ? `IN ${label}` : `${label} AGO`;
  }
  if (hours < 24) {
    const label = hours === 1 ? '1 HOUR' : `${hours} HOURS`;
    return isFutureDate ? `IN ${label}` : `${label} AGO`;
  }
  const label = days === 1 ? '1 DAY' : `${days} DAYS`;
  return isFutureDate ? `IN ${label}` : `${label} AGO`;
}

/**
 * Format a date to display time: "08:00 PM", "02:30 AM"
 */
export function formatCallTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).toUpperCase();
}

/**
 * Format a date for display: "Thursday", "Tomorrow", "Aug 18"
 */
export function formatCallDate(date) {
  const d = new Date(date);
  const now = new Date();

  if (isToday(d)) return 'TODAY';
  if (isTomorrow(d)) return 'TOMORROW';
  if (isYesterday(d)) return 'YESTERDAY';

  // Within this week — show day name
  const diffDays = Math.abs(Math.floor((d - now) / (1000 * 60 * 60 * 24)));
  if (diffDays <= 6) {
    return d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  }

  // Further out — show month + day
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

/**
 * Get a combined day label for Call Ticket display.
 * "TODAY · IN 42 MIN", "TOMORROW · 08:00 PM", "THURSDAY"
 */
export function getDayLabel(date) {
  const d = new Date(date);
  const dateLabel = formatCallDate(d);
  const relative = getRelativeTime(d);

  if (isToday(d)) {
    return `${dateLabel} · ${relative}`;
  }

  return `${dateLabel} · ${formatCallTime(d)}`;
}

/**
 * Check if a date is today.
 */
export function isToday(date) {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Check if a date is tomorrow.
 */
export function isTomorrow(date) {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    d.getFullYear() === tomorrow.getFullYear() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getDate() === tomorrow.getDate()
  );
}

/**
 * Check if a date is yesterday.
 */
export function isYesterday(date) {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  );
}

/**
 * Check if a date is in the future.
 */
export function isFuture(date) {
  return new Date(date) > new Date();
}

/**
 * Check if a date is in the past.
 */
export function isPast(date) {
  return new Date(date) < new Date();
}

/**
 * Get the greeting based on time of day.
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Format subscription end date for display.
 * "ENDS SUNDAY", "ENDS AUG 18"
 */
export function formatSubscriptionEnd(date) {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((d - now) / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return `ENDS ${d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}`;
  }
  return `ENDS ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}`;
}

/**
 * Get hour from a date (for timeline positioning).
 */
export function getHour(date) {
  return new Date(date).getHours();
}

/**
 * Sort reminders by callTime, earliest first.
 */
export function sortByCallTime(reminders, ascending = true) {
  return [...reminders].sort((a, b) => {
    const diff = new Date(a.callTime) - new Date(b.callTime);
    return ascending ? diff : -diff;
  });
}
