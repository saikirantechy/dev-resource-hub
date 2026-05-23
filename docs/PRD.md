# Dev Resource Hub — Product Requirements Document

Version 1.0 · Last updated 2026-05-23

---

## 1. Project Overview

### 1.1 What is Dev Resource Hub?

Dev Resource Hub is an open-source web platform that consolidates the
fragmented AI developer ecosystem into a single, navigable surface. It
catalogs AI coding tools, agent frameworks, prompts, workflows, model
pricing, and community projects, and layers interactive utilities
(prompt optimizer, token + cost calculator, side-by-side comparison) on
top of that catalog.

The platform is built and deployed as a static Next.js site so it stays
fast, free to host, and trivially forkable.

### 1.2 Platform Vision

> The operating system for AI developers.

A single hub where any engineer building with LLMs can:
- discover the right tool, model, or agent for a job,
- compare options side-by-side with real capability and pricing data,
- experiment with prompts and measure their token + dollar cost,
- and learn from the community's shipped projects.

### 1.3 Mission

Reduce decision fatigue and token waste for AI developers by aggregating
authoritative information and pairing it with hands-on utilities — all
open-source and free.

### 1.4 Ecosystem Concept

Three concentric layers:

| Layer | What it does | Surfaces |
|---|---|---|
| **Catalog** | Curated lists of tools, agents, prompts, blogs, projects | `/tools`, `/ai-agents`, `/prompts`, `/blogs`, `/showcase` |
| **Workbench** | Interactive utilities that operate on prompts and stacks | `/prompt-optimizer`, `/token-calculator`, `/compare`, `/workflow` |
| **Community** | Contributors, submissions, learning paths, dashboard | `/community`, `/submit`, `/learning`, `/dashboard` |

The Workbench is the differentiator — most directories stop at the
Catalog layer.

---

## 2. Core Features

### 2.1 Page Inventory

| Route | Purpose |
|---|---|
| `/` | Marketing home + platform overview |
| `/dashboard` | Personalized hub: greeting, stats, AI assistant, quick actions, trending tools, activity feed, agents, analytics, community showcase |
| `/prompt-optimizer` | Strip filler / verbose phrases from prompts, preserve placeholders + code, score quality, project token savings |
| `/token-calculator` | Live token + dollar projection across 10 frontier models (GPT-4o, Claude 4.7, Gemini 2.5, Llama 3.1, DeepSeek V3, Mistral, etc.) |
| `/compare` | Side-by-side comparison of 9 AI coding tools (Cursor, Windsurf, Devin, Copilot, Claude, Replit, Warp, v0, Lovable) across 12 capabilities |
| `/ai-agents` | Catalog of autonomous AI agents and frameworks |
| `/tools` | Catalog of AI-powered developer tools |
| `/prompts` | Searchable prompt library with copy-to-clipboard |
| `/marketplace` | Browse + discover prompts, tools, agents |
| `/trending` | Live ranking of resources by stars + views |
| `/showcase` | Community-built projects gallery |
| `/blogs` + `/blog/[slug]` | Editorial articles |
| `/ai-finder` | Question-answered recommendation engine |
| `/learning` | Learning paths and resources |
| `/beginner-guide` | Onboarding path for new AI devs |
| `/workflow` | Visual AI workflow builder (canvas-based) |
| `/webagentcore` | Featured project showcase |
| `/community` | Discord, contributors, Hall of Fame |
| `/contributors` + `/contributors/[username]` | Contributor profiles + leaderboard |
| `/category/[slug]` | Category browse view |
| `/docs` | Roadmap, contribution guide |
| `/submit` | Submit a new tool / resource |
| `/saved` | User-saved bookmarks (auth) |
| `/login` | Supabase auth |

### 2.2 AI Workbench Features

**Prompt Optimizer** (`/prompt-optimizer`)
- 6 modes: Concise, Technical, Structured, Enterprise, Minimal, Agent-Friendly
- Placeholder + code-block preservation (`{{var}}`, `<var>`, triple-backtick blocks)
- Live token estimation
- Verbosity / redundancy / ambiguity / formatting diagnostics
- 0–100 optimization score with warnings + recommendations
- Side-by-side compare view (before vs after)
- Animated before/after live demo carousel

**Token Calculator** (`/token-calculator`)
- 10 model definitions with per-model chars-per-token ratios
- Input + estimated output token counting
- Per-call cost and projected cost at 1, 100, 1k, 10k, 1M call volumes
- Sortable by cost, tokens, or context-window utilization
- Cheapest / most-expensive callout strip
- Context-window fill bar per model

