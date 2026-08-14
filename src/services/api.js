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
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return data;
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
 * Fetch Subscriber Profile Data from DB
 */
export async function fetchUserProfileApi(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user profile:', error);
  }
  return data;
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
