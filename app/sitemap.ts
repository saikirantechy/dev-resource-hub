import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://saikirantechy.github.io/dev-resource-hub";

const STATIC_PATHS = [
  "",
  "/dashboard",
  "/ai-agents",
  "/agents",
  "/ai-finder",
  "/beginner-guide",
  "/blogs",
  "/community",
  "/compare",
  "/contributors",
  "/docs",
  "/learning",
  "/login",
  "/marketplace",
  "/prompt-optimizer",
  "/prompt-to-prd",
  "/prompts",
  "/saved",
  "/showcase",
  "/submit",
  "/token-calculator",
  "/tools",
  "/trending",
  "/webagentcore",
  "/workflow",
  // New Platform Modules
  "/benchmarks",
  "/map",
  "/architecture",
  "/tasks",
  "/agent-hooks",
  "/automation",
  "/errors",
  "/git-assistant",
  "/context",
  "/vibe-to-production",
  "/roadmap",
  "/careers",
  "/perks",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_PATHS.map((p) => ({
    url: `${BASE}${p}/`,
    lastModified: now,
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1.0 : p === "/dashboard" ? 0.9 : 0.7,
  }));
}