**Compare** (`/compare`)
- Pick up to 4 tools; full capability matrix (12 capabilities)
- Performance profile (speed, accuracy, autonomy, ecosystem, learning) as animated bars
- Pricing tiers per tool
- Pros/cons split panel
- Live search + category + tier filtering
- Default selection populated on first load so the comparison panel is never empty

**Dashboard** (`/dashboard`)
- Personalized greeting from Supabase auth metadata
- 4-stat hero with delta indicators
- Quick Actions panel (6 shortcuts)
- AI Assistant chat sidebar (rule-based mock; replaceable with API later)
- Trending tools row (6 cards with stars + delta + models)
- AI Widgets row (cross-links to Optimizer / Calculator / Compare / Workflow)
- Activity Feed (launches, repos, prompts, news)
- Agents Panel (Planner, Architect, QA, Security, DevOps with status)
- Analytics: SVG line chart (14-day usage) + bar chart (category breakdown)
- Community Showcase (3 featured projects)

### 2.3 Catalog Features

- Search across all categories via Fuse.js (`/prompts`, `/tools`)
- Copy-to-clipboard buttons on every prompt
- Category filtering
- Tag-based discovery
- Trending scoring (stars × 0.4 + views × 0.4 + recency × 0.2)
- Bookmarks via Supabase auth + `BookmarkContext`

---

## 3. Technical Architecture

### 3.1 Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, lucide-react icons |
| Animation | Framer Motion 12 |
| Search | Fuse.js |
| Auth + DB | Supabase (`@supabase/supabase-js`) |
| Build | Static export (`output: "export"`) |
| Hosting | GitHub Pages |
| CI | GitHub Actions (`.github/workflows/deploy.yml`) |
| Lang | TypeScript 5 |

### 3.2 Folder Structure

```
dev-resource-hub/
├── app/                     # App Router routes
│   ├── (root)/              # Public marketing + utilities
│   ├── ai-agents/, tools/, prompts/, …
│   ├── dashboard/           # Main authenticated hub
│   ├── prompt-optimizer/    # Optimizer workbench
│   ├── token-calculator/    # Cost calculator
│   ├── layout.tsx           # Root layout: fonts, metadata, providers
│   ├── sitemap.ts           # Auto-generated /sitemap.xml
│   ├── robots.ts            # Auto-generated /robots.txt
│   └── page.tsx             # Marketing home
├── components/              # Reusable + page-scoped components
│   ├── Navbar.tsx, Footer.tsx, NewsletterForm.tsx, …
│   ├── compare/             # /compare components
│   ├── promptoptimizer/     # /prompt-optimizer components
│   ├── tokencalc/           # /token-calculator components
│   ├── dashboard/           # /dashboard components
│   └── webagentcore/
├── context/                 # React contexts (Auth, Bookmark)
├── data/                    # Static JSON catalogs (tools, prompts, blogs, …)
├── lib/                     # Pure logic + Supabase client
│   ├── promptOptimizer.ts   # Optimizer engine
│   ├── tokenCalc.ts         # Model definitions + cost math
│   ├── compareTools.ts      # 9-tool comparison data
│   ├── dashboardData.ts     # Dashboard mock data
│   └── supabase.ts
├── hooks/                   # Custom React hooks
├── docs/                    # PRD, roadmap, contribution guide
└── .github/workflows/       # CI/CD
```

### 3.3 Routing Conventions

- App Router with `page.tsx` per route segment
- Client islands in `XxxClient.tsx` files; server wrappers in `page.tsx`
  (used for routes that mix metadata with interactivity, e.g., `/compare`)
- Dynamic routes use `generateStaticParams` to pre-render at build time
  for static export compatibility: `/blog/[slug]`, `/prompts/[id]`,
  `/category/[slug]`, `/contributors/[username]`
- `dynamic = "force-static"` on `sitemap.ts` + `robots.ts` (required by
  `output: "export"`)

### 3.4 Deployment

| Concern | Setup |
|---|---|
| Output | `next build` → static HTML in `out/` |
| Base path | `/dev-resource-hub` |
| Asset prefix | `/dev-resource-hub/` |
| Trailing slash | enabled |
| Images | `unoptimized: true` (required for static export) |
| Workflow trigger | push to `main` |
| Artifact | `actions/upload-pages-artifact@v3` |
| Deploy action | `actions/deploy-pages@v4` |
| Live URL | `https://saikirantechy.github.io/dev-resource-hub/` |

### 3.5 State Management

- Auth state: `AuthContext` (Supabase session)
- Bookmarks: `BookmarkContext`
- Per-page state: local `useState` / `useReducer`
- No global store (Redux/Zustand) — page-local state has been sufficient

