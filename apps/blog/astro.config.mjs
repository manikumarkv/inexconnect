// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

/**
 * Blog app — deployed on its own Vercel project (origin blog.inexconnect.com)
 * and served publicly at inexconnect.com/blog via the website's rewrites
 * (plan Phase 3). `site` therefore carries the public /blog base so canonical
 * URLs, RSS, and the sitemap all point at the public address, never the origin.
 * The Keystatic admin is NOT proxied: it stays on the origin hostname.
 */
export default defineConfig({
  site: "https://inexconnect.com/blog",
  adapter: vercel(),
  integrations: [react(), keystatic(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
