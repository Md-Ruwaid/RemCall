import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuthToken,
  setAuthToken,
  loginWithEmailApi,
  signupWithEmailApi,
  loginWithGoogleApi
} from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation View: 'home' | 'about' | 'how-it-works' | 'dashboard' | 'auth'
  const [activeView, setActiveView] = useState('home');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('auth'); // 'auth' | 'subscribe'

  // Authentication State
  const [token, setToken] = useState(() => getAuthToken());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getAuthToken());
  const [authError, setAuthError] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

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

  // Sync token state on startup
  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

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

  // Login Handler (Email)
  const loginUser = async (email, password) => {
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const res = await loginWithEmailApi(email, password);
      setToken(res.token);
      setIsAuthenticated(true);
      if (res.user) {
        setUser(prev => ({
          ...prev,
          name: res.user.name || prev.name,
          email: res.user.email || email,
          phone: res.user.phone || prev.phone,
          subscriptionActive: res.user.subscriptionActive ?? prev.subscriptionActive
        }));
      }
      setIsAuthLoading(false);
      return res;
    } catch (err) {
      setAuthError(err.message || 'Login failed.');
      setIsAuthLoading(false);
      throw err;
    }
  };

  // Signup Handler (Email)
  const signupUser = async (name, email, phone, password) => {
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const res = await signupWithEmailApi(name, email, phone, password);
      setToken(res.token);
      setIsAuthenticated(true);
      setUser(prev => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        phone: phone || prev.phone,
        subscriptionActive: false // requires subscription checkout
      }));
      setIsAuthLoading(false);
      return res;
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
      setIsAuthLoading(false);
      throw err;
    }
  };

  // Google OAuth Login Handler
  const loginWithGoogle = async (credential) => {
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const res = await loginWithGoogleApi(credential);
      setToken(res.token);
      setIsAuthenticated(true);
      if (res.user) {
        setUser(prev => ({
          ...prev,
          name: res.user.name || prev.name,
          email: res.user.email || prev.email,
          phone: res.user.phone || prev.phone,
          subscriptionActive: res.user.subscriptionActive ?? true
        }));
      }
      setIsAuthLoading(false);
      return res;
    } catch (err) {
      setAuthError(err.message || 'Google OAuth failed.');
      setIsAuthLoading(false);
      throw err;
    }
  };

  // Logout Handler (Clears JWT & Session)
  const logoutUser = () => {
    setAuthToken(null);
    setToken(null);
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
        token,
        authError,
        isAuthLoading,
        user,
        setUser,
        reminders,
        addReminder,
        deleteReminder,
        updateReminderStatus,
        calculatePrice,
        activateSubscription,
        loginUser,
        signupUser,
        loginWithGoogle,
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
