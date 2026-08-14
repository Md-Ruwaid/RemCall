import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zoatukgfqjiejzyudsee.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvYXR1a2dmcWppZWp6eXVkc2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MjQyODEsImV4cCI6MjEwMjMwMDI4MX0.RwqraU3kopx3CzlE8FyKLlO30rdsMiQWY26KCXhM4p4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection with real anon JWT key...');

  try {
    // 1. Session check
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Session test error:', sessionError);
    } else {
      console.log('✅ Supabase Auth API session check passed!');
    }

    // 2. Profiles check
    const { data: profiles, error: profileError } = await supabase.from('profiles').select('*').limit(1);
    if (profileError) {
      console.warn('⚠️ Profiles query error:', profileError);
    } else {
      console.log('✅ Profiles table query successful!');
    }

    // 3. Reminders check
    const { data: reminders, error: reminderError } = await supabase.from('reminders').select('*').limit(1);
    if (reminderError) {
      console.warn('⚠️ Reminders query error:', reminderError);
    } else {
      console.log('✅ Reminders table query successful!');
    }

  } catch (err) {
    console.error('❌ Exception:', err);
  }
}

testConnection();
