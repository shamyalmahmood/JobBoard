import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uugsuvyifshqudavnozb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Z3N1dnlpZnNocXVkYXZub3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMDg4NjQsImV4cCI6MjA0MDg4NDg2NH0.wUhYbxxvMt3ooZNmZSWptJeB1ZKrDMcmg2gmipLuUvI";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;