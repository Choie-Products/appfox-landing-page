import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/admin", destination: "https://app.appfox.app/admin", permanent: true },
      { source: "/admin/:path*", destination: "https://app.appfox.app/admin/:path*", permanent: true },
    ];
  },
  async rewrites() {
    // Browsers and favicon crawlers still ask for /favicon.ico; serve the PNG fox mark there.
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
};

export default nextConfig;
