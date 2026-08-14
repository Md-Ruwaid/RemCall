import { supabase } from './supabaseClient';

/**
 * Register New Subscriber with Email & Password
 */
export async function signupWithEmailApi(name, email, phone, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone: phone
      }
    }
  });

  if (error) throw error;
  return data;
}

/**
 * Log In with Email & Password
 */
export async function loginWithEmailApi(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

/**
 * Log In with Google OAuth (Browser Redirect)
 */
export async function loginWithGoogleApi() {
  try {
    const redirectTo = window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account'
        }
      }
    });

    if (error) {
      if (error.message?.toLowerCase().includes('disabled') || error.message?.toLowerCase().includes('not enabled')) {
        throw new Error('Google Sign-In is disabled in your Supabase Dashboard. Go to Authentication → Providers → Google and switch it ON.');
      }
      throw error;
    }
    return data;
  } catch (err) {
    console.error('Google OAuth Error:', err);
    throw err;
  }
}

/**
 * Send Password Reset Email
 */
export async function requestPasswordResetApi(email) {
  const redirectTo = `${window.location.origin}/#reset-password`;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo
  });

  if (error) throw error;
  return data;
}

/**
 * Update User Password (Recovery Flow)
 */
export async function updatePasswordApi(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw error;
  return data;
}

/**
 * Sign Out / Clear Session
 */
export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get Current Active Auth Session
 */
export async function getCurrentSessionApi() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/**
 * Fetch Subscriber Profile Data from DB (with auto-upsert fallback)
 */
export async function fetchUserProfileApi(userId, metaData = {}) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      // Row not found (PGRST116) — create default profile
      if (error.code === 'PGRST116') {
        const defaultProfile = {
          id: userId,
          name: metaData.full_name || metaData.name || 'Subscriber',
          phone: metaData.phone || '',
          subscription_active: false,
          daily_call_limit: 1,
          calls_used_today: 0,
          plan_name: 'Basic Protocol'
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .upsert([defaultProfile])
          .select()
          .single();

        if (!createError && createdProfile) {
          return createdProfile;
        }
        return defaultProfile;
      }
      console.warn('Profile fetch note:', error.message);
    }
    return data;
  } catch (err) {
    console.warn('Profile fetch exception:', err);
    return null;
  }
}

/**
 * Fetch User Reminders from DB
 */
export async function fetchRemindersApi() {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Create New Reminder in DB
 */
export async function createReminderApi(userId, title, time, notes = '') {
  const { data, error } = await supabase
    .from('reminders')
    .insert([
      {
        user_id: userId,
        title: title.toUpperCase(),
        time: time.toUpperCase(),
        status: 'SCHEDULED',
        notes
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
}

/**
 * Delete Reminder from DB
 */
export async function deleteReminderApi(id) {
  const { error } = await supabase
    .from('reminders')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Update Reminder Status in DB
 */
export async function updateReminderStatusApi(id, newStatus) {
  const { data, error } = await supabase
    .from('reminders')
    .update({ status: newStatus })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}
