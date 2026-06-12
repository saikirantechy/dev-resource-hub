import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

// Mock supabase
const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockMaybeSingle = vi.fn();
const mockDelete = vi.fn();
const mockInsert = vi.fn();
const mockOn = vi.fn();
const mockSubscribe = vi.fn();
const mockRemoveChannel = vi.fn();

const mockQueryBuilder = {
  select: mockSelect,
  eq: mockEq,
  delete: mockDelete,
  insert: mockInsert,
  maybeSingle: mockMaybeSingle,
  order: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  then: undefined,
};

mockSelect.mockReturnValue(mockQueryBuilder);
mockEq.mockReturnValue(mockQueryBuilder);
mockDelete.mockReturnValue(mockQueryBuilder);
mockInsert.mockReturnValue(mockQueryBuilder);
mockMaybeSingle.mockResolvedValue({ data: null, error: null });

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => mockQueryBuilder),
    channel: vi.fn(() => ({
      on: mockOn,
      subscribe: mockSubscribe,
    })),
    removeChannel: mockRemoveChannel,
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  },
}));

// Mock AuthContext
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

import { useAuth } from "@/context/AuthContext";

describe("useResourceStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      profile: null,
      loading: false,
      signOut: vi.fn(),
    });

    mockMaybeSingle.mockResolvedValue({ data: null, error: null });
    mockOn.mockReturnValue({ subscribe: mockSubscribe });
    mockSubscribe.mockReturnValue("mock-subscription");
  });

  it("starts with loading=true, then transitions to loaded", async () => {
    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    expect(result.current.loading).toBe(true);
    expect(result.current.likes).toBe(0);
    expect(result.current.views).toBe(0);
    expect(result.current.isLiked).toBe(false);

    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("fetches likes and views from resources table", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({
        data: { likes_count: 42, views_count: 1500 },
        error: null,
      })
      .mockResolvedValueOnce({ data: null, error: null });

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.likes).toBe(42);
    expect(result.current.views).toBe(1500);
  });

  it("checks if current user has liked", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "user-1" } as any,
      profile: null,
      loading: false,
      signOut: vi.fn(),
    });

    mockMaybeSingle
      .mockResolvedValueOnce({
        data: { likes_count: 10, views_count: 100 },
        error: null,
      })
      .mockResolvedValueOnce({
        data: { id: "like-1" },
        error: null,
      });

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    await waitFor(() => {
      expect(result.current.isLiked).toBe(true);
    });
  });

  it("handles errors gracefully and falls back to defaults", async () => {
    mockMaybeSingle.mockRejectedValue(new Error("Network error"));

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.likes).toBe(0);
    expect(result.current.views).toBe(0);
  });

  it("toggleLike prompts sign-in when no user", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    result.current.toggleLike();
    expect(alertSpy).toHaveBeenCalledWith(
      "Please sign in to like resources!",
    );
    alertSpy.mockRestore();
  });

  it("toggleLike inserts like when user clicks", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "user-1" } as any,
      profile: null,
      loading: false,
      signOut: vi.fn(),
    });

    mockMaybeSingle
      .mockResolvedValueOnce({
        data: { likes_count: 5, views_count: 50 },
        error: null,
      })
      .mockResolvedValueOnce({ data: null, error: null });

    mockInsert.mockReturnValue(mockQueryBuilder);

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    await result.current.toggleLike();

    await waitFor(() => {
      expect(result.current.isLiked).toBe(true);
    });
    expect(result.current.likes).toBe(6);
  });

  it("toggleLike deletes like when already liked", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "user-1" } as any,
      profile: null,
      loading: false,
      signOut: vi.fn(),
    });

    mockMaybeSingle
      .mockResolvedValueOnce({
        data: { likes_count: 5, views_count: 50 },
        error: null,
      })
      .mockResolvedValueOnce({
        data: { id: "like-1" },
        error: null,
      });

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    await waitFor(() => {
      expect(result.current.isLiked).toBe(true);
    });

    await result.current.toggleLike();

    await waitFor(() => {
      expect(result.current.isLiked).toBe(false);
    });
    expect(result.current.likes).toBe(4);
  });

  it("incrementView calls rpc", async () => {
    const { supabase } = await import("@/lib/supabase");

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    const { result } = renderHook(() => useResourceStats("test-resource"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    await result.current.incrementView();
    expect(supabase.rpc).toHaveBeenCalledWith("increment_views", {
      resource_slug: "test-resource",
    });
  });

  it("sets up realtime subscription on mount", async () => {
    const { supabase } = await import("@/lib/supabase");

    const { useResourceStats } = await import("@/hooks/useResourceStats");
    renderHook(() => useResourceStats("test-resource"));

    expect(supabase.channel).toHaveBeenCalledWith(
      "resource-stats-test-resource",
    );
    expect(mockOn).toHaveBeenCalled();
  });
});
