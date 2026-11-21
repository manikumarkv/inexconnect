---
name: inexconnect-mcp
description: Build, host and publish an iNexConnect MCP server on Cloudflare Workers under mcp.inexconnect.com. Use when creating, deploying or listing a new MCP for the iNexConnect marketplace.
---

# iNexConnect MCP servers

How we build and ship MCP servers for the iNexConnect marketplace. Keep it short; add a rule here whenever we learn something new.

## Hosting
- Host on **Cloudflare Workers** (account: inexconnect@gmail.com). One Worker per MCP for now.
- Build **stateless** servers (Streamable HTTP, no Durable Object session). Check Cloudflare's current MCP docs before starting; the old `McpAgent` class may be deprecated.
- Free plan limits: **100,000 requests/day shared across the whole account** (website + blog + all MCPs) and **10 ms CPU per request**. Keep tools light: look up, call an API, return. No heavy processing in the Worker.
- Move to the **$5/month Workers Paid** plan once paying customers arrive.

## Domain and URL
- Every MCP lives at `https://mcp.inexconnect.com/<name>`. Lowercase, one word or kebab-case (e.g. `trueicon`, `image-right`).
- In the Worker: **Settings → Domains & Routes → Add route** → `mcp.inexconnect.com/<name>/*`.
- The server must answer under its own path prefix (`/<name>/...`).
- Later: a single gateway Worker on `mcp.inexconnect.com` will check API keys and forward to each MCP. Customer URLs must not change.

## New MCP checklist
1. Name it and pick the path `mcp.inexconnect.com/<name>`.
2. Build stateless; keep each tool well under 10 ms CPU.
3. Deploy the Worker and add the route.
4. Test with MCP Inspector against the live URL.
5. List it on the website: add an entry in `apps/web/content/mcps.ts` so it shows on `/mcps`, then PR to `main` and promote `main` → `release/1`.
6. Public contact for MCP support: `hello@inexconnect.com`.

## Lessons learned
- (add here as we go)
