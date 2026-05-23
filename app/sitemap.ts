import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://saikirantechy.github.io/dev-resource-hub";

const STATIC_PATHS = [
  "",
  "/dashboard",
  "/ai-agents",
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
  "/prompts",
  "/saved",
  "/showcase",
  "/submit",
  "/token-calculator",
  "/tools",
  "/trending",
  "/webagentcore",
  "/workflow",
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
