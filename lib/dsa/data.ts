import type { Topic, Challenge, Roadmap, Room, RankingUser, Achievement, AIAgent, Company, Stats } from "./types";

export const PLACEHOLDER_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=";

export const DEFAULT_STATS: Stats = {
  totalPoints: 2840,
  roomsJoined: 47,
  roomsEvaluated: 38,
  wins: 12,
  firstPlaceRate: 25.5,
  secondPlaceRate: 18.3,
  thirdPlaceRate: 22.4,
  globalRank: 342,
  currentStreak: 7,
  problemsSolved: 156,
  successRate: 72,
};

export const AI_AGENTS: AIAgent[] = [
  { id: "tutor", name: "DSA Tutor", role: "Learning Assistant", description: "Guides you through concepts with hints, visualizations, and step-by-step solutions.", icon: "📚", color: "from-blue-500 to-cyan-500" },
  { id: "examiner", name: "Dave", role: "DSA Examiner", description: "Structured questioning, coding challenges, and interview simulations to evaluate your skills.", icon: "🎯", color: "from-red-500 to-orange-500" },
  { id: "interview-coach", name: "Interview Coach", role: "Career Mentor", description: "Prepares you for FAANG interviews with company-specific problem sets and tips.", icon: "💼", color: "from-purple-500 to-pink-500" },
  { id: "code-reviewer", name: "Code Reviewer", role: "Quality Analyst", description: "Reviews your solutions for correctness, complexity, edge cases, and code quality.", icon: "🔍", color: "from-emerald-500 to-teal-500" },
  { id: "complexity-analyzer", name: "Complexity Analyzer", role: "Performance Expert", description: "Analyzes time and space complexity with optimization recommendations.", icon: "⚡", color: "from-amber-500 to-orange-500" },
  { id: "roadmap-generator", name: "Roadmap Generator", role: "Learning Path Designer", description: "Creates personalized DSA learning roadmaps based on your goals and skill level.", icon: "🗺️", color: "from-indigo-500 to-blue-500" },
];

