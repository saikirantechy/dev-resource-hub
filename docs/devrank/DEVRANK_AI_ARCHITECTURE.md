# DevRank AI — Architecture Document

## System Architecture

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with glassmorphism design system
- **Animations**: Framer Motion for transitions and animations
- **Icons**: Lucide React icon set
- **Design System**: Matches Dev Resource Hub's existing dark-themed glassmorphism UI

### Route Structure
```
/devrank                          → Hub page (hero, stats, quick links)
/devrank/global                   → Global leaderboard with filters
/devrank/developers               → Developer search & directory
/devrank/colleges                 → College rankings
/devrank/communities              → Community rankings
/devrank/organizations            → Organization analytics
/devrank/hackathons               → Hackathon rankings
/devrank/badges                   → Achievement badge system
/devrank/analytics                → Analytics dashboard
/devrank/insights                 → AI-powered insights
/devrank/profile/[username]       → Developer profile page
```

### Components
| Component | Purpose |
|-----------|---------|
| DevRankCard | Leaderboard card with rank, avatar, stats, tier, score |
| DevRankBadge | Achievement badge card with unlock/lock states |
| DevRankProfile | Full developer profile with stats, languages, badges |
| DevRankChart | Reusable bar chart with animations |

### Data Layer
- `lib/devrank/types.ts` — All TypeScript interfaces
- `lib/devrank/data.ts` — Static data with 12 developers, 10 colleges, 8 communities, 6 organizations, 5 hackathons, 10 badges, 8 insights

### Scoring Formula
```
Developer Score =
  (Commits × 1.5)
  + (Merged PRs × 3.0)
  + (Issues Closed × 1.0)
  + (Repos Maintained × 2.5)
  + (Stars Earned × 0.5)
  + (Followers × 0.3)
  + (Hackathon Points × 2.0)
  + (Community Points × 1.5)
  + (Learning Achievements × 1.0)
```

### Tier Thresholds
| Tier | Score Range | Color |
|------|------------|-------|
| Bronze | 0 – 999 | Amber |
| Silver | 1,000 – 2,999 | Gray |
| Gold | 3,000 – 4,999 | Yellow |
| Platinum | 5,000 – 6,999 | Cyan |
| Diamond | 7,000 – 8,999 | Blue |
| Elite | 9,000+ | Purple-Pink |

### Performance Considerations
- Static data for instant rendering
- Client-side filtering/search (no API calls needed for MVP)
- Framer Motion animations use `will-change` hints via CSS
- Charts are lightweight SVG-based
