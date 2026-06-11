"use client";

import React, { createContext, useContext, useState } from "react";

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
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("dev_hub_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const addBookmark = (bookmark: Bookmark) => {
    const updated = [...bookmarks, bookmark];
    setBookmarks(updated);
    localStorage.setItem("dev_hub_bookmarks", JSON.stringify(updated));
  };

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("dev_hub_bookmarks", JSON.stringify(updated));
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
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
