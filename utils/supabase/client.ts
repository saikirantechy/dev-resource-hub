import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

function getOrCreateClient(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a recursive proxy that gracefully handles all operations
    // including chained access like supabase.auth.getSession()
    const noopFn = (..._args: unknown[]) =>
      Promise.resolve({ data: null, error: null })
    const noopProxy = new Proxy(noopFn, {
      get(target, prop: string | symbol) {
        if (prop === 'then') return undefined // Not a Promise
        return noopProxy
      },
    })
    supabaseInstance = new Proxy({} as SupabaseClient, {
      get(_, prop: string | symbol) {
        if (prop === 'then') return undefined
        return noopProxy
      },
    })
    return supabaseInstance
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

export const supabase = getOrCreateClient()
