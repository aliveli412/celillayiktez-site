import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.celillayiktez.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "celillayiktez.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
