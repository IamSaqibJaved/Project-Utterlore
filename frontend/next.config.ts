import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from specific domains (for CMS-managed content)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // Allow any domain as fallback (less secure but flexible for CMS)
    unoptimized: false,
  },
};

export default nextConfig;
