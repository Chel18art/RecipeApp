import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and API Key
const supabaseUrl = 'https://ktqdwhiloknxiviwgpoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cWR3aGlsb2tueGl2aXdncG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzOTMxMTAsImV4cCI6MjA0MTk2OTExMH0.wrthB0cA3iP3E5l_ks6qasvqmdogYY-FQd3xZTjpNyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
