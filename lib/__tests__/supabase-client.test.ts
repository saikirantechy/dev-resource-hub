import { describe, it, expect, vi, beforeEach } from "vitest";

// Reset module registry so we get a fresh client each test
beforeEach(() => {
  vi.resetModules();
  // Clear env vars
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
});

describe("supabase client", () => {
  it("creates a mock client when env vars are missing", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    expect(supabase).toBeDefined();
    expect(typeof supabase.from).toBe("function");
  });

  it("mock client's from() returns a chainable query builder", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    const result = await supabase.from("resources").select("*").eq("id", "1").maybeSingle();
    expect(result).toEqual({ data: null, error: null });
  });

  it("mock client supports full query chaining", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    const query = supabase
      .from("profiles")
      .select("id, name")
      .eq("active", true)
      .neq("role", "admin")
      .gt("age", 18)
      .lt("age", 65)
      .like("name", "%john%")
      .order("name")
      .limit(10)
      .range(0, 9);

    expect(query).toBeDefined();
    const result = await query.maybeSingle();
    expect(result).toEqual({ data: null, error: null });
  });

  it("mock client's auth returns noop methods", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    const session = await supabase.auth.getSession();
    expect(session).toEqual({ data: null, error: null });
  });

  it("mock client supports channel subscriptions", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    const channel = supabase
      .channel("test")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "test" }, vi.fn())
      .subscribe();

    expect(channel).toBe("mock-subscription");
  });

  it("mock client supports storage operations", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    const upload = await supabase.storage.from("bucket").upload("path", new File([], "test"));
    expect(upload).toEqual({ data: null, error: null });
  });

  it("mock client supports rpc calls", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    const result = await supabase.rpc("my_func", { arg: 1 });
    expect(result).toEqual({ data: null, error: null });
  });

  it("auth.onAuthStateChange returns unsubscribeable subscription", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    const { data } = supabase.auth.onAuthStateChange(() => {});
    expect(data.subscription).toBeDefined();
    expect(typeof data.subscription.unsubscribe).toBe("function");
    expect(() => data.subscription.unsubscribe()).not.toThrow();
  });

  it("removeChannel is callable", async () => {
    const { supabase } = await import("@/utils/supabase/client");
    expect(() => supabase.removeChannel("test" as any)).not.toThrow();
  });

  it("creates a real Supabase client when env vars are set", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "test-key";

    // Re-import to pick up new env
    const { supabase } = await import("@/utils/supabase/client");
    expect(supabase).toBeDefined();
    // When env vars are set, it creates a real SupabaseClient
    expect(typeof supabase.auth.getSession).toBe("function");
  });

  it("is a singleton - subsequent imports return same instance", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "test-key";

    const mod1 = await import("@/utils/supabase/client");
    const mod2 = await import("@/utils/supabase/client");
    expect(mod1.supabase).toBe(mod2.supabase);
  });
});
