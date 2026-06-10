# 🚀 Dev Resource Hub — The Open AI Developer Universe

> 🌍 **Dev Resource Hub** is a high-performance, community-driven AI Developer Ecosystem. Explore agents, prompts, tools, workflows, and comparisons in a unified glassmorphism interface.

<p align="center">
  <a href="https://saikirantechy.github.io/dev-resource-hub/">
    <img src="https://img.shields.io/badge/%F0%9F%8C%90_Live_Platform-Visit_Now-0A66C2?style=for-the-badge" alt="Live Platform" />
  </a>
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" alt="Build Status" />
  <a href="https://github.com/saikirantechy/dev-resource-hub/stargazers">
    <img src="https://img.shields.io/github/stars/saikirantechy/dev-resource-hub?style=for-the-badge&color=yellow" alt="GitHub stars" />
  </a>
  <a href="https://github.com/saikirantechy/dev-resource-hub/network/members">
    <img src="https://img.shields.io/github/forks/saikirantechy/dev-resource-hub?style=for-the-badge" alt="GitHub forks" />
  </a>
  <a href="https://github.com/saikirantechy/dev-resource-hub/issues">
    <img src="https://img.shields.io/github/issues/saikirantechy/dev-resource-hub?style=for-the-badge" alt="GitHub issues" />
  </a>
  <a href="https://github.com/saikirantechy/dev-resource-hub/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/saikirantechy/dev-resource-hub?style=for-the-badge&color=blue" alt="License" />
  </a>
  <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge" alt="Contributions Welcome" />
</p>

---

