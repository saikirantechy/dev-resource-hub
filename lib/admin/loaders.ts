import { loadJsonData } from "./storage";

export interface LeaderboardUser {
  username: string;
  displayName: string;
  avatar?: string;
  xp: number;
  rank: string;
  streak: number;
  contributions: { workflows: number; prompts: number; articles: number };
  badges: string[];
}

export interface AgentItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  github?: string;
  docs?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isOpenSource?: boolean;
  isFree?: boolean;
  pricing?: string;
  stars?: number;
  views?: number;
  strength?: string;
  useCases?: string[];
  stack?: string[];
  platform?: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  url: string;
  github?: string;
  docs?: string;
  tags: string[];
  category: string;
  pricing?: string;
  isOpenSource?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  stars?: number;
  views?: number;
  strength?: string;
  platform?: string[];
}

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  views: number;
  likes: number;
  difficulty: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  pricing?: string;
  isOpenSource?: boolean;
  tags: string[];
  stars?: number;
  creator?: string;
  logo?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  techStack: string[];
  creator: string;
  github?: string;
  likes: number;
  views: number;
  builtWithHub?: boolean;
}

export interface EventItem {
  id: string;
  name: string;
  category: string;
  date: string;
  endDate?: string;
  city?: string;
  state?: string;
  country?: string;
  venue?: string;
  description: string;
  registrationUrl?: string;
  price?: string;
  attendees?: number;
  organizer?: string;
  tags: string[];
}

export interface OpenSourceItem {
  name: string;
  description: string;
  url: string;
  tags: string[];
  isFree?: boolean;
  isOpenSource?: boolean;
}

export async function loadLeaderboardData(): Promise<LeaderboardUser[]> {
  try {
    const data = await loadJsonData<LeaderboardUser>("leaderboard.json");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function loadAgentsData(): Promise<AgentItem[]> {
  try {
    const data = await loadJsonData<AgentItem>("agents.json");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function loadToolsData(): Promise<ToolItem[]> {
  try {
    const data = await loadJsonData<ToolItem>("tools.json");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function loadPromptsData(): Promise<PromptItem[]> {
  try {
    const data = await loadJsonData<PromptItem>("prompts.json");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function loadMarketplaceData(): Promise<MarketplaceItem[]> {
  try {
    const data = await loadJsonData<MarketplaceItem>("marketplace.json");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function loadShowcaseData(): Promise<ShowcaseItem[]> {
  try {
    const data = await loadJsonData<ShowcaseItem>("showcase.json");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function loadEventsData(): Promise<EventItem[]> {
  try {
    const raw = await loadJsonData<Record<string, unknown>>("events.json");
    if (Array.isArray(raw)) return raw as unknown as EventItem[];
    if (raw && typeof raw === "object" && "events" in raw) {
      return (raw as { events: EventItem[] }).events || [];
    }
    return [];
  } catch {
    return [];
  }
}

export async function loadOpenSourceData(): Promise<OpenSourceItem[]> {
  try {
    const data = await loadJsonData<OpenSourceItem>("open-source.json");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function loadDevRankData(): Promise<LeaderboardUser[]> {
  return loadLeaderboardData();
}

export async function loadDSAData(): Promise<Record<string, unknown>[]> {
  try {
    const dataModule = await import("@/lib/dsa/data");
    const keys = Object.keys(dataModule);
    if (keys.length > 0) {
      const value = (dataModule as Record<string, unknown>)[keys[0]];
      if (Array.isArray(value)) return value as Record<string, unknown>[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function loadCommunityData(): Promise<Record<string, unknown>[]> {
  try {
    const { default: leaderboardData } = await import("@/data/leaderboard.json");
    return Array.isArray(leaderboardData) ? leaderboardData as unknown as Record<string, unknown>[] : [];
  } catch {
    return [];
  }
}
