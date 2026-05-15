import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Commented out to support Supabase SSR & Middleware
  // basePath: "/dev-resource-hub", // Remove if moving to custom domain/Vercel
  // assetPrefix: "/dev-resource-hub/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
