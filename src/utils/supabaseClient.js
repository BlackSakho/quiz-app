
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pggyavuzjlsfhcczryvt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZ3lhdnV6amxzZmhjY3pyeXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNTUzMjQsImV4cCI6MjA3MDkzMTMyNH0._gsIO1N4JUauG8Li7E3WTYYfgULKFCdde5Mxfy4Y-8U";
export const supabase = createClient(supabaseUrl, supabaseKey);