export const TOPICS: Topic[] = [
  { id: "arrays", name: "Arrays", category: "Data Structures", description: "Contiguous memory allocation, traversal, rotation, two-pointer techniques", icon: "📊", difficulty: "Easy", problemCount: 45, completedCount: 32, color: "blue", gradient: "from-blue-500/20 to-cyan-500/10" },
  { id: "linked-lists", name: "Linked Lists", category: "Data Structures", description: "Singly, doubly, circular, fast & slow pointer, reversal, merge", icon: "🔗", difficulty: "Easy", problemCount: 38, completedCount: 28, color: "emerald", gradient: "from-emerald-500/20 to-teal-500/10" },
  { id: "stacks", name: "Stacks", category: "Data Structures", description: "LIFO, monotonic stack, expression evaluation, balanced parentheses", icon: "📚", difficulty: "Easy", problemCount: 25, completedCount: 20, color: "orange", gradient: "from-orange-500/20 to-amber-500/10" },
  { id: "queues", name: "Queues", category: "Data Structures", description: "FIFO, circular queue, deque, priority queue, sliding window", icon: "🚶", difficulty: "Easy", problemCount: 22, completedCount: 15, color: "purple", gradient: "from-purple-500/20 to-pink-500/10" },
  { id: "trees", name: "Trees", category: "Data Structures", description: "Binary trees, traversals, LCA, diameter, path sum, serialization", icon: "🌳", difficulty: "Medium", problemCount: 50, completedCount: 30, color: "emerald", gradient: "from-emerald-500/20 to-green-500/10" },
  { id: "bst", name: "BST", category: "Data Structures", description: "Binary search trees, validation, insertion, deletion, Kth smallest", icon: "🌲", difficulty: "Medium", problemCount: 28, completedCount: 18, color: "blue", gradient: "from-blue-500/20 to-indigo-500/10" },
  { id: "heap", name: "Heap", category: "Data Structures", description: "Min/max heap, priority queue, Top K, median, merge K sorted", icon: "⛰️", difficulty: "Medium", problemCount: 20, completedCount: 12, color: "amber", gradient: "from-amber-500/20 to-yellow-500/10" },
  { id: "trie", name: "Trie", category: "Data Structures", description: "Prefix tree, autocomplete, word search, dictionary, IP routing", icon: "🔤", difficulty: "Hard", problemCount: 15, completedCount: 5, color: "red", gradient: "from-red-500/20 to-rose-500/10" },
  { id: "graphs", name: "Graphs", category: "Data Structures", description: "BFS, DFS, Dijkstra, topological sort, MST, union find, SCC", icon: "🕸️", difficulty: "Hard", problemCount: 55, completedCount: 20, color: "violet", gradient: "from-violet-500/20 to-purple-500/10" },
  { id: "hash-tables", name: "Hash Tables", category: "Data Structures", description: "Collision resolution, load factor, counting, caching, two-sum", icon: "🔑", difficulty: "Easy", problemCount: 30, completedCount: 22, color: "pink", gradient: "from-pink-500/20 to-rose-500/10" },
  { id: "disjoint-set", name: "Disjoint Set", category: "Data Structures", description: "Union-find, path compression, union by rank, connected components", icon: "🔗", difficulty: "Hard", problemCount: 12, completedCount: 4, color: "cyan", gradient: "from-cyan-500/20 to-blue-500/10" },
  { id: "segment-tree", name: "Segment Tree", category: "Data Structures", description: "Range queries, point updates, lazy propagation, RMQ", icon: "📐", difficulty: "Expert", problemCount: 10, completedCount: 2, color: "indigo", gradient: "from-indigo-500/20 to-purple-500/10" },
  { id: "fenwick-tree", name: "Fenwick Tree", category: "Data Structures", description: "BIT, prefix sums, range sum, point update, inversion count", icon: "📏", difficulty: "Expert", problemCount: 8, completedCount: 1, color: "teal", gradient: "from-teal-500/20 to-emerald-500/10" },
  { id: "sorting", name: "Sorting", category: "Algorithms", description: "Quick sort, merge sort, heap sort, counting sort, bucket sort", icon: "📋", difficulty: "Easy", problemCount: 20, completedCount: 15, color: "blue", gradient: "from-blue-500/20 to-sky-500/10" },
  { id: "searching", name: "Searching", category: "Algorithms", description: "Binary search, ternary search, exponential search, interpolation", icon: "🔎", difficulty: "Easy", problemCount: 18, completedCount: 14, color: "green", gradient: "from-green-500/20 to-emerald-500/10" },
  { id: "greedy", name: "Greedy", category: "Algorithms", description: "Activity selection, Huffman coding, fractional knapsack, scheduling", icon: "🎯", difficulty: "Medium", problemCount: 25, completedCount: 15, color: "orange", gradient: "from-orange-500/20 to-amber-500/10" },
  { id: "recursion", name: "Recursion", category: "Algorithms", description: "Divide & conquer, backtracking, memoization, subset generation", icon: "🔄", difficulty: "Medium", problemCount: 30, completedCount: 18, color: "purple", gradient: "from-purple-500/20 to-pink-500/10" },
  { id: "backtracking", name: "Backtracking", category: "Algorithms", description: "N-Queens, sudoku, permutations, combinations, maze solving", icon: "↩️", difficulty: "Hard", problemCount: 22, completedCount: 8, color: "red", gradient: "from-red-500/20 to-rose-500/10" },
  { id: "dp", name: "Dynamic Programming", category: "Algorithms", description: "Memoization, tabulation, knapsack, LCS, LIS, matrix chain, edit distance", icon: "🧩", difficulty: "Hard", problemCount: 60, completedCount: 22, color: "violet", gradient: "from-violet-500/20 to-purple-500/10" },
  { id: "graph-algorithms", name: "Graph Algorithms", category: "Algorithms", description: "Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, topological, SCC", icon: "🔄", difficulty: "Hard", problemCount: 35, completedCount: 12, color: "indigo", gradient: "from-indigo-500/20 to-blue-500/10" },
  { id: "string-algorithms", name: "String Algorithms", category: "Algorithms", description: "KMP, Rabin-Karp, Z-algorithm, Manacher, suffix array, LCP", icon: "📝", difficulty: "Hard", problemCount: 20, completedCount: 6, color: "cyan", gradient: "from-cyan-500/20 to-teal-500/10" },
  { id: "bit-manipulation", name: "Bit Manipulation", category: "Algorithms", description: "XOR tricks, bit masks, subset generation, power of two, bit counting", icon: "💡", difficulty: "Medium", problemCount: 18, completedCount: 10, color: "amber", gradient: "from-amber-500/20 to-yellow-500/10" },
  { id: "mathematics", name: "Mathematics", category: "Algorithms", description: "Prime numbers, GCD, LCM, modulo, combinatorics, probability", icon: "🔢", difficulty: "Medium", problemCount: 20, completedCount: 12, color: "pink", gradient: "from-pink-500/20 to-rose-500/10" },
  { id: "computational-geometry", name: "Computational Geometry", category: "Algorithms", description: "Convex hull, line intersection, polygon area, closest pair, sweep line", icon: "📐", difficulty: "Expert", problemCount: 10, completedCount: 2, color: "teal", gradient: "from-teal-500/20 to-emerald-500/10" },
];

