import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://saikirantechy.github.io/dev-resource-hub";

// ─── Supported locales ───
const LOCALES = ["en", "hi", "es", "fr", "ar", "zh"] as const;

// ─── Blog post slugs from content/blogs/*.md ───
const BLOG_SLUGS = [
  "ai-developer-stack-2026",
  "ai-workflow-builder-guide",
  "best-ai-coding-tools-2026",
  "best-open-source-ai-tools",
  "build-ai-agents-browser",
  "cursor-vs-windsurf-2026",
  "prompt-engineering-guide",
  "ultimate-guide-100-free-ai-coding-agents-2026",
  "vscode-multi-agent-systems",
  "welcome-to-the-hub",
] as const;

// ─── Category slugs from categories/*.md ───
const CATEGORY_SLUGS = [
  "ai-coding-agents",
  "ai-tools",
  "design-tools",
  "devops",
  "learning-resources",
  "mobile-development",
  "productivity-tools",
  "web-development",
] as const;

// ─── Prompt detail IDs from data/prompts.json ───
const PROMPT_IDS = [
  "cursor-react-component",
  "windsurf-api-route",
  "devin-fullstack-setup",
  "system-prompt-assistant",
  "code-reviewer",
  "ai-stack-builder",
  "prompt-optimizer",
  "debug-agent",
] as const;

type PageEntry = {
  path: string;
  priority?: number;
  group: string;
};