---

## 4. UI / UX Design System

### 4.1 Color Tokens

CSS custom properties in `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `--background` | `#050508` | Page background |
| `--foreground` | `#ffffff` | Primary text |
| `--accent-blue` | `#3b82f6` | CTA, link, brand |
| `--accent-purple` | `#8b5cf6` | Hover, gradient stop |
| `--accent-emerald` | `#10b981` | Success, optimization, savings |
| `--accent-orange` | `#f97316` | Prompt-optimizer brand, warnings |
| `--accent-pink` | `#ec4899` | Highlight, danger |

Per-feature accent palettes:

| Feature | Gradient |
|---|---|
| Prompt Optimizer | `from-orange-500 via-pink-500 to-cyan-500` |
| Token Calculator | `from-emerald-400 via-blue-500 to-purple-500` |
| Compare | `from-cyan-500 via-purple-500 to-pink-500` |
| Dashboard | `from-emerald-400 via-cyan-400 to-purple-400` |

### 4.2 Typography

- Sans: Inter (300–900) — loaded via `<link>` in `app/layout.tsx`
- Mono: JetBrains Mono — loaded via `<link>` in `app/layout.tsx`
- Geist Sans + Geist Mono — loaded via `next/font/google` (variables exposed)
- Default body font is Inter
- Tabular numerics (`tabular-nums`) on all counters / stats

### 4.3 Components

| Class | Effect |
|---|---|
| `.glass` | `bg-white/3 backdrop-blur-xl` glass card |
| `.glass-strong` | `bg-white/6 backdrop-blur-2xl` strong glass |
| `.glass-dark` | Dark glass for sticky navbar |
| `.gradient-mesh` | Fixed radial gradient backdrop |
| `.gradient-text-hero` | Hero h1 gradient |
| `.gradient-text-prompt`, `.gradient-text-calc`, `.gradient-text-stack`, `.gradient-text-dash` | Per-feature gradient text |
| `.btn-primary`, `.btn-secondary` | Primary/secondary buttons |
| `.badge`, `.badge-blue/purple/emerald/orange` | Pill badges |
| `.card-hover` | Lift + glow on hover |

### 4.4 Animation Conventions

- Hero orbs: `scale` + `opacity` loops, 10–14s, infinite
- Particles: 10–14 dot field with staggered fade + drift
- Stat counters: `requestAnimationFrame` lerp on first viewport entry
- Charts: `pathLength` 0→1 on SVG path; `width` 0→target on bars
- Card hover: `translateY(-4px)` + shadow ramp, 300ms cubic-bezier

### 4.5 Spacing System

Tailwind's default scale plus a few utilities:
- Section vertical padding: `py-20` / `py-24` / `py-32`
- Horizontal: `px-4 sm:px-6`
- Page max width: `max-w-7xl mx-auto`
- Card radius: `rounded-2xl` (inputs), `rounded-3xl` (panels), `rounded-[2.5rem]` (hero CTAs)

---

## 5. Future Roadmap

### Phase 2 — Q3 2026 (Current)

- [x] Prompt Optimizer
- [x] Multi-model Token & Cost Calculator
- [x] AI Stack Compare (9 tools, 12 capabilities)
- [x] Dashboard with AI Assistant panel
- [x] Sitemap + robots auto-generation
- [ ] Wire new pages into Navbar
- [ ] Build `/playground` (prompt testing across models)
- [ ] OpenGraph image (`/public/og-image.png`)

### Phase 3 — Q4 2026

- Real LLM-powered AI Assistant (replacing rule-based mock)
- Prompt Marketplace with rating + remix
- Agent Marketplace (Planner, Architect, QA, Security, DevOps)
- Workflow Builder v2 (LangGraph-style canvas)
- User profiles + portfolio
- API tokens for integration

### Phase 4 — 2027

- SaaS tier (Pro features: history, versioning, team workspaces)
- Authenticated API: `POST /api/optimize`, `POST /api/calculate`
- Webhooks (Discord/Slack) on tool launches
- Browser extension: optimize prompt in any text field
- VS Code extension: token + cost preview inline

### Phase 5 — Long term

- Multi-language UI (i18n)
- Mobile native (React Native)
- Embeddable widgets (`<iframe>` token calculator)
- Federated dataset (community-curated, signed catalog entries)

---

## 6. SEO Strategy

### 6.1 Technical SEO (in place)

