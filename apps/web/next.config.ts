import type { NextConfig } from "next";

/**
 * The blog (apps/blog) is served publicly at inexconnect.com/blog via these
 * rewrites (plan Phase 3). The blog app is built with base "/blog", so its
 * routes live under /blog on its own origin too; the rewrite proxies
 * /blog/* here to /blog/* on the blog Worker. The origin is internal only —
 * the public address is always inexconnect.com/blog. BLOG_ORIGIN can
 * override the default (the blog Worker's workers.dev origin).
 */
const blogOrigin =
  process.env.BLOG_ORIGIN ?? "https://inexconnect-blog.inexconnect.workers.dev";

const nextConfig: NextConfig = {
  transpilePackages: ["@inexconnect/brand", "@inexconnect/ui"],
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/blog", destination: `${blogOrigin}/blog` },
        { source: "/blog/:path*", destination: `${blogOrigin}/blog/:path*` },
      ],
    };
  },
};

export default nextConfig;
