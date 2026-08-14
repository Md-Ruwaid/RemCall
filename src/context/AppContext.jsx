import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation View: 'home' | 'about' | 'how-it-works' | 'dashboard'
  const [activeView, setActiveView] = useState('home');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('auth'); // 'auth' | 'subscribe'

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Current User State (Subscriber record)
  const [user, setUser] = useState({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    phone: '+1 (555) 019-2834',
    subscriptionActive: true,
    dailyCallLimit: 6,
    callsUsedToday: 2,
    planName: 'Pro Protocol',
    subscriptionEnd: getUpcomingSundayISO(),
    inventoryCredits: 1
  });

  // Reminders List
  const [reminders, setReminders] = useState([
    {
      id: 'rem-1',
      title: 'Q3 FINANCIAL REVIEW PREPARATION',
      time: 'TODAY, 4:00 PM',
      status: 'SCHEDULED', // 'SCHEDULED' | 'CALLED' | 'MISSED'
      notes: 'Operator will verify slide deck readiness before executive meeting.'
    },
    {
      id: 'rem-2',
      title: 'CLIENT CONTRACT SIGNOFF FOLLOW-UP',
      time: 'TODAY, 11:30 AM',
      status: 'CALLED',
      notes: 'Call completed successfully by Operator 04. Verified doc signed.'
    },
    {
      id: 'rem-3',
      title: 'WEEKLY METRICS & ACCOUNTABILITY CHECK-IN',
      time: 'YESTERDAY, 5:00 PM',
      status: 'MISSED',
      notes: 'Subscriber line busy at scheduled 5:00 PM call slot.'
    }
  ]);

  // Pricing Rule Calculation: ₹149 + ₹60 × (calls - 1)
  const calculatePrice = (callsPerDay) => {
    const clamped = Math.max(1, Math.min(6, callsPerDay));
    return 149 + 60 * (clamped - 1);
  };

  // Add Reminder
  const addReminder = (title, time, notes = '') => {
    const newRem = {
      id: `rem-${Date.now()}`,
      title: title.toUpperCase(),
      time: time.toUpperCase(),
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

  // Login handler
  const loginUser = (email, phone) => {
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      phone: phone || prev.phone
    }));
    setIsAuthenticated(true);
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
        user,
        setUser,
        reminders,
        addReminder,
        deleteReminder,
        updateReminderStatus,
        calculatePrice,
        activateSubscription,
        loginUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

// Helper date utility
function getUpcomingSundayISO() {
  const d = new Date();
  const day = d.getDay();
  const daysUntilSunday = (7 - day) % 7;
  const sunday = new Date(d);
  sunday.setDate(d.getDate() + daysUntilSunday);
  sunday.setHours(23, 59, 59, 999);
  return sunday.toISOString();
}
