import type { NextConfig } from "next";

// Build tĩnh cho GitHub Pages: STATIC_EXPORT=1 PAGES_BASE_PATH=/bunbun-website npm run build
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        basePath: process.env.PAGES_BASE_PATH ?? "",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
