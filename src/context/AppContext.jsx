import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import {
  signupWithEmailApi,
  loginWithEmailApi,
  loginWithGoogleApi,
  requestPasswordResetApi,
  updatePasswordApi,
  logoutApi,
  fetchUserProfileApi,
  fetchRemindersApi,
  createReminderApi,
  deleteReminderApi,
  updateReminderStatusApi
} from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // View routing state: 'home' | 'about' | 'how-it-works' | 'dashboard' | 'auth' | 'reset-password'
  const [activeView, setActiveView] = useState('home');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('auth'); // 'auth' | 'subscribe'

  // Session & User State
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [emailConfirmationPending, setEmailConfirmationPending] = useState(false);

  // Reminders List from DB
  const [reminders, setReminders] = useState([]);

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

  // Derived Authentication Flag
  const isAuthenticated = !!session;

  // Merged User Object (Supabase Auth User + Profiles Table DB Row)
  const user = {
    id: session?.user?.id || '',
    email: session?.user?.email || 'subscriber@example.com',
    name: userProfile?.name || session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || 'Subscriber',
    phone: userProfile?.phone || session?.user?.user_metadata?.phone || '+1 (555) 019-2834',
    subscriptionActive: userProfile?.subscription_active ?? false,
    dailyCallLimit: userProfile?.daily_call_limit || 1,
    callsUsedToday: userProfile?.calls_used_today || 0,
    planName: userProfile?.plan_name || 'Basic Protocol',
    subscriptionEnd: userProfile?.subscription_end || getUpcomingSundayISO(),
    inventoryCredits: userProfile?.inventory_credits || 0
  };

  // Load User Profile & Reminders from DB
  const loadUserData = useCallback(async (userId, userMetadata = {}) => {
    try {
      const [profileData, remindersData] = await Promise.all([
        fetchUserProfileApi(userId, userMetadata),
        fetchRemindersApi()
      ]);

      if (profileData) {
        setUserProfile(profileData);
      }
      setReminders(remindersData || []);
    } catch (err) {
      console.warn('Error loading user profile or reminders:', err);
    }
  }, []);

  // Supabase Auth State Change Listener
  useEffect(() => {
    let mounted = true;

    // 1. Fetch initial session
    supabase.auth.getSession().then(({ data: { session: initSession } }) => {
      if (!mounted) return;
      setSession(initSession);
      if (initSession?.user) {
        loadUserData(initSession.user.id);
      }
      setIsAuthLoading(false);
    });

    // 2. Subscribe to auth changes (login, logout, token refresh, OAuth redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);

      if (event === 'PASSWORD_RECOVERY') {
        setActiveView('reset-password');
      } else if (currentSession?.user) {
        await loadUserData(currentSession.user.id);
      } else {
        setUserProfile(null);
        setReminders([]);
      }
      setIsAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserData]);

  // Pricing Rule Calculation: ₹149 + ₹60 × (calls - 1)
  const calculatePrice = (callsPerDay) => {
    const clamped = Math.max(1, Math.min(6, callsPerDay));
    return 149 + 60 * (clamped - 1);
  };

  // Add Reminder to DB
  const addReminder = async (title, time, notes = '') => {
    if (!session?.user?.id) return;
    try {
      const newRem = await createReminderApi(session.user.id, title, time, notes);
      setReminders(prev => [newRem, ...prev]);
    } catch (err) {
      console.error('Failed to create reminder:', err);
      throw err;
    }
  };

  // Delete Reminder from DB
  const deleteReminder = async (id) => {
    try {
      await deleteReminderApi(id);
      setReminders(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Failed to delete reminder:', err);
      throw err;
    }
  };

  // Update Reminder Status in DB
  const updateReminderStatus = async (id, newStatus) => {
    try {
      const updated = await updateReminderStatusApi(id, newStatus);
      setReminders(prev => prev.map(r => r.id === id ? updated : r));
    } catch (err) {
      console.error('Failed to update reminder status:', err);
      throw err;
    }
  };

  // Activate Subscription (updates local profile and backend DB profile)
  const activateSubscription = async (dailyLimit, phone, name) => {
    if (!session?.user?.id) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          subscription_active: true,
          daily_call_limit: dailyLimit,
          phone: phone || user.phone,
          name: name || user.name,
          subscription_end: getUpcomingSundayISO()
        })
        .eq('id', session.user.id)
        .select()
        .single();

      if (error) console.error('Profile update warning:', error);
      if (data) setUserProfile(data);

      setIsSubscribeModalOpen(false);
      setActiveView('dashboard');
    } catch (err) {
      console.error('Subscription activation failed:', err);
      setIsSubscribeModalOpen(false);
      setActiveView('dashboard');
    }
  };

  // Login Handler (Email)
  const loginUser = async (email, password) => {
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const res = await loginWithEmailApi(email, password);
      setSession(res.session);
      if (res.session?.user) {
        await loadUserData(res.session.user.id);
      }
      setIsAuthLoading(false);
      return res;
    } catch (err) {
      setAuthError(err.message || 'Invalid login credentials.');
      setIsAuthLoading(false);
      throw err;
    }
  };

  // Signup Handler (Email)
  const signupUser = async (name, email, phone, password) => {
    setIsAuthLoading(true);
    setAuthError(null);
    setEmailConfirmationPending(false);

    try {
      const res = await signupWithEmailApi(name, email, phone, password);
      // If user requires email confirmation
      if (res.user && !res.session) {
        setEmailConfirmationPending(true);
      } else if (res.session) {
        setSession(res.session);
        await loadUserData(res.session.user.id);
      }
      setIsAuthLoading(false);
      return res;
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
      setIsAuthLoading(false);
      throw err;
    }
  };

  // Google OAuth Login Handler
  const loginWithGoogle = async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      await loginWithGoogleApi();
    } catch (err) {
      setAuthError(err.message || 'Google OAuth failed.');
      setIsAuthLoading(false);
      throw err;
    }
  };

  // Password Reset Handler
  const requestPasswordReset = async (email) => {
    setAuthError(null);
    try {
      await requestPasswordResetApi(email);
    } catch (err) {
      setAuthError(err.message || 'Failed to send password reset email.');
      throw err;
    }
  };

  // Update Password Handler
  const updatePassword = async (newPassword) => {
    setAuthError(null);
    try {
      await updatePasswordApi(newPassword);
    } catch (err) {
      setAuthError(err.message || 'Failed to update password.');
      throw err;
    }
  };

  // Logout Handler (Clears Supabase Session)
  const logoutUser = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setSession(null);
      setUserProfile(null);
      setReminders([]);
      setActiveView('home');
    }
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
        session,
        hasSeenTutorial,
        completeTutorial,
        resetTutorial,
        authError,
        setAuthError,
        isAuthLoading,
        emailConfirmationPending,
        setEmailConfirmationPending,
        user,
        setUserProfile,
        reminders,
        addReminder,
        deleteReminder,
        updateReminderStatus,
        calculatePrice,
        activateSubscription,
        loginUser,
        signupUser,
        loginWithGoogle,
        requestPasswordReset,
        updatePassword,
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
