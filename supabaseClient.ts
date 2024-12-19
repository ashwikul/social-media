import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPA_API_URL;
const supabaseKey = import.meta.env.VITE_SUPA_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
