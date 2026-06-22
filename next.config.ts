import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  basePath: process.env.NEXT_PUBLIC_APP_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_APP_BASE_PATH,
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
  }
};

export default nextConfig;