"use client";

import { useState, useEffect } from "react";
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

    const fetchStats = async () => {
      // 1. Fetch likes and views from 'resources' table
      const { data: resourceData } = await supabase
        .from("resources")
        .select("likes_count, views_count")
        .eq("slug", resourceId)
        .single();

      if (resourceData) {
        setLikes(resourceData.likes_count);
        setViews(resourceData.views_count);
      }

      // 2. Check if current user liked it
      if (user) {
        const { data: likeData } = await supabase
          .from("likes")
          .select("id")
          .eq("user_id", user.id)
          .eq("resource_id", resourceId)
          .single();
        
        setIsLiked(!!likeData);
      }
      
      setLoading(false);
    };

    fetchStats();

    // Subscribe to changes
    const channel = supabase
      .channel(`resource-stats-${resourceId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "resources", filter: `slug=eq.${resourceId}` }, (payload) => {
        setLikes(payload.new.likes_count);
        setViews(payload.new.views_count);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [resourceId, user]);

  const toggleLike = async () => {
    if (!user) return alert("Please login to like resources!");

    if (isLiked) {
      // Unlike
      await supabase.from("likes").delete().eq("user_id", user.id).eq("resource_id", resourceId);
      setIsLiked(false);
      setLikes(prev => prev - 1);
    } else {
      // Like
      await supabase.from("likes").insert({ user_id: user.id, resource_id: resourceId });
      setIsLiked(true);
      setLikes(prev => prev + 1);
    }
  };

  const incrementView = async () => {
     // RPC call or direct update for simplicity
     await supabase.rpc("increment_views", { resource_slug: resourceId });
  };

  return { likes, views, isLiked, loading, toggleLike, incrementView };
}