## 📖 Table of Contents
- [✨ About the Platform](#-about-the-platform)
- [💡 Why We Built This](#-why-we-built-this)
- [🚀 Key Routes & Features](#-key-routes--features)
- [🏗 Platform Architecture](#-platform-architecture)
- [🛠 Tech Stack](#-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [🤝 Contributing](#-contributing)
- [🌍 Community](#-community)
- [🌟 Roadmap](#-roadmap)
- [🌌 Vision](#-vision)
- [❤️ Contributors](#%EF%B8%8F-contributors)

---

## ✨ About the Platform

The **AI Developer Ecosystem Platform** is a production-grade resource hub designed for the modern AI era. It's more than just a list of links — it's a curated marketplace, interactive workbench, and discovery engine for:

- 🤖 **AI Agents** — Devin, Manus, CrewAI, LangGraph, and more autonomous & coding agents
- ⌨️ **AI Tooling** — Cursor, Windsurf, v0, Copilot, and the complete AI developer toolbox
- 📝 **Prompt Marketplace** — Battle-tested developer prompts with copy-to-clipboard and ratings
- 📊 **Comparisons** — Side-by-side technical breakdowns of AI coding tools across 12 capabilities
- 🔥 **Trending Hub** — Live podium-style rankings of the most starred and viewed resources
- 🔧 **AI Workbench** — Prompt optimizer, token cost calculator, and visual workflow builder
- 🚀 **Community Showcase** — Hall of Fame featuring projects built by the community

---

## 💡 Why We Built This

The AI ecosystem is growing rapidly, but discovering high-quality tools, prompts, agents, and developer workflows remains fragmented. **Dev Resource Hub** was created to unify:

- AI discovery & developer tooling in a single platform
- Interactive workbench utilities (optimizer, calculator, workflow builder)
- Community contributions & open-source collaboration
- Startup innovation through an open ecosystem

Our goal is to become the **operating system for AI developers** — reducing decision fatigue and token waste by aggregating authoritative information and pairing it with hands-on utilities.

---

## 🚀 Key Routes & Features

### Main Modules

| Feature | Route | Description |
| :--- | :--- | :--- |
| **Dashboard** | `/dashboard` | Personalized hub with stats, AI assistant, quick actions, trending tools, activity feed, analytics, and community showcase |
| **AI Agents** | `/ai-agents` | Explore autonomous and coding agents with technical stack labels, GitHub stats, and pricing |
| **Tools Hub** | `/tools` | The definitive directory of AI IDEs, UI builders, frameworks, and open-source tools |
| **Prompt Library** | `/prompts` | Curated marketplace for system and developer prompts with copy, filtering, and difficulty ratings |
| **Compare** | `/compare` | Side-by-side feature comparisons across 9 AI coding tools and 12 capabilities |
| **Trending** | `/trending` | Live podium-style rankings with trending scores, most starred, and most viewed resources |
| **Marketplace** | `/marketplace` | Unified portal for discovering prompts, tools, and agents with featured listings |
| **Showcase** | `/showcase` | Hall of Fame featuring community-built AI projects with tech stack details |
| **Blog** | `/blogs` | Editorial articles covering Cursor vs Windsurf, agent frameworks, prompt engineering, and more |
| **Community** | `/community` | Discord, GitHub discussions, contributor leaderboard, and Hall of Fame |
| **AI Finder** | `/ai-finder` | Question-answered recommendation engine that suggests tools based on your persona |

### AI Workbench

| Feature | Route | Description |
| :--- | :--- | :--- |
| **Prompt Optimizer** | `/prompt-optimizer` | 6 optimization modes, placeholder preservation, token estimation, quality scoring, and before/after comparison |
| **Token Calculator** | `/token-calculator` | Live token + dollar projection across 10 frontier models with sortable results and cost projections |
| **Workflow Builder** | `/workflow` | Visual canvas-based AI workflow builder with drag-and-drop nodes, connections, and execution simulation |
| **Compare** | `/compare` | Multi-tool capability matrix with performance profiles, pricing tiers, and pros/cons panels |

### Additional Pages

| Feature | Route | Description |
| :--- | :--- | :--- |
| **Beginner Guide** | `/beginner-guide` | Step-by-step onboarding path for new AI developers |
| **Learning** | `/learning` | Curated learning paths and educational resources |
| **Contributors** | `/contributors` | GitHub contributor leaderboard with rank badges and profiles |
| **Docs** | `/docs` | Technical documentation, roadmap, and tech stack overview |
| **Submit** | `/submit` | Submit a new tool, agent, or resource to the ecosystem |
| **WebAgentCore** | `/webagentcore` | Featured browser-native AI agent framework showcase |
| **Saved** | `/saved` | User-saved bookmarks (requires Supabase auth) |
| **Login** | `/login` | Supabase authentication |

---

## 🏗 Platform Architecture

```bash
dev-resource-hub/
├── app/                     # App Router routes (28+ pages)
│   ├── ai-agents/           # Autonomous & Coding Agents
│   ├── ai-finder/           # AI Stack Recommendation Engine
│   ├── beginner-guide/      # Developer Onboarding
│   ├── blog/                # Dynamic Blog Posts
│   ├── blogs/               # Blog Listing
│   ├── category/            # Category Browse Pages
│   ├── community/           # Community Hub
│   ├── compare/             # Tool Comparison
│   ├── contributors/        # Contributor Leaderboard
│   ├── dashboard/           # Personal Analytics Hub
│   ├── docs/                # Documentation & Roadmap
│   ├── leaderboard/         # Resource Rankings
│   ├── learning/            # Learning Paths
│   ├── login/               # Supabase Auth
│   ├── marketplace/         # Resource Discovery
│   ├── prompt-optimizer/    # AI Workbench
│   ├── prompts/             # Prompt Library
│   ├── saved/               # User Bookmarks
│   ├── showcase/            # Community Projects
│   ├── submit/              # Resource Submission
│   ├── token-calculator/    # AI Workbench
│   ├── tools/               # Developer Tooling Hub
│   ├── trending/            # Community Rankings
│   ├── webagentcore/        # Featured Project
│   └── workflow/            # Visual AI Workflow Builder
├── components/              # 42+ Reusable React Components
│   ├── compare/             # /compare components
│   ├── dashboard/           # /dashboard components
│   ├── promptoptimizer/     # /prompt-optimizer components
│   ├── tokencalc/           # /token-calculator components
│   ├── webagentcore/        # WebAgentCore components
│   └── workflow/            # Workflow Builder canvas & nodes
├── context/                 # React contexts (Auth, Bookmark)
├── data/                    # 14 JSON catalogs (tools, prompts, agents, blogs, etc.)
├── lib/                     # Utility modules & Supabase client
│   ├── promptOptimizer.ts   # Optimizer engine
│   ├── tokenCalc.ts         # Model definitions + cost math
│   ├── compareTools.ts      # 9-tool comparison data
│   ├── dashboardData.ts     # Dashboard mock data
│   ├── blog.ts              # Blog content loader
│   └── workflow/            # Workflow state store & engine
├── hooks/                   # Custom React hooks
├── docs/                    # PRD, roadmap, contribution guide
└── .github/workflows/       # CI/CD (GitHub Pages deploy)
```

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.2 (Turbopack, App Router) |
| **UI** | React 19, Tailwind CSS v4 |
| **Design System** | Glassmorphism (CSS custom properties, backdrop-blur) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion 12 |
| **Search** | Fuse.js (fuzzy search across all catalogs) |
| **Flow Canvas** | @xyflow/react (React Flow v12) |
| **Charts** | SVG pathLength animations, Framer Motion |
| **Fonts** | Inter, JetBrains Mono, Geist |
| **Auth/DB** | Supabase (configured, OAuth ready) |
| **State** | Zustand (workflow builder), React Context (auth, bookmarks) |
| **Build** | Static export (`output: "export"`) |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions |
| **Language** | TypeScript 5 (strict mode) |

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/saikirantechy/dev-resource-hub.git
cd dev-resource-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```

Open [http://localhost:3000/dev-resource-hub](http://localhost:3000/dev-resource-hub) to see the result.

### 4. Build & Lint
```bash
npm run build       # Production build (56 static routes)
npm run lint        # ESLint check
```

---

## 🧪 Feature Highlights

### 🎛️ Prompt Optimizer (`/prompt-optimizer`)
6 modes (Concise, Technical, Structured, Enterprise, Minimal, Agent-Friendly) with placeholder preservation, live token estimation, verbosity diagnostics, 0–100 quality scoring, and animated before/after comparison.

### 💰 Token Calculator (`/token-calculator`)
10 model definitions (GPT-4o, Claude 4.7, Gemini 2.5, Llama 3.1, DeepSeek V3, Mistral, etc.) with chars-per-token ratios, per-call cost, projected cost at 1–1M call volumes, and context-window fill bars.

### 🔄 AI Workflow Builder (`/workflow`)
Visual drag-and-drop canvas for designing AI agent workflows. Add nodes (agents, tools, triggers), connect them visually, and simulate execution with animated connection lines and real-time log output.

### 📊 Dashboard (`/dashboard`)
Personalized hub with 4-stat hero, quick actions panel, AI Assistant chat sidebar, trending tools row, analytics SVG charts (14-day usage + category breakdown), agents panel with status indicators, and community showcase.

### ⚔️ Compare (`/compare`)
Pick up to 4 tools; full capability matrix across 12 dimensions with animated performance bars, pricing tiers, and pros/cons split panel.

---

## 🤝 Contributing

We are building the ultimate AI developer ecosystem, and we need your help! Whether it's adding a new resource, fixing a bug, or improving the UI, all contributions are welcome.

### 🔥 Ways to Contribute
* 🤖 Add AI agents & developer tools to `data/`
* 📝 Share powerful prompts to `data/prompts.json`
* 🎨 Improve UI/UX & animations
* ⚡ Optimize performance and accessibility
* 🐛 Report & fix bugs

### 🛠️ How to Contribute
1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m "feat: add amazing feature"`)
4. **Push** your branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request 🚀

---

## 🌍 Join the Community

* 💬 [GitHub Discussions](https://github.com/saikirantechy/dev-resource-hub/discussions)
* 🚀 [SKT Nexus Community](https://sktnexus.com)
* 📢 [WhatsApp Channel](https://whatsapp.com/channel/0029Va9W8X6LCoWp9J0m2S3j)
* 🧠 AI Builders Network

Together we're building the future of AI development.

---

## 🌟 Roadmap

### ✅ Phase 1 — Foundation
- [x] Core Architecture & Route Expansion
- [x] 28+ static routes, glassmorphism design system

### ✅ Phase 2 — Universal Search & Discovery
- [x] Universal Search (Fuse.js) & Dynamic Blogs
- [x] AI Stack Finder (Recommendation Engine)
- [x] Bookmark System
- [x] Sitemap + robots auto-generation
- [x] Prompt Optimizer, Token Calculator, Compare Tool

### ✅ Phase 3 — Community & Dashboard
- [x] User Auth (Supabase) & Backend Migration
- [x] Dashboard with AI Assistant panel
- [x] Contributor leaderboard UI
- [x] Community showcase

### ✅ Phase 4 — Workbench & Scale
- [x] Visual AI Workflow Builder (drag-and-drop canvas)
- [x] AI Agent ecosystem (8 agents with full cards)
- [x] Semantic AI Search infrastructure
- [x] API marketplace integration
- [x] GitHub trending automation

### 🔮 Phase 5 — Platform Evolution
- [ ] Real LLM-powered AI Assistant (replacing rule-based mock)
- [ ] Prompt Marketplace with rating + remix
- [ ] Agent Marketplace (Planner, Architect, QA, Security, DevOps)
- [ ] Workflow Builder v2 (LangGraph-style canvas)
- [ ] SaaS tier (Pro features: history, versioning, team workspaces)

---

## 🌌 Vision

Our long-term goal is to evolve **Dev Resource Hub** into:
* The "GitHub" for AI resources
* A discovery engine for AI developers
* An open ecosystem for AI builders
* A community-powered innovation platform
* The definitive operating system for AI developers

---

## ❤️ Contributors

Thanks to the amazing developers building the future of the AI ecosystem!

<a href="https://github.com/saikirantechy/dev-resource-hub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=saikirantechy/dev-resource-hub" alt="Contributors" />
</a>

---

## 🔥 Maintained By

### Sai Kiran BK (SKT)
🚀 Founder @ **SKT Nexus**  
💡 Building developer communities & open-source AI platforms.

[GitHub](https://github.com/saikirantechy) | [LinkedIn](https://linkedin.com/in/saikirantechy) | [Twitter](https://twitter.com/saikirantechy)
