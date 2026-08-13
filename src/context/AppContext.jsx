import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation View: 'home' (Unified Service Experience) | 'dashboard' | 'admin'
  const [activeView, setActiveView] = useState('home');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // Current User State (Demo subscriber)
  const [user, setUser] = useState({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    phone: '+1 (555) 019-2834',
    subscriptionActive: true,
    dailyCallLimit: 2,
    subscriptionEnd: getUpcomingSundayISO(),
    role: 'user', // 'user' or 'admin'
    inventoryCredits: 1
  });

  // Reminders List State
  const [reminders, setReminders] = useState([
    {
      id: 'rem-101',
      userId: 'usr-1',
      userName: 'Sarah Connor',
      phone: '+1 (555) 019-2834',
      title: 'Take Morning Heart Medication (20mg)',
      callTime: getTodayAtHourISO(8, 30),
      notes: 'Confirm she takes the blue tablet with full glass of water.',
      status: 'Scheduled'
    },
    {
      id: 'rem-102',
      userId: 'usr-1',
      userName: 'Sarah Connor',
      phone: '+1 (555) 019-2834',
      title: 'Prepare Board Pitch Deck & Email to Lead Investor',
      callTime: getTodayAtHourISO(14, 0),
      notes: 'Double check financial slide 8 before calling.',
      status: 'Scheduled'
    },
    {
      id: 'rem-103',
      userId: 'usr-2',
      userName: 'Marcus Thorne',
      phone: '+1 (555) 441-9981',
      title: 'Pick up Prescription from CVS Pharmacy',
      callTime: getTodayAtHourISO(18, 15),
      notes: 'Refill RX #881923.',
      status: 'Called'
    },
    {
      id: 'rem-104',
      userId: 'usr-3',
      userName: 'Elena Rostova',
      phone: '+1 (555) 782-3100',
      title: 'Daily Evening Posture Standup & Stretching',
      callTime: getTodayAtHourISO(20, 0),
      notes: 'Remind her of 15 min timer routine.',
      status: 'In Inventory'
    }
  ]);

  // Pricing Rule Calculation: ₹149 + ₹60 × (calls - 1)
  const calculatePrice = (callsPerDay) => {
    const clamped = Math.max(1, Math.min(6, callsPerDay));
    return 149 + 60 * (clamped - 1);
  };

  // Add Reminder
  const addReminder = (newRem) => {
    const created = {
      id: `rem-${Date.now()}`,
      userId: 'usr-1',
      userName: user.name,
      phone: user.phone || '+1 (555) 019-2834',
      title: newRem.title,
      callTime: newRem.callTime,
      notes: newRem.notes || '',
      status: 'Scheduled'
    };
    setReminders((prev) => [created, ...prev]);
  };

  // Update Reminder Status (Called, Missed, In Inventory)
  const updateReminderStatus = (id, newStatus) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Activate Subscription
  const activateSubscription = (dailyLimit, phone) => {
    setUser((prev) => ({
      ...prev,
      subscriptionActive: true,
      dailyCallLimit: dailyLimit,
      phone: phone || prev.phone,
      subscriptionEnd: getUpcomingSundayISO()
    }));
    setIsSubscribeModalOpen(false);
  };

  // Switch Admin / User Role for Testing Console
  const toggleRole = () => {
    setUser((prev) => ({
      ...prev,
      role: prev.role === 'admin' ? 'user' : 'admin'
    }));
  };

  // Delete Reminder (Only when status is Scheduled)
  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id || r.status !== 'Scheduled'));
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        isSubscribeModalOpen,
        setIsSubscribeModalOpen,
        user,
        setUser,
        reminders,
        calculatePrice,
        addReminder,
        deleteReminder,
        updateReminderStatus,
        activateSubscription,
        toggleRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

// Helper date utilities
function getUpcomingSundayISO() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() + (7 - day);
  const sunday = new Date(d.setDate(diff));
  sunday.setHours(23, 59, 59, 999);
  return sunday.toISOString();
}

function getTodayAtHourISO(hour, minute = 0) {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}
