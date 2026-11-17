# Deploying iNexConnect (Cloudflare Workers)

Two Workers, both built from this GitHub repo (Workers Builds).
The current adapters target Workers, not Pages: OpenNext (web) and the
Astro Cloudflare adapter (blog) both emit a Worker bundle.

Branch model:

- **`release/1`** → production
- **`main`** → dev

Set each Worker's production branch to `release/1` under
Settings → Builds → Branch control after creating it.

## Worker: inexconnect-web (apps/web, Next.js + OpenNext)

| Setting | Value |
|---|---|
| Build command | `pnpm --filter @inexconnect/web run build:cf` |
| Deploy command | `npx wrangler deploy --config apps/web/wrangler.jsonc` |
| Production branch | `release/1` |

## Worker: inexconnect-blog (apps/blog, Astro + Keystatic)

| Setting | Value |
|---|---|
| Build command | `pnpm --filter @inexconnect/blog run build` |
| Deploy command | `npx wrangler deploy --config apps/blog/dist/server/wrangler.json` |
| Production branch | `release/1` |

## Notes

- URLs are `<worker-name>.<account-subdomain>.workers.dev` once the
  account's workers.dev subdomain is registered.
- The blog's Keystatic admin runs in local mode; on Cloudflare it cannot
  save edits (no filesystem). GitHub mode comes at launch.
- Custom domains (inexconnect.com, blog.inexconnect.com) attach later —
  DNS currently lives at Vercel and moves to Cloudflare in that step.
