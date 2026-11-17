import type { NextConfig } from "next";

/**
 * The blog (apps/blog) is served under /blog via rewrites once it is deployed
 * (plan Phase 3). Set BLOG_ORIGIN to the blog deployment's origin
 * (production: https://blog.inexconnect.com). Unset = no rewrites yet.
 */
const blogOrigin = process.env.BLOG_ORIGIN;

const nextConfig: NextConfig = {
  transpilePackages: ["@inexconnect/brand", "@inexconnect/ui"],
  async rewrites() {
    if (!blogOrigin) return [];
    return {
      beforeFiles: [
        { source: "/blog", destination: `${blogOrigin}/` },
        { source: "/blog/:path*", destination: `${blogOrigin}/:path*` },
      ],
    };
  },
};

export default nextConfig;
