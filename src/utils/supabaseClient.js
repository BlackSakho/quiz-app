
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://obayfzrkdsumbxpnpfxl.supabase.co";
const supabaseKey = "sb_publishable_jpjwrc-wDXJ4OXLZ9Cfzdg_tKWiaz_K";
export const supabase = createClient(supabaseUrl, supabaseKey);
