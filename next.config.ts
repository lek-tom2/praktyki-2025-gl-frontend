import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this block to disable build-time linting
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;