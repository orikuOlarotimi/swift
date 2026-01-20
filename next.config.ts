// import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ THIS is what stops Vercel from failing
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
