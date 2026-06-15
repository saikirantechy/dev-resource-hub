# DSA Arena — Architecture

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS, framer-motion, lucide-react
- **Build**: Static export (GitHub Pages)

## Directory Structure

```
lib/dsa/
├── types.ts       — All TypeScript types
├── data.ts        — Static data (topics, challenges, rooms, users, etc.)

components/dsa/
├── DSACodeEditor.tsx      — Live code editor with test cases
├── DSATutorChat.tsx       — AI Tutor interactive chat
├── DSAExaminerChat.tsx    — AI Examiner "Dave" assessment
├── DSARoomCard.tsx        — Room listing card
├── DSAChallengeCard.tsx   — Challenge problem card
├── DSATopicCard.tsx       — Topic card with progress
├── DSARankingCard.tsx     — Ranking tier card
├── DSAAchievementCard.tsx — Achievement card with lock/unlock

app/dsa/
├── page.tsx               — Main hub (mode selection)
├── tutor/page.tsx         — AI Tutor mode
├── assessment/page.tsx    — Assessment mode
├── arena/page.tsx         — Room arena + code editor
├── leaderboard/page.tsx   — Leaderboard
├── roadmaps/page.tsx      — Learning paths
├── topics/page.tsx        — Topic browser
├── challenges/page.tsx    — Challenge list
├── rankings/page.tsx      — Rankings

docs/dsa/
├── DSA_ARENA_ARCHITECTURE.md
├── DSA_ARENA_DATABASE.md
├── DSA_ARENA_USER_GUIDE.md
├── DSA_ARENA_ROADMAP.md
```

## Component Tree

```
DSAPage (hub)
├── Mode Selection Cards (Tutor / Assessment)
├── Quick Links Grid
├── AI Agents Section
├── Achievements Section
└── Interview Companies Section

DSATutorPage
└── DSATutorChat
    ├── Quick Actions
    ├── Message List
    └── Input Area

DSAAssessmentPage
└── DSAExaminerChat
    ├── Intro Screen
    ├── Question Flow (MCQ/Coding/Optimization)
    └── Results Summary

DSAArenaPage
├── Join/Create Room Panel
├── Public Rooms List (DSARoomCard[])
└── DSACodeEditor
    ├── Language Selector
    ├── Code Textarea
    ├── Test Cases
    └── Output Panel
```

## Data Flow
- All data is currently static (JSON/database-ready structure)
- Types are centralized in `lib/dsa/types.ts`
- Data is centralized in `lib/dsa/data.ts`
- Components receive data via props
- State management uses React useState/useMemo (client components)
