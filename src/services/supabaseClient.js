import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zoatukgfqjiejzyudsee.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvYXR1a2dmcWppZWp6eXVkc2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MjQyODEsImV4cCI6MjEwMjMwMDI4MX0.RwqraU3kopx3CzlE8FyKLlO30rdsMiQWY26KCXhM4p4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
