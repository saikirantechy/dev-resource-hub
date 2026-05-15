import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dev-resource-hub",
  assetPrefix: "/dev-resource-hub/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
