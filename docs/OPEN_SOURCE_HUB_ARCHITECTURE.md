# Open Source Opportunities Hub — Architecture

## Routes Structure

```
/open-source                    → Landing page (enhanced)
/opportunities                  → Aggregated discovery hub
/issues                         → GitHub Issues Explorer
/repositories                   → Repository Explorer
/gsoc                           → GSoC Hub
/outreachy                      → Outreachy Hub
/hacktoberfest                  → Hacktoberfest Hub
/bounties                       → Open Source Bounties
/maintainers                    → Maintainer Dashboard
/my-contributions               → Contributor Profile
/ai-contribution-coach          → AI Contribution Coach
/leaderboard                    → Global Leaderboard
/contributors                   → Contributors page
```

## Component Tree

```
components/
  open-source/
    OpportunityCard.tsx    → Reusable card for displaying opportunities
    ProgramCard.tsx        → Card for GSoC/Outreachy/Hacktoberfest programs
    StatCard.tsx           → Animated stat display card
```

## Data Layer

```
data/
  open-source-opportunities.json  → Curated open-source tools & resources
  programs.json                   → GSoC, Outreachy, Hacktoberfest data
  leaderboard.json                → Leaderboard user data
```

## API Integration (lib/github.ts)

```
searchIssues()       → GitHub Issue search API
searchRepos()        → GitHub Repository search API
getTrendingRepos()   → Trending repos from last 7 days
getGoodFirstIssues() → Good first issue search
```

## Design System

- **Framework:** Next.js 16 with static export (output: export)
- **Styling:** Tailwind CSS v4 with CSS variables
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Dark Theme:** Glassmorphism, neon accents, smooth animations
- **Components:** ShadCN-inspired patterns

## Data Flow

1. Static data files → Imported directly by pages
2. GitHub API → Search endpoints called client-side
3. AI features → Placeholder/simulated responses (Phase 2)
4. State management → React useState for filters, URL params for sharing
