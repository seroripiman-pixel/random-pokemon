// Supabase anon key is safe for client-side use — security is enforced by RLS policies.
// Do NOT replace this with the service_role key.
const SUPABASE_URL = 'https://dsbnzbpkukmbghnlzhxn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzYm56YnBrdWttYmdobmx6aHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNDM4NDMsImV4cCI6MjA5MjcxOTg0M30.sPd5SmJ0R3Cmcr2qG9ms1tb_RJFxDVqXndt5HUhK2kI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
