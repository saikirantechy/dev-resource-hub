// ─── DSA Arena Types ───

export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";
export type TopicCategory = "Data Structures" | "Algorithms" | "Interview Preparation";
export type RankingTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Master" | "Grandmaster" | "Legend";
export type Language = "C" | "C++" | "Java" | "Python" | "JavaScript" | "TypeScript" | "Go" | "Rust" | "C#" | "Kotlin";
export type RoomStatus = "Active" | "Upcoming" | "Ended";
export type AssessmentType = "MCQ" | "Coding" | "Debugging" | "Optimization" | "SystemThinking";

export interface Topic {
  id: string;
  name: string;
  category: TopicCategory;
  description: string;
  icon: string;
  difficulty: Difficulty;
  problemCount: number;
  completedCount: number;
  color: string;
  gradient: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  topics: string[];
  likes: number;
  solvedCount: number;
  acceptanceRate: number;
  companies: string[];
  timeLimit: number;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  level: string;
  topics: string[];
  practiceCount: number;
  projects: string[];
  timeline: string;
  color: string;
  gradient: string;
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  topic: string;
  difficulty: Difficulty;
  participants: number;
  maxParticipants: number;
  timeRemaining: string;
  status: RoomStatus;
  language: Language;
  host: string;
  isPrivate: boolean;
}

export interface RankingUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  points: number;
  rank: number;
  tier: RankingTier;
  wins: number;
  totalMatches: number;
  streak: number;
  country?: string;
  college?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
  unlockedAt?: string;
  color: string;
}

export interface Question {
  id: string;
  type: AssessmentType;
  title: string;
  description: string;
  difficulty: Difficulty;
  options?: string[];
  correctAnswer?: string;
  code?: string;
  hints?: string[];
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
}

export interface Stats {
  totalPoints: number;
  roomsJoined: number;
  roomsEvaluated: number;
  wins: number;
  firstPlaceRate: number;
  secondPlaceRate: number;
  thirdPlaceRate: number;
  globalRank: number;
  currentStreak: number;
  problemsSolved: number;
  successRate: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  color: string;
  questionCount: number;
}

export interface TestCase {
  input: string;
  expected: string;
  output?: string;
  passed?: boolean;
}
