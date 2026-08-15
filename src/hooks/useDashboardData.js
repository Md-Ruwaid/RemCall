import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { isToday, isFuture, isPast, sortByCallTime } from '../utils/dateHelpers';

/**
 * RemCall Dashboard — Derived Data Hook
 * 
 * Single source of truth for all dashboard-computed values.
 * Components consume this hook instead of calculating business logic independently.
 * 
 * Provides:
 *   - nextCall: the next upcoming scheduled call
 *   - todayCalls: today's calls (all statuses)
 *   - upcomingCalls: future scheduled calls (excluding today)
 *   - recentHistory: past calls (Called, Missed, In Inventory)
 *   - scheduledCount: total scheduled calls
 *   - tick: re-renders every 60s for relative time freshness
 */
export function useDashboardData() {
  const { reminders, user } = useApp();

  // Centralized timing source — ticks every 60s to keep relative times fresh.
  // One interval for the whole dashboard, not one per component.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Derive all dashboard view models from raw reminders
  const derived = useMemo(() => {
    const now = new Date();

    // Separate by time + status
    const scheduled = reminders.filter(r =>
      r.status === 'SCHEDULED' || r.status === 'Scheduled'
    );

    const futureScheduled = scheduled
      .filter(r => r.callTime && isFuture(r.callTime))
      .sort((a, b) => new Date(a.callTime) - new Date(b.callTime));

    const todayAll = reminders
      .filter(r => r.callTime && isToday(r.callTime))
      .sort((a, b) => new Date(a.callTime) - new Date(b.callTime));

    // Next call = earliest future scheduled call
    const nextCall = futureScheduled.length > 0 ? futureScheduled[0] : null;

    // Upcoming = future scheduled calls excluding the next call, plus tomorrow+ calls
    const upcomingCalls = futureScheduled.slice(1);

    // Recent history = past/completed calls (Called, Missed, In Inventory)
    const history = reminders
      .filter(r => {
        const status = r.status?.toUpperCase();
        return (
          status === 'CALLED' ||
          status === 'MISSED' ||
          status === 'IN INVENTORY' ||
          (status === 'SCHEDULED' && r.callTime && isPast(r.callTime))
        );
      })
      .sort((a, b) => new Date(b.callTime) - new Date(a.callTime)) // most recent first
      .slice(0, 10); // cap at 10 for dashboard

    // Counts
    const scheduledCount = scheduled.length;
    const todayScheduledCount = todayAll.filter(r =>
      r.status === 'SCHEDULED' || r.status === 'Scheduled'
    ).length;

    return {
      nextCall,
      todayCalls: todayAll,
      upcomingCalls,
      recentHistory: history,
      scheduledCount,
      todayScheduledCount,
      hasAnyCalls: reminders.length > 0,
      hasUpcomingCalls: futureScheduled.length > 0,
    };
  }, [reminders, tick]);

  // Allowance data
  const allowance = useMemo(() => {
    const callsUsedToday = user.callsUsedToday || 0;
    const dailyLimit = user.dailyCallLimit || 1;
    const remaining = Math.max(0, dailyLimit - callsUsedToday);
    const usagePercent = Math.round((callsUsedToday / dailyLimit) * 100);

    return {
      callsUsedToday,
      dailyLimit,
      remaining,
      usagePercent,
    };
  }, [user, tick]);

  // Subscription data
  const subscription = useMemo(() => {
    return {
      isActive: user.subscriptionActive,
      planName: user.planName || 'Standard',
      callsPerDay: user.dailyCallLimit || 1,
      price: user.dailyCallLimit ? (149 + 60 * (user.dailyCallLimit - 1)) : 149,
      endDate: user.subscriptionEnd,
      inventoryCredits: user.inventoryCredits || 0,
    };
  }, [user]);

  return {
    ...derived,
    allowance,
    subscription,
    user,
    tick,
  };
}
