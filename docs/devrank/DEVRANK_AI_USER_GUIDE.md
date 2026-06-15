# DevRank AI — User Guide

## Getting Started

### 1. Visit the Hub
Navigate to `/devrank` to see the main DevRank AI dashboard with:
- Global statistics
- Top 3 developers
- College rankings chart
- Quick links to all modules

### 2. View Rankings
Go to `/devrank/global` to explore the full leaderboard:
- Use **Period Tabs** to switch between Daily → All-Time views
- **Search** for developers by name or username
- **Filter** by country and programming language
- Click **Filters** button to expand advanced options

### 3. Explore Developer Profiles
Click on any developer card or visit `/devrank/developers` to browse all profiles. Each profile (`/devrank/profile/[username]`) shows:
- Full GitHub statistics (commits, PRs, stars, followers)
- Language distribution with colored bars
- Tech stack badges
- Activity charts (repository growth, contribution heatmap)
- AI-powered insights
- Similar developers

### 4. Check College Rankings
Visit `/devrank/colleges` to see:
- Interactive bar chart of top colleges
- Search and country filters
- Sort by score, growth, or student count
- Detailed stats per college (placement readiness, innovation score, community impact)

### 5. Browse Communities
Visit `/devrank/communities` to explore developer communities:
- Filter by type (GDSC, MLSA, AWS, GDG, etc.)
- Member counts, projects, events
- Growth percentage and top members

### 6. View Organization Analytics
Visit `/devrank/organizations` to see:
- Organization stats (members, repos, stars, contributors)
- Top repositories and languages
- Growth rate tracking

### 7. Hackathon Rankings
Visit `/devrank/hackathons` to browse:
- Filter by type (Online, In-Person, Hybrid)
- Winner and top teams spotlight
- Participant and project counts

### 8. Earn Badges
Visit `/devrank/badges` to see all 10 achievement badges:
- Filter by category
- Track unlocked vs locked badges
- View unlock conditions
- Generate shareable SVG badges

### 9. Analytics Dashboard
Visit `/devrank/analytics` for deep GitHub analytics:
- Productivity, Influence, Community, Innovation scores
- Repository growth chart
- Language distribution
- Weekly activity heatmap
- Key metrics grid
- Developer comparison tool

### 10. AI Insights
Visit `/devrank/insights` for personalized AI-powered analysis:
- Overall, strengths, and improvement scores
- Filter by insight type
- Detailed cards with confidence scores
- Career roadmap generation

## Badge Generator

Generate shareable SVG badges using these URL patterns:
- `/devrank/badge/[username].svg` — Personal rank badge
- `/devrank/badge/open-source.svg` — Open Source Champion badge
- `/devrank/badge/community.svg` — Community Leader badge

## Ranking Formula

Your DevRank score is calculated as:
```
Commits (×1.5) + Merged PRs (×3.0) + Issues Closed (×1.0) +
Repos Maintained (×2.5) + Stars (×0.5) + Followers (×0.3) +
Hackathon Points (×2.0) + Community Points (×1.5) +
Learning Achievements (×1.0)
```

## Tiers
| Tier | Score | Visual |
|------|-------|--------|
| Bronze | 0–999 | Amber |
| Silver | 1,000–2,999 | Gray |
| Gold | 3,000–4,999 | Yellow |
| Platinum | 5,000–6,999 | Cyan |
| Diamond | 7,000–8,999 | Blue |
| Elite | 9,000+ | Purple-Pink |
