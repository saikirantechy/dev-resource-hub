import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/saved"],
      },
    ],
    sitemap: "https://saikirantechy.github.io/dev-resource-hub/sitemap.xml",
    host: "https://saikirantechy.github.io/dev-resource-hub",
  };
}