const ALL_PAGES: PageEntry[] = [
  // ════════════════════════════════════════
  //  CORE PLATFORM
  // ════════════════════════════════════════
  { path: "", priority: 1.0, group: "Core" },
  { path: "/dashboard", priority: 0.9, group: "Core" },
  { path: "/tools", group: "Core" },
  { path: "/agents", group: "Core" },
  { path: "/ai-agents", group: "Core" },
  { path: "/prompts", group: "Core" },
  { path: "/compare", group: "Core" },
  { path: "/trending", group: "Core" },
  { path: "/showcase", group: "Core" },
  { path: "/marketplace", group: "Core" },
  { path: "/learning", group: "Core" },
  { path: "/docs", group: "Core" },
  { path: "/submit", group: "Core" },

  // ════════════════════════════════════════
  //  BUILD & DESIGN
  // ════════════════════════════════════════
  { path: "/architecture", group: "Build" },
  { path: "/benchmarks", group: "Build" },
  { path: "/prompt-to-prd", group: "Build" },
  { path: "/prompt-optimizer", group: "Build" },
  { path: "/token-calculator", group: "Build" },
  { path: "/ai-finder", group: "Build" },
  { path: "/beginner-guide", group: "Build" },
  { path: "/devrank", group: "Build" },
  { path: "/dsa", group: "Build" },

  // ─── DevRank AI sub-pages ───
  { path: "/devrank/global", group: "Build" },
  { path: "/devrank/developers", group: "Build" },
  { path: "/devrank/colleges", group: "Build" },
  { path: "/devrank/communities", group: "Build" },
  { path: "/devrank/organizations", group: "Build" },
  { path: "/devrank/hackathons", group: "Build" },
  { path: "/devrank/badges", group: "Build" },
  { path: "/devrank/analytics", group: "Build" },
  { path: "/devrank/insights", group: "Build" },

  // ─── DSA Arena sub-pages ───
  { path: "/dsa/tutor", group: "Build" },
  { path: "/dsa/assessment", group: "Build" },
  { path: "/dsa/arena", group: "Build" },
  { path: "/dsa/leaderboard", group: "Build" },
  { path: "/dsa/roadmaps", group: "Build" },
  { path: "/dsa/topics", group: "Build" },
  { path: "/dsa/challenges", group: "Build" },
  { path: "/dsa/rankings", group: "Build" },

  // ════════════════════════════════════════
  //  AUTOMATE & DEBUG
  // ════════════════════════════════════════
  { path: "/tasks", group: "Automate" },
  { path: "/agent-hooks", group: "Automate" },
  { path: "/automation", group: "Automate" },
  { path: "/errors", group: "Automate" },
  { path: "/git-assistant", group: "Automate" },
  { path: "/workflow", group: "Automate" },
  { path: "/webagentcore", group: "Automate" },
  { path: "/pr-assistant", group: "Automate" },
  { path: "/ai-contribution-coach", group: "Automate" },
  { path: "/context", group: "Automate" },

  // ════════════════════════════════════════
  //  DISCOVER & EXPLORE
  // ════════════════════════════════════════
  { path: "/map", group: "Discover" },
  { path: "/blogs", group: "Discover" },
  { path: "/community", group: "Discover" },
  { path: "/events", group: "Discover" },
  { path: "/leaderboard", group: "Discover" },
  { path: "/contributors", group: "Discover" },
  { path: "/saved", group: "Discover" },
  { path: "/security-news", group: "Discover" },
  { path: "/security-center", group: "Discover" },
  { path: "/security-dashboard", group: "Discover" },

  // ─── Category pages ───
  ...CATEGORY_SLUGS.map((slug) => ({ path: `/category/${slug}`, group: "Discover" })),

  // ─── Blog detail pages ───
  ...BLOG_SLUGS.map((slug) => ({ path: `/blog/${slug}`, group: "Discover" })),

  // ─── Prompt detail pages ───
  ...PROMPT_IDS.map((id) => ({ path: `/prompts/${id}`, group: "Discover" })),

  // ════════════════════════════════════════
  //  PERSONA ROUTES
  // ════════════════════════════════════════
  { path: "/students", group: "Persona" },
  { path: "/developers", group: "Persona" },
  { path: "/founders", group: "Persona" },
  { path: "/agencies", group: "Persona" },

  // ════════════════════════════════════════
  //  AGENT HUB SUB-PAGES
  // ════════════════════════════════════════
  { path: "/agents/recommended", group: "Agents" },
  { path: "/agents/build", group: "Agents" },
  { path: "/agents/build/data", group: "Agents" },
  { path: "/agents/build/devops", group: "Agents" },
  { path: "/agents/build/research", group: "Agents" },
  { path: "/agents/build/security", group: "Agents" },

  // ════════════════════════════════════════
  //  COMMUNITY & GROWTH
  // ════════════════════════════════════════
  { path: "/roadmap", group: "Community" },
  { path: "/vibe-to-production", group: "Community" },
  { path: "/careers", group: "Community" },
  { path: "/perks", group: "Community" },
  { path: "/login", group: "Community" },
  { path: "/teach-in-dev-copilot", group: "Community" },

  // ════════════════════════════════════════
  //  OPEN SOURCE HUB
  // ════════════════════════════════════════
  { path: "/open-source", group: "OpenSource" },
  { path: "/opportunities", group: "OpenSource" },
  { path: "/issues", group: "OpenSource" },
  { path: "/repositories", group: "OpenSource" },
  { path: "/gsoc", group: "OpenSource" },
  { path: "/outreachy", group: "OpenSource" },
  { path: "/hacktoberfest", group: "OpenSource" },
  { path: "/bounties", group: "OpenSource" },
  { path: "/maintainers", group: "OpenSource" },
  { path: "/my-contributions", group: "OpenSource" },

  // ════════════════════════════════════════
  //  ADMIN PANEL
  // ════════════════════════════════════════
  { path: "/admin", group: "Admin" },
  { path: "/admin/dashboard", group: "Admin" },
  { path: "/admin/agents", group: "Admin" },
  { path: "/admin/analytics", group: "Admin" },
  { path: "/admin/blogs", group: "Admin" },
  { path: "/admin/community", group: "Admin" },
  { path: "/admin/devrank", group: "Admin" },
  { path: "/admin/docs", group: "Admin" },
  { path: "/admin/dsa", group: "Admin" },
  { path: "/admin/events", group: "Admin" },
  { path: "/admin/login", group: "Admin" },
  { path: "/admin/logs", group: "Admin" },
  { path: "/admin/marketplace", group: "Admin" },
  { path: "/admin/open-source", group: "Admin" },
  { path: "/admin/resources", group: "Admin" },
  { path: "/admin/settings", group: "Admin" },
  { path: "/admin/setup", group: "Admin" },
  { path: "/admin/tools", group: "Admin" },
  { path: "/admin/users", group: "Admin" },
  { path: "/admin/workflows", group: "Admin" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ALL_PAGES.map((entry) => {
    const isMain = entry.path === "";
    return {
      url: `${BASE}${entry.path}/`,
      lastModified: now,
      changeFrequency: isMain ? "daily" : "weekly",
      priority: entry.priority ?? 0.7,
      alternates: {
        languages: {
          "x-default": `${BASE}${entry.path}/`,
          ...Object.fromEntries(
            LOCALES.map((locale) => [
              locale,
              locale === "en"
                ? `${BASE}${entry.path}/`
                : `${BASE}/${locale}${entry.path}/`,
            ])
          ),
        },
      },
    };
  });
}
