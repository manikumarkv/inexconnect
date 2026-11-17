# iNexConnect

The iNexConnect website and blog — one monorepo, two apps, one shared brand.

| Part              | App               | Stack                                                  |
| ----------------- | ----------------- | ------------------------------------------------------ |
| Marketing website | `apps/web`        | Next.js (App Router), TypeScript, Tailwind v4          |
| Blog              | `apps/blog`       | Astro, TypeScript, Tailwind v4, Keystatic (local mode) |
| Brand             | `packages/brand`  | Locked design tokens, Tailwind theme CSS, logo assets  |
| Shared spec       | `packages/ui`     | Site constants, navigation, Tawk.to chat spec          |
| Shared config     | `packages/config` | TypeScript configs                                     |

Architecture and phased plan: see the project plan document maintained with
the business files (Next.js + Keystatic architecture plan). In short: the blog
deploys on its own (origin `blog.inexconnect.com`, where the Keystatic admin
lives) and is served publicly at `inexconnect.com/blog` through the website's
rewrites once `BLOG_ORIGIN` is set (Phase 3 — not wired yet).

## Develop

```bash
npm exec --yes pnpm@12.21.0 install   # or: pnpm install, if pnpm is installed
npm exec --yes pnpm@12.21.0 dev       # both apps via Turborepo
npm exec --yes pnpm@12.21.0 build     # production builds for both apps
npm exec --yes pnpm@12.21.0 typecheck
npm exec --yes pnpm@12.21.0 lint
```

- Website: http://localhost:3000
- Blog: http://localhost:4321 — Keystatic admin at http://localhost:4321/keystatic
  (local mode: edits write files under `apps/blog/src/content/`)

## Environment

Copy each app's `.env.example` to `.env.local` and fill in what you need.
Nothing works by secret: with no env set, both apps still build and run —
the `/blog` rewrites stay off and the Tawk.to chat widget simply does not load.

- `apps/web`: `BLOG_ORIGIN`, `NEXT_PUBLIC_TAWK_PROPERTY_ID`, `NEXT_PUBLIC_TAWK_WIDGET_ID`
- `apps/blog`: `PUBLIC_TAWK_PROPERTY_ID`, `PUBLIC_TAWK_WIDGET_ID`
  (Keystatic GitHub-mode variables arrive at the launch phase — see the blog's
  `.env.example`. Secrets are never committed.)

## Status

- Website: built to match the approved homepage mockup (all routes).
- Blog: **structure only** — content model, Keystatic config, index/post/tag
  routes, RSS, sitemap. No posts yet; first content comes later.
- Not deployed. Nothing goes public without an explicit launch go-ahead.
