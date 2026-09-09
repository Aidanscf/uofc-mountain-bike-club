import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    tsconfigPath: process.env.NETLIFY ? "tsconfig.netlify.json" : "tsconfig.json",
  },
};

export default nextConfig;
