import type { NextConfig } from "next";

// const APP_BASE_PATH = process.env.NEXT_PUBLIC_APP_BASE_PATH || "";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  // basePath: APP_BASE_PATH,
  // assetPrefix: APP_BASE_PATH,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // NEXT_PUBLIC_APP_BASE_PATH: APP_BASE_PATH
  }
};

export default nextConfig;