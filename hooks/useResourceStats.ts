"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export function useResourceStats(resourceId: string) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resourceId) return;

    let cancelled = false;

    const fetchStats = async () => {
      try {
        // 1. Fetch likes and views from 'resources' table
        const { data: resourceData } = await supabase
          .from("resources")
          .select("likes_count, views_count")
          .eq("slug", resourceId)
          .maybeSingle();

        if (!cancelled) {
          if (resourceData) {
            setLikes(resourceData.likes_count ?? 0);
            setViews(resourceData.views_count ?? 0);
          }

          // 2. Check if current user liked it
          if (user) {
            const { data: likeData } = await supabase
              .from("likes")
              .select("id")
              .eq("user_id", user.id)
              .eq("resource_id", resourceId)
              .maybeSingle();

            if (!cancelled) {
              setIsLiked(!!likeData);
            }
          }

          if (!cancelled) {
            setLoading(false);
          }
        }
      } catch {
        // Supabase not configured or network error — use defaults
        if (!cancelled) setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to changes (gracefully fails on mock client)
    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      channel = supabase
        .channel(`resource-stats-${resourceId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "resources",
            filter: `slug=eq.${resourceId}`,
          },
          (payload) => {
            if (!cancelled) {
              setLikes((payload.new as Record<string, unknown>).likes_count as number ?? 0);
              setViews((payload.new as Record<string, unknown>).views_count as number ?? 0);
            }
          },
        )
        .subscribe();
    } catch {
      // Realtime not supported in mock
    }

    return () => {
      cancelled = true;
      if (channel) {
        try {
          supabase.removeChannel(channel);
        } catch {
          // ignore
        }
      }
    };
  }, [resourceId, user]);

  const toggleLike = useCallback(async () => {
    if (!user) {
      alert("Please sign in to like resources!");
      return;
    }

    try {
      if (isLiked) {
        await supabase.from("likes").delete().eq("user_id", user.id).eq("resource_id", resourceId);
        setIsLiked(false);
        setLikes((prev) => Math.max(0, prev - 1));
      } else {
        await supabase.from("likes").insert({ user_id: user.id, resource_id: resourceId });
        setIsLiked(true);
        setLikes((prev) => prev + 1);
      }
    } catch {
      // Optimistic update already applied — ignore Supabase errors
    }
  }, [user, isLiked, resourceId]);

  const incrementView = useCallback(async () => {
    try {
      await supabase.rpc("increment_views", { resource_slug: resourceId });
    } catch {
      // Gracefully fail if RPC doesn't exist
    }
  }, [resourceId]);

  return { likes, views, isLiked, loading, toggleLike, incrementView };
}
