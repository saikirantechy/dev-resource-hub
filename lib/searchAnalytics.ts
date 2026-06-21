"use client";

const STORAGE_KEY = "devhub_search_analytics";
const MAX_ENTRIES = 5000;

export interface SearchLogEntry {
  id: string;
  query: string;
  type: "search" | "click";
  resultCount: number;
  clickedHref?: string;
  clickedName?: string;
  timestamp: string;
}

export interface SearchAggregate {
  query: string;
  count: number;
  lastSearched: string;
  avgResults: number;
  clickCount: number;
  clickThroughRate: number;
}

function getLogs(): SearchLogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogs(logs: SearchLogEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    const trimmed = logs.slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    try {
      const trimmed = logs.slice(0, 1000);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {}
  }
}

export function logSearch(query: string, resultCount: number): void {
  const logs = getLogs();
  logs.unshift({
    id: "search-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    query: query.toLowerCase().trim(),
    type: "search",
    resultCount,
    timestamp: new Date().toISOString(),
  });
  saveLogs(logs);
}

export function logSearchClick(query: string, href: string, name: string): void {
  const logs = getLogs();
  logs.unshift({
    id: "click-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    query: query.toLowerCase().trim(),
    type: "click",
    resultCount: 0,
    clickedHref: href,
    clickedName: name,
    timestamp: new Date().toISOString(),
  });
  saveLogs(logs);
}

export function getSearchAnalytics(): {
  totalSearches: number;
  totalClicks: number;
  uniqueQueries: number;
  topQueries: SearchAggregate[];
  recentSearches: SearchLogEntry[];
  noResultQueries: { query: string; count: number; lastSearched: string }[];
  searchVolumeByDay: { date: string; count: number }[];
  topClickedResults: { name: string; href: string; clicks: number }[];
} {
  const logs = getLogs();
  const searches = logs.filter((l) => l.type === "search");
  const clicks = logs.filter((l) => l.type === "click");

  const queryMap = new Map<string, { count: number; lastSearched: string; totalResults: number; clickCount: number }>();

  for (const s of searches) {
    const existing = queryMap.get(s.query) || { count: 0, lastSearched: s.timestamp, totalResults: 0, clickCount: 0 };
    existing.count++;
    existing.totalResults += s.resultCount;
    if (s.timestamp > existing.lastSearched) existing.lastSearched = s.timestamp;
    queryMap.set(s.query, existing);
  }

  for (const c of clicks) {
    const existing = queryMap.get(c.query);
    if (existing) existing.clickCount++;
  }

  const topQueries: SearchAggregate[] = Array.from(queryMap.entries())
    .map(([query, data]) => ({
      query,
      count: data.count,
      lastSearched: data.lastSearched,
      avgResults: Math.round(data.totalResults / data.count),
      clickCount: data.clickCount,
      clickThroughRate: data.count > 0 ? Math.round((data.clickCount / data.count) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);

  const noResultQueries = Array.from(queryMap.entries())
    .filter(([_, data]) => data.totalResults === 0)
    .map(([query, data]) => ({ query, count: data.count, lastSearched: data.lastSearched }))
    .sort((a, b) => b.count - a.count);

  const dayMap = new Map<string, number>();
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dayMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const s of searches) {
    const key = s.timestamp.slice(0, 10);
    if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) || 0) + 1);
  }
  const searchVolumeByDay = Array.from(dayMap.entries()).map(([date, count]) => ({ date, count }));

  const clickMap = new Map<string, { name: string; href: string; clicks: number }>();
  for (const c of clicks) {
    const key = c.clickedHref || "";
    if (!key) continue;
    const existing = clickMap.get(key) || { name: c.clickedName || "", href: c.clickedHref || "", clicks: 0 };
    existing.clicks++;
    clickMap.set(key, existing);
  }
  const topClickedResults = Array.from(clickMap.values()).sort((a, b) => b.clicks - a.clicks).slice(0, 20);

  return { totalSearches: searches.length, totalClicks: clicks.length, uniqueQueries: queryMap.size, topQueries, recentSearches: logs.slice(0, 50), noResultQueries, searchVolumeByDay, topClickedResults };
}

export function clearSearchAnalytics(): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}
