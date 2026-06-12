import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

function getOrCreateClient(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    supabaseInstance = createMockClient()
    return supabaseInstance
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

function createMockClient(): SupabaseClient {
  const noopAsync = () =>
    Promise.resolve({ data: null, error: null })
  const noopSubscription = { unsubscribe: () => {} }

  // Mock query builder that supports method chaining
  type QueryFn = () => Record<string, unknown>
  const createQuery = () => {
    const query: Record<string, QueryFn | unknown> = {
      select: () => query,
      insert: () => query,
      update: () => query,
      delete: () => query,
      eq: () => query,
      neq: () => query,
      gt: () => query,
      lt: () => query,
      gte: () => query,
      lte: () => query,
      like: () => query,
      ilike: () => query,
      is: () => query,
      in: () => query,
      contains: () => query,
      order: () => query,
      limit: () => query,
      range: () => query,
      single: () => Promise.resolve({ data: null, error: null }),
      maybeSingle: () => Promise.resolve({ data: null, error: null }),
      then: (resolve: (val: { data: null; error: null }) => void) =>
        resolve({ data: null, error: null }),
    }
    return query
  }

  return {
    auth: {
      getSession: noopAsync,
      onAuthStateChange: (
        _callback: (event: string, session: unknown) => void,
      ) => ({
        data: { subscription: noopSubscription },
      }),
      signInWithOtp: noopAsync,
      signInWithOAuth: noopAsync,
      signOut: noopAsync,
      getUser: noopAsync,
    },
    from: () => createQuery(),
    channel: () => ({
      on: () => ({ subscribe: () => 'mock-subscription' }),
      subscribe: () => 'mock-subscription',
    }),
    removeChannel: () => {},
    rpc: noopAsync,
    storage: {
      from: () => ({
        upload: noopAsync,
        download: noopAsync,
        list: noopAsync,
        remove: noopAsync,
      }),
    },
  } as unknown as SupabaseClient
}

export const supabase = getOrCreateClient()
