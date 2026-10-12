import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireEnv } from "@/lib/env";

let client: SupabaseClient | undefined;

/**
 * Client Supabase avec la clé secrète : uniquement côté serveur (routes API).
 * Il contourne la Row Level Security, il ne doit donc jamais être importé dans un composant client.
 */
export function getSupabaseAdmin() {
  client ??= createClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_SECRET_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
