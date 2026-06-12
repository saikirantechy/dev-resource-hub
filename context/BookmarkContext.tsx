"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

type BookmarkType = "agent" | "tool" | "prompt";

interface Bookmark {
  id: string;
  type: BookmarkType;
  title: string;
  description: string;
  url: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  isBookmarked: (id: string) => boolean;
  synced: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

const LOCAL_STORAGE_KEY = "dev_hub_bookmarks";

function loadLocalBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalBookmarks(bookmarks: Bookmark[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

async function fetchCloudBookmarks(userId: string): Promise<Bookmark[]> {
  try {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return (data || []).map((row: Record<string, unknown>) => ({
      id: row.resource_id as string,
      type: row.resource_type as BookmarkType,
      title: row.title as string,
      description: (row.description as string) || "",
      url: (row.url as string) || "",
    }));
  } catch {
    return [];
  }
}

async function pushBookmarksToCloud(userId: string, bookmarks: Bookmark[]) {
  try {
    const rows = bookmarks.map((b) => ({
      user_id: userId,
      resource_type: b.type,
      resource_id: b.id,
      title: b.title,
      description: b.description,
      url: b.url,
    }));

    const { error } = await supabase.from("bookmarks").upsert(rows, {
      onConflict: "user_id, resource_type, resource_id",
      ignoreDuplicates: false,
    });

    if (error) console.error("Failed to sync bookmarks to cloud:", error);
  } catch (e) {
    console.error("Failed to sync bookmarks to cloud:", e);
  }
}

async function deleteCloudBookmark(userId: string, resourceId: string) {
  try {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("resource_id", resourceId);
  } catch (e) {
    console.error("Failed to delete cloud bookmark:", e);
  }
}

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    // Initialize from localStorage when no user
    if (typeof window !== "undefined" && !user) {
      return loadLocalBookmarks();
    }
    return [];
  });
  const [synced, setSynced] = useState(false);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    if (user) {
      fetchCloudBookmarks(user.id).then((cloudBookmarks) => {
        const localBookmarks = loadLocalBookmarks();

        if (cloudBookmarks.length > 0) {
          const cloudIds = new Set(cloudBookmarks.map((b) => b.id));
          const localOnly = localBookmarks.filter((b) => !cloudIds.has(b.id));
          setBookmarks([...cloudBookmarks, ...localOnly]);
          if (localOnly.length > 0) {
            pushBookmarksToCloud(user.id, localOnly);
          }
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        } else if (localBookmarks.length > 0) {
          setBookmarks(localBookmarks);
          pushBookmarksToCloud(user.id, localBookmarks);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        } else {
          setBookmarks([]);
        }
        initialLoadDone.current = true;
        setSynced(true);
      });
    } else if (!initialLoadDone.current) {
      initialLoadDone.current = true;
    }
  }, [user]);

  const addBookmark = useCallback(
    async (bookmark: Bookmark) => {
      const updated = [...bookmarks, bookmark];
      setBookmarks(updated);
      if (user) {
        await pushBookmarksToCloud(user.id, [bookmark]);
      } else {
        saveLocalBookmarks(updated);
      }
    },
    [bookmarks, user],
  );

  const removeBookmark = useCallback(
    async (id: string) => {
      const updated = bookmarks.filter((b) => b.id !== id);
      setBookmarks(updated);
      if (user) {
        await deleteCloudBookmark(user.id, id);
      } else {
        saveLocalBookmarks(updated);
      }
    },
    [bookmarks, user],
  );

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks],
  );

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, synced }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