- ✅ Static export → fast, crawlable HTML
- ✅ Semantic HTML headings
- ✅ Per-page metadata via Next.js metadata API (`/compare` has dedicated metadata)
- ✅ OG + Twitter card metadata in root layout
- ✅ Auto-generated `sitemap.xml` covering all 23 static routes
- ✅ Auto-generated `robots.txt` disallowing `/login` and `/saved`
- ✅ Canonical URL via `openGraph.url`
- ⚠️ `og-image.png` is referenced but not yet present in `/public`

### 6.2 Content SEO Targets

Long-tail queries we should rank for:

| Query | Page |
|---|---|
| "openai token counter" | /token-calculator |
| "claude cost calculator" | /token-calculator |
| "cursor vs windsurf" | /compare |
| "best ai coding assistant" | /compare |
| "ai prompt optimizer" | /prompt-optimizer |
| "claude code vs cursor" | /compare |
| "deepseek pricing" | /token-calculator |
| "ai workflow builder" | /workflow |

### 6.3 Editorial SEO

- Publish a comparison post per quarter on `/blog`
- Cross-link from blog to comparison / calculator pages
- Encourage backlinks via "official" tool comparison citations

---

## 7. GitHub Growth Strategy

### 7.1 Repo positioning

- README leads with the screenshot of `/dashboard`
- Top of README: "open-source operating system for AI developers"
- Topics: `ai`, `developer-tools`, `prompt-engineering`, `nextjs`,
  `claude`, `gpt`, `cursor`, `windsurf`, `ai-agents`
- License: MIT (already in `LICENSE`)

### 7.2 Contribution velocity

- Issue templates exist (`.github/ISSUE_TEMPLATE`)
- PR template exists (`.github/pull_request_template.md`)
- Add `good first issue` labels for:
  - Adding new tool to `/data/tools.json`
  - Adding new prompt to `/data/prompts.json`
  - Adding a translation
- Monthly "AI tool of the month" community PR sprint

### 7.3 Awesome-X strategy

- Cross-link from `awesome-ai-coding-tools` style repos
- Submit Dev Resource Hub to:
  - `awesome-cursor`, `awesome-llm`, `awesome-ai-agents`
  - Product Hunt under "Developer Tools"

---

## 8. Community Strategy

- Discord server linked from `/community`
- Contributor leaderboard `/contributors`
- Monthly showcase highlighting community projects on `/showcase`
- Newsletter (`NewsletterForm` component) — needs backend wired up
- Submit-a-tool flow (`/submit`)
- Hall of Fame for top contributors

---

## 9. Monetization Ideas

The platform is open-source and stays free. Sustainable revenue paths
that don't compromise that:

| Path | Notes |
|---|---|
| **Pro tier** | $12/mo for prompt history, versioning, team workspaces, API tokens. Free tier remains fully functional. |
| **API access** | Pay-per-call for hosted optimization, token estimation, comparison data. |
| **Sponsored listings** | Tools can pay to be highlighted with a "Sponsored" badge — must stay visually distinct from organic. |
| **Affiliate** | Honest affiliate links to paid tools (Cursor, Copilot, etc.) — only after manual review. |
| **Enterprise SLA** | On-prem deployment for orgs that want a private internal catalog. |
| **Workshops** | Paid live workshops on prompt engineering, cost optimization, AI workflows. |
| **Job board** | Future: AI engineer / prompt engineer job board on `/community`. |

Anti-patterns to avoid:
- Paywalling existing free utilities
- Hiding tool reviews behind paid tiers
- Selling user data
- Hard-paywall popups

---

## 10. Scaling Vision

### 10.1 Technical scaling

- Current static export scales for free up to ~10M views/month on GH Pages
- If traffic outgrows GH Pages → Cloudflare Pages / Vercel (same build, different host)
- Catalog data already split per-JSON file (`data/*.json`) — natural sharding
- Supabase scales auth + bookmarks horizontally without code changes

### 10.2 Content scaling

- Move static JSON catalogs to a Supabase table when the catalog grows
  beyond ~500 items per category (faster contributor flow, no PR friction)
- Add a moderation queue when community submissions hit > 5/day

### 10.3 Product scaling

The end-state is a three-product platform:

1. **Catalog** (current) — directory of tools, agents, prompts
2. **Workbench** (in progress) — optimizer, calculator, compare, workflow
3. **Marketplace** (future) — paid prompts, agents, tools with creator payouts

Once all three exist, Dev Resource Hub competes head-on with
PromptBase, There's an AI for That, and Product Hunt's AI category —
but as the only one that is *also* open-source and a true workbench.

---

*This PRD is a living document. Open a PR against `docs/PRD.md` to
propose changes.*
