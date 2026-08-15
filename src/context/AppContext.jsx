import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation View: 'home' | 'about' | 'how-it-works' | 'dashboard'
  const [activeView, setActiveView] = useState('home');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('auth'); // 'auth' | 'subscribe'

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Tutorial State — persisted to localStorage
  const [hasSeenTutorial, setHasSeenTutorial] = useState(() => {
    try {
      return localStorage.getItem('ringly_tutorial_complete') === 'true';
    } catch {
      return false;
    }
  });

  const completeTutorial = () => {
    setHasSeenTutorial(true);
    try {
      localStorage.setItem('ringly_tutorial_complete', 'true');
    } catch {
      // localStorage not available, state still updates
    }
  };

  const resetTutorial = () => {
    setHasSeenTutorial(false);
    try {
      localStorage.removeItem('ringly_tutorial_complete');
    } catch {
      // no-op
    }
  };

  // Current User State (Subscriber record)
  const [user, setUser] = useState({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    phone: '+1 (555) 019-2834',
    subscriptionActive: true,
    dailyCallLimit: 3,
    callsUsedToday: 1,
    planName: 'Standard Protocol',
    subscriptionEnd: getUpcomingSundayISO(),
    inventoryCredits: 1
  });

  // Reminders List — enriched with proper Date-based callTime fields
  const [reminders, setReminders] = useState(() => generateMockReminders());

  // Pricing Rule Calculation: ₹149 + ₹60 × (calls - 1)
  const calculatePrice = (callsPerDay) => {
    const clamped = Math.max(1, Math.min(6, callsPerDay));
    return 149 + 60 * (clamped - 1);
  };

  // Add Reminder
  const addReminder = (title, callTime, notes = '') => {
    const newRem = {
      id: `rem-${Date.now()}`,
      title: title.toUpperCase(),
      callTime: callTime instanceof Date ? callTime.toISOString() : callTime,
      status: 'SCHEDULED',
      notes
    };
    setReminders(prev => [newRem, ...prev]);
  };

  // Delete / Cancel Reminder
  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  // Update Reminder Status
  const updateReminderStatus = (id, newStatus) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  // Activate Subscription
  const activateSubscription = (dailyLimit, phone, name) => {
    setUser((prev) => ({
      ...prev,
      subscriptionActive: true,
      dailyCallLimit: dailyLimit,
      phone: phone || prev.phone,
      name: name || prev.name,
      subscriptionEnd: getUpcomingSundayISO()
    }));
    setIsAuthenticated(true);
    setIsSubscribeModalOpen(false);
  };

  // Login handler — supports both (email, phone) and object payload from Google Auth
  const loginUser = (emailOrUser, phone) => {
    if (typeof emailOrUser === 'object' && emailOrUser !== null) {
      setUser(prev => ({
        ...prev,
        ...emailOrUser,
        subscriptionActive: emailOrUser.subscriptionActive ?? prev.subscriptionActive ?? true
      }));
    } else {
      setUser(prev => ({
        ...prev,
        email: emailOrUser || prev.email,
        phone: phone || prev.phone
      }));
    }
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  // Logout handler
  const logoutUser = () => {
    setIsAuthenticated(false);
    setActiveView('home');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        isSubscribeModalOpen,
        setIsSubscribeModalOpen,
        authModalMode,
        setAuthModalMode,
        isAuthenticated,
        setIsAuthenticated,
        hasSeenTutorial,
        completeTutorial,
        resetTutorial,
        user,
        setUser,
        reminders,
        addReminder,
        deleteReminder,
        updateReminderStatus,
        calculatePrice,
        activateSubscription,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

// ─── Helper Utilities ───

function getUpcomingSundayISO() {
  const d = new Date();
  const day = d.getDay();
  const daysUntilSunday = (7 - day) % 7;
  const sunday = new Date(d);
  sunday.setDate(d.getDate() + daysUntilSunday);
  sunday.setHours(23, 59, 59, 999);
  return sunday.toISOString();
}

/**
 * Generate realistic mock reminders with proper Date-based callTime fields.
 * Covers all four statuses: Scheduled, Called, Missed, In Inventory.
 */
function generateMockReminders() {
  const now = new Date();

  // Helper: create a date relative to now
  const offsetDate = (hours, minutes = 0) => {
    const d = new Date(now);
    d.setHours(now.getHours() + hours, now.getMinutes() + minutes, 0, 0);
    return d.toISOString();
  };

  // Helper: create a date at a specific time today
  const todayAt = (hour, minute = 0) => {
    const d = new Date(now);
    d.setHours(hour, minute, 0, 0);
    return d.toISOString();
  };

  // Helper: create a date at a specific time tomorrow
  const tomorrowAt = (hour, minute = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    d.setHours(hour, minute, 0, 0);
    return d.toISOString();
  };

  // Helper: create a date yesterday
  const yesterdayAt = (hour, minute = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    d.setHours(hour, minute, 0, 0);
    return d.toISOString();
  };

  return [
    // ── Upcoming Scheduled (future) ──
    {
      id: 'rem-001',
      title: 'Q3 FINANCIAL REVIEW PREPARATION',
      callTime: offsetDate(1, 15),
      status: 'SCHEDULED',
      notes: 'Operator will verify slide deck readiness before executive meeting.'
    },
    {
      id: 'rem-002',
      title: 'CLIENT CONTRACT SIGNOFF FOLLOW-UP',
      callTime: offsetDate(3, 30),
      status: 'SCHEDULED',
      notes: 'Confirm that the legal team has reviewed section 4.2 amendments.'
    },
    {
      id: 'rem-003',
      title: 'WEEKLY TEAM STANDUP REMINDER',
      callTime: tomorrowAt(9, 0),
      status: 'SCHEDULED',
      notes: 'Prepare sprint velocity metrics before the call.'
    },
    {
      id: 'rem-004',
      title: 'DENTIST APPOINTMENT CHECK-IN',
      callTime: tomorrowAt(14, 30),
      status: 'SCHEDULED',
      notes: ''
    },

    // ── Past — Called (completed successfully) ──
    {
      id: 'rem-005',
      title: 'MORNING WORKOUT ACCOUNTABILITY',
      callTime: todayAt(7, 0),
      status: 'CALLED',
      notes: 'Call completed. Subscriber confirmed 30-min session done.'
    },

    // ── Past — Missed ──
    {
      id: 'rem-006',
      title: 'MEDICATION REMINDER',
      callTime: yesterdayAt(20, 0),
      status: 'MISSED',
      notes: 'Subscriber line busy. Retried once, no pickup.'
    },

    // ── In Inventory ──
    {
      id: 'rem-007',
      title: 'QUARTERLY TAX FILING PREP',
      callTime: yesterdayAt(15, 0),
      status: 'IN INVENTORY',
      notes: 'Moved to inventory — subscriber requested reschedule.'
    }
  ];
}
