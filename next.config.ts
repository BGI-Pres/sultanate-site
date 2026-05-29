import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      { source: "/news", destination: "/press", permanent: true },
      { source: "/news/:id", destination: "/press", permanent: true },
    ];
  },
};

export default nextConfig;
