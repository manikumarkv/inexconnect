# Deploying iNexConnect (Cloudflare Pages)

Two Pages projects, both connected to this GitHub repo. Branch model:

- **`release/1`** → production deployment
- **`main`** → dev (branch preview) deployment
- Any other branch → its own preview deployment

## Project: inexconnect-web (apps/web, Next.js + OpenNext)

| Setting | Value |
|---|---|
| Production branch | `release/1` |
| Root directory | *(repo root — leave blank)* |
| Build command | `pnpm --filter @inexconnect/web run build:cf` |
| Build output directory | `apps/web/.open-next` |
| Environment variable | `NODE_VERSION` = `24` |

## Project: inexconnect-blog (apps/blog, Astro + Keystatic)

| Setting | Value |
|---|---|
| Production branch | `release/1` |
| Root directory | *(repo root — leave blank)* |
| Build command | `pnpm --filter @inexconnect/blog run build` |
| Build output directory | `apps/blog/dist` |
| Environment variable | `NODE_VERSION` = `24` |

## Notes

- Pushes deploy automatically: `release/1` to production, everything else
  to a preview URL (`<branch>.<project>.pages.dev`).
- The blog's Keystatic admin runs in local mode; on Cloudflare it cannot
  save edits (no filesystem). GitHub mode comes at launch.
- Custom domains (inexconnect.com, blog.inexconnect.com) attach later —
  DNS currently lives at Vercel and moves to Cloudflare in that step.
