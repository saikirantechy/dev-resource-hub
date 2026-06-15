// ─── DevRank AI Types ───

export type RankingPeriod = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly" | "All-Time";
export type DevRankTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Elite";
export type CommunityType = "Student" | "GDSC" | "MLSA" | "AWS User Group" | "GDG" | "Open Source" | "Developer" | "Startup";

export interface Developer {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  college?: string;
  community?: string;
  organization?: string;
  country: string;
  city?: string;
  rank: number;
  score: number;
  tier: DevRankTier;
  prs: number;
  mergedPrs: number;
  stars: number;
  followers: number;
  commits: number;
  repos: number;
  issues: number;
  reviews: number;
  streak: number;
  languages: string[];
  techStack: string[];
  badges: string[];
  achievements: string[];
  contributionHeatmap: number[];
  joinedAt: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  country: string;
  studentCount: number;
  contributorCount: number;
  totalScore: number;
  topContributor: string;
  topContributorScore: number;
  placementReadiness: number;
  innovationScore: number;
  communityImpact: number;
  departments: string[];
  rank: number;
  growth: number;
  trend: "up" | "down" | "stable";
}

export interface Community {
  id: string;
  name: string;
  type: CommunityType;
  description: string;
  memberCount: number;
  contributorCount: number;
  totalScore: number;
  projects: number;
  events: number;
  rank: number;
  growth: number;
  topMembers: string[];
  location: string;
  website?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  repoCount: number;
  totalStars: number;
  totalForks: number;
  contributorCount: number;
  rank: number;
  growth: number;
  topRepos: string[];
  topLanguages: string[];
}

export interface Hackathon {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  participantCount: number;
  projectCount: number;
  winner: string;
  winnerScore: number;
  topTeams: string[];
  rank: number;
  type: "Online" | "In-Person" | "Hybrid";
}

export interface DevRankBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  category: "contribution" | "achievement" | "community" | "skill" | "hackathon";
  condition: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Insight {
  id: string;
  type: "strength" | "weakness" | "opportunity" | "recommendation";
  title: string;
  description: string;
  score: number;
  color: string;
}

export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalPRs: number;
  mergedPRs: number;
  prSuccessRate: number;
  totalIssues: number;
  issuesClosed: number;
  issueResolutionRate: number;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalFollowers: number;
  contributionStreak: number;
  longestStreak: number;
  languageDistribution: { language: string; percentage: number; color: string }[];
  activityHeatmap: number[];
  repoGrowth: { date: string; count: number }[];
}

export interface DevRankSearchResult {
  id: string;
  type: "developer" | "college" | "community" | "organization" | "hackathon" | "repository";
  name: string;
  subtitle: string;
  score: number;
  avatar?: string;
  rank?: number;
}