export const COMPANIES: Company[] = [
  { id: "amazon", name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", color: "from-orange-500 to-amber-600", questionCount: 85 },
  { id: "google", name: "Google", logo: "https://logo.clearbit.com/google.com", color: "from-blue-500 to-green-500", questionCount: 72 },
  { id: "microsoft", name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", color: "from-blue-600 to-blue-800", questionCount: 65 },
  { id: "meta", name: "Meta", logo: "https://logo.clearbit.com/meta.com", color: "from-blue-500 to-indigo-600", questionCount: 58 },
  { id: "apple", name: "Apple", logo: "https://logo.clearbit.com/apple.com", color: "from-gray-500 to-gray-700", questionCount: 45 },
  { id: "netflix", name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", color: "from-red-500 to-red-700", questionCount: 32 },
  { id: "uber", name: "Uber", logo: "https://logo.clearbit.com/uber.com", color: "from-gray-800 to-black", questionCount: 28 },
  { id: "atlassian", name: "Atlassian", logo: "https://logo.clearbit.com/atlassian.com", color: "from-blue-500 to-cyan-500", questionCount: 25 },
  { id: "adobe", name: "Adobe", logo: "https://logo.clearbit.com/adobe.com", color: "from-red-500 to-red-700", questionCount: 22 },
  { id: "oracle", name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", color: "from-red-600 to-orange-600", questionCount: 20 },
  { id: "salesforce", name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", color: "from-blue-400 to-cyan-400", questionCount: 18 },
];

export const CHALLENGES: Challenge[] = [
  { id: "two-sum", title: "Two Sum", description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.", difficulty: "Easy", topic: "Arrays", topics: ["Arrays", "Hash Tables"], likes: 15230, solvedCount: 28450, acceptanceRate: 48.5, companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"], timeLimit: 15 },
  { id: "valid-parentheses", title: "Valid Parentheses", description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", difficulty: "Easy", topic: "Stacks", topics: ["Stacks", "Strings"], likes: 12340, solvedCount: 25400, acceptanceRate: 52.3, companies: ["Amazon", "Microsoft", "Google", "Meta"], timeLimit: 12 },
  { id: "merge-two-sorted-lists", title: "Merge Two Sorted Lists", description: "Merge two sorted linked lists and return it as a sorted list.", difficulty: "Easy", topic: "Linked Lists", topics: ["Linked Lists", "Recursion"], likes: 11200, solvedCount: 22800, acceptanceRate: 58.7, companies: ["Amazon", "Microsoft", "Google", "Apple"], timeLimit: 10 },
  { id: "maximum-subarray", title: "Maximum Subarray", description: "Find the contiguous subarray with the largest sum and return its sum.", difficulty: "Medium", topic: "Dynamic Programming", topics: ["Arrays", "Dynamic Programming", "Divide and Conquer"], likes: 18450, solvedCount: 31200, acceptanceRate: 49.2, companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"], timeLimit: 15 },
  { id: "longest-substring", title: "Longest Substring Without Repeating Characters", description: "Given a string s, find the length of the longest substring without repeating characters.", difficulty: "Medium", topic: "Hash Tables", topics: ["Hash Tables", "Strings", "Sliding Window"], likes: 20100, solvedCount: 34500, acceptanceRate: 44.8, companies: ["Amazon", "Google", "Meta", "Microsoft", "Netflix"], timeLimit: 18 },
  { id: "lru-cache", title: "LRU Cache", description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.", difficulty: "Medium", topic: "Hash Tables", topics: ["Hash Tables", "Linked Lists", "Design"], likes: 14300, solvedCount: 18400, acceptanceRate: 38.5, companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Netflix"], timeLimit: 20 },
  { id: "course-schedule", title: "Course Schedule", description: "There are a total of numCourses courses you have to take. Determine if it's possible to finish all courses.", difficulty: "Medium", topic: "Graphs", topics: ["Graphs", "Topological Sort", "DFS", "BFS"], likes: 9800, solvedCount: 12500, acceptanceRate: 46.2, companies: ["Amazon", "Google", "Meta", "Microsoft", "Uber"], timeLimit: 20 },
  { id: "invert-binary-tree", title: "Invert Binary Tree", description: "Given the root of a binary tree, invert the tree and return its root.", difficulty: "Easy", topic: "Trees", topics: ["Trees", "Recursion"], likes: 8900, solvedCount: 21500, acceptanceRate: 71.5, companies: ["Amazon", "Google", "Meta", "Microsoft"], timeLimit: 8 },
  { id: "validate-bst", title: "Validate Binary Search Tree", description: "Given the root of a binary tree, determine if it is a valid BST.", difficulty: "Medium", topic: "BST", topics: ["BST", "Trees", "DFS"], likes: 11200, solvedCount: 16800, acceptanceRate: 31.2, companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"], timeLimit: 18 },
  { id: "word-ladder", title: "Word Ladder", description: "Given two words and a dictionary, find the length of the shortest transformation sequence.", difficulty: "Hard", topic: "Graphs", topics: ["Graphs", "BFS", "Strings"], likes: 7600, solvedCount: 7200, acceptanceRate: 35.8, companies: ["Amazon", "Google", "Meta", "Microsoft", "Netflix"], timeLimit: 25 },
  { id: "trapping-rain-water", title: "Trapping Rain Water", description: "Given n non-negative integers representing an elevation map, compute how much water it can trap.", difficulty: "Hard", topic: "Arrays", topics: ["Arrays", "Two Pointers", "Dynamic Programming", "Stack"], likes: 18700, solvedCount: 14200, acceptanceRate: 35.6, companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Uber"], timeLimit: 22 },
  { id: "n-queens", title: "N-Queens", description: "Place n queens on an n x n chessboard such that no two queens attack each other.", difficulty: "Hard", topic: "Backtracking", topics: ["Backtracking", "Recursion"], likes: 6500, solvedCount: 5800, acceptanceRate: 42.3, companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"], timeLimit: 25 },
];

export const ROADMAPS: Roadmap[] = [
  { id: "beginner", title: "DSA Fundamentals", description: "Start your DSA journey with core data structures and basic algorithms.", level: "Beginner → Intermediate", topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Hash Tables", "Sorting", "Searching", "Recursion"], practiceCount: 80, projects: ["Calculator App", "Todo List Manager", "Phone Directory System"], timeline: "8-10 weeks", color: "emerald", gradient: "from-emerald-500/20 to-green-500/10", icon: "🌱" },
  { id: "intermediate", title: "DSA Mastery", description: "Master trees, graphs, and medium-difficulty algorithm patterns.", level: "Intermediate → Advanced", topics: ["Trees", "BST", "Heap", "Trie", "Greedy", "Backtracking", "Bit Manipulation", "Mathematics"], practiceCount: 150, projects: ["File System Simulator", "Web Crawler", "Spell Checker", "Navigation System"], timeline: "12-16 weeks", color: "blue", gradient: "from-blue-500/20 to-indigo-500/10", icon: "🔥" },
  { id: "advanced", title: "Advanced DSA & Competitive", description: "Master advanced algorithms and competitive coding techniques.", level: "Advanced → Expert", topics: ["Dynamic Programming", "Graph Algorithms", "String Algorithms", "Segment Tree", "Fenwick Tree", "Disjoint Set", "Computational Geometry"], practiceCount: 200, projects: ["Competitive Programming Bot", "Algorithm Visualizer", "Code Analyzer"], timeline: "16-24 weeks", color: "purple", gradient: "from-purple-500/20 to-pink-500/10", icon: "🚀" },
  { id: "interview", title: "FAANG Interview Prep", description: "Targeted preparation for top tech company interviews.", level: "Interview Ready", topics: ["Trees", "Graphs", "Dynamic Programming", "Stacks", "Hash Tables", "Arrays", "Strings", "Backtracking"], practiceCount: 250, projects: ["Design YouTube", "Design URL Shortener", "Design WhatsApp"], timeline: "8-12 weeks", color: "rose", gradient: "from-rose-500/20 to-red-500/10", icon: "💼" },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-challenge", title: "First Steps", description: "Solve your first DSA challenge", icon: "🎯", condition: "Solve 1 problem", unlocked: true, unlockedAt: "2 weeks ago", color: "from-blue-500 to-cyan-500" },
  { id: "problems-100", title: "Triple Digits", description: "Solve 100 problems", icon: "💯", condition: "Solve 100 problems", unlocked: false, color: "from-emerald-500 to-teal-500" },
  { id: "points-1000", title: "Points Machine", description: "Earn 1000 points", icon: "⭐", condition: "Earn 1000 points", unlocked: true, unlockedAt: "5 days ago", color: "from-purple-500 to-pink-500" },
  { id: "top-10", title: "Top Contender", description: "Reach top 10 on the leaderboard", icon: "🏆", condition: "Top 10 rank", unlocked: false, color: "from-amber-500 to-orange-500" },
  { id: "interview-ready", title: "Interview Ready", description: "Complete the interview preparation roadmap", icon: "💼", condition: "Complete Interview Roadmap", unlocked: false, color: "from-red-500 to-rose-500" },
  { id: "dsa-master", title: "DSA Master", description: "Master all DSA topics", icon: "👑", condition: "Complete all topics", unlocked: false, color: "from-violet-500 to-indigo-500" },
];

export const ROOMS: Room[] = [
  { id: "r1", name: "Binary Search Blitz", topic: "Binary Search", difficulty: "Easy", participants: 8, maxParticipants: 12, timeRemaining: "12:30", status: "Active", language: "Python", host: "Alex", isPrivate: false },
  { id: "r2", name: "DP Battle Royale", topic: "Dynamic Programming", difficulty: "Hard", participants: 6, maxParticipants: 8, timeRemaining: "18:45", status: "Active", language: "C++", host: "Sarah", isPrivate: false },
  { id: "r3", name: "Graph Theory Challenge", topic: "Graphs", difficulty: "Medium", participants: 10, maxParticipants: 10, timeRemaining: "05:20", status: "Active", language: "Java", host: "Mike", isPrivate: false },
  { id: "r4", name: "Tree Traversal Tournament", topic: "Trees", difficulty: "Easy", participants: 4, maxParticipants: 10, timeRemaining: "25:00", status: "Active", language: "JavaScript", host: "Emma", isPrivate: false },
  { id: "r5", name: "Tree Mastery", topic: "Trees", difficulty: "Medium", participants: 0, maxParticipants: 6, timeRemaining: "30:00", status: "Upcoming", language: "Go", host: "David", isPrivate: false },
  { id: "r6", name: "Sorting Showdown", topic: "Sorting", difficulty: "Expert", participants: 0, maxParticipants: 8, timeRemaining: "45:00", status: "Upcoming", language: "Rust", host: "Priya", isPrivate: false },
  { id: "r7", name: "Hash Table Hackathon", topic: "Hash Tables", difficulty: "Medium", participants: 12, maxParticipants: 12, timeRemaining: "00:00", status: "Ended", language: "Python", host: "John", isPrivate: false },
  { id: "r8", name: "Linked List League", topic: "Linked Lists", difficulty: "Easy", participants: 8, maxParticipants: 10, timeRemaining: "00:00", status: "Ended", language: "C", host: "Lisa", isPrivate: false },
];

export const RANKING_USERS: RankingUser[] = [
  { id: "u1", username: "algoMaster42", displayName: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", points: 9850, rank: 1, tier: "Legend", wins: 48, totalMatches: 62, streak: 28, country: "USA", college: "MIT" },
  { id: "u2", username: "codeNinja", displayName: "Sarah Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", points: 8720, rank: 2, tier: "Grandmaster", wins: 42, totalMatches: 55, streak: 21, country: "UK", college: "Cambridge" },
  { id: "u3", username: "dsaPro", displayName: "Priya Sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", points: 7650, rank: 3, tier: "Grandmaster", wins: 38, totalMatches: 50, streak: 15, country: "India", college: "IIT Bombay" },
  { id: "u4", username: "byteBender", displayName: "Mike Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", points: 6540, rank: 4, tier: "Master", wins: 32, totalMatches: 48, streak: 12, country: "USA", college: "Stanford" },
  { id: "u5", username: "logicLover", displayName: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", points: 5890, rank: 5, tier: "Master", wins: 28, totalMatches: 40, streak: 10, country: "Canada", college: "UBC" },
  { id: "u6", username: "recursionKing", displayName: "David Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", points: 5210, rank: 6, tier: "Diamond", wins: 25, totalMatches: 38, streak: 8, country: "South Korea", college: "KAIST" },
  { id: "u7", username: "treeWalker", displayName: "Lisa Thompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", points: 4780, rank: 7, tier: "Diamond", wins: 22, totalMatches: 35, streak: 6, country: "Australia", college: "UNSW" },
  { id: "u8", username: "graphGuru", displayName: "James Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", points: 4320, rank: 8, tier: "Platinum", wins: 20, totalMatches: 32, streak: 5, country: "Germany", college: "TU Munich" },
  { id: "u9", username: "sortMaster", displayName: "Ana Garcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", points: 3950, rank: 9, tier: "Platinum", wins: 18, totalMatches: 30, streak: 4, country: "Spain", college: "UPC Barcelona" },
  { id: "u10", username: "hashHero", displayName: "Tom Nguyen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", points: 3580, rank: 10, tier: "Gold", wins: 15, totalMatches: 28, streak: 3, country: "Vietnam", college: "HUST" },
  { id: "u11", username: "dpDynamo", displayName: "Rachel Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel", points: 3210, rank: 11, tier: "Gold", wins: 14, totalMatches: 26, streak: 2, country: "Singapore", college: "NUS" },
  { id: "u12", username: "stackStorm", displayName: "Chris Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris", points: 2850, rank: 12, tier: "Gold", wins: 12, totalMatches: 24, streak: 2, country: "India", college: "IIT Delhi" },
  { id: "u13", username: "queueQueen", displayName: "Maya Tanaka", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya", points: 2540, rank: 13, tier: "Silver", wins: 10, totalMatches: 22, streak: 1, country: "Japan", college: "Tokyo U" },
  { id: "u14", username: "startupCoder", displayName: "Sai Kiran", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sai", points: 2840, rank: 14, tier: "Silver", wins: 12, totalMatches: 38, streak: 7, country: "India", college: "VIT" },
  { id: "u15", username: "beginnerDev", displayName: "Ryan O'Brien", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan", points: 1250, rank: 15, tier: "Bronze", wins: 5, totalMatches: 15, streak: 0, country: "Ireland", college: "Trinity College" },
];

export const ALL_LANGUAGES = [
  { id: "c", name: "C" as const, extension: ".c", monaco: "c" },
  { id: "cpp", name: "C++" as const, extension: ".cpp", monaco: "cpp" },
  { id: "java", name: "Java" as const, extension: ".java", monaco: "java" },
  { id: "python", name: "Python" as const, extension: ".py", monaco: "python" },
  { id: "javascript", name: "JavaScript" as const, extension: ".js", monaco: "javascript" },
  { id: "typescript", name: "TypeScript" as const, extension: ".ts", monaco: "typescript" },
  { id: "go", name: "Go" as const, extension: ".go", monaco: "go" },
  { id: "rust", name: "Rust" as const, extension: ".rs", monaco: "rust" },
  { id: "csharp", name: "C#" as const, extension: ".cs", monaco: "csharp" },
  { id: "kotlin", name: "Kotlin" as const, extension: ".kt", monaco: "kotlin" },
];

export const TIER_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Bronze: { bg: "bg-amber-900/30", text: "text-amber-600", border: "border-amber-700/30", gradient: "from-amber-700 to-amber-500" },
  Silver: { bg: "bg-gray-300/10", text: "text-gray-300", border: "border-gray-400/20", gradient: "from-gray-400 to-gray-300" },
  Gold: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20", gradient: "from-yellow-500 to-amber-400" },
  Platinum: { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/20", gradient: "from-cyan-400 to-blue-400" },
  Diamond: { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-500/20", gradient: "from-blue-400 to-indigo-500" },
  Master: { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/20", gradient: "from-purple-500 to-pink-500" },
  Grandmaster: { bg: "bg-red-500/10", text: "text-red-300", border: "border-red-500/20", gradient: "from-red-500 to-orange-500" },
  Legend: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/20", gradient: "from-amber-400 to-yellow-400" },
};
