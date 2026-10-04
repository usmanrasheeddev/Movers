import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (client) return client

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase env vars missing – client will not be created.')
    return null
  }

  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })

  return client
}

export function requireSupabase(): SupabaseClient {
  const sb = getSupabase()
  if (!sb) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    )
  }
  return sb
}
