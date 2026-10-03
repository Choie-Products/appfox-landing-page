import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Browsers and favicon crawlers still ask for /favicon.ico; serve the PNG fox mark there.
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
};

export default nextConfig;
