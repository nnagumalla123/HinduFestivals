import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Scaffold defaults `cacheComponents` and `partialPrefetching` were removed on
  // purpose: they are experimental caching/prefetching modes we don't need yet.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
