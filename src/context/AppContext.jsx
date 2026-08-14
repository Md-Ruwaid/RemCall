import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation View: 'home' | 'about' | 'how-it-works'
  const [activeView, setActiveView] = useState('home');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // Current User State (Subscriber record)
  const [user, setUser] = useState({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    phone: '+1 (555) 019-2834',
    subscriptionActive: true,
    dailyCallLimit: 2,
    subscriptionEnd: getUpcomingSundayISO(),
    inventoryCredits: 1
  });

  // Pricing Rule Calculation: ₹149 + ₹60 × (calls - 1)
  const calculatePrice = (callsPerDay) => {
    const clamped = Math.max(1, Math.min(6, callsPerDay));
    return 149 + 60 * (clamped - 1);
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
    setIsSubscribeModalOpen(false);
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
        calculatePrice,
        activateSubscription
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
