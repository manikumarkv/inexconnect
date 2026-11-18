import { SITE } from "@inexconnect/ui";
import { mcpServers } from "@/content/mcps";
import { builds, services } from "@/content/site";

/** https://llmstxt.org — a map of the site for LLMs. */
export function GET() {
  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.name} is a software studio run by Yamini Perla (iNexConnect LLC, Texas, USA). Tagline: ${SITE.tagline}. Contact: ${SITE.email}. Every engagement starts with a free discovery call, followed by a written quote before any work begins.`,
    "",
    "## Services",
    "",
    ...services.map(
      (s) => `- [${s.title}](${SITE.url}/services/${s.slug}): ${s.short} ${s.description}`,
    ),
    "",
    "## Open-source & in-house builds",
    "",
    "These are our own projects, published in the open — not client engagements.",
    "",
    ...builds.map((b) => `- [${b.name}](${b.href}): ${b.description}`),
    "",
    "## MCP servers we publish",
    "",
    "Open-source MCP (Model Context Protocol) servers by iNexConnect, listed at https://inexconnect.com/mcps with tools, example calls, and per-client install steps.",
    "",
    ...mcpServers.map(
      (m) =>
        `- [${m.name}](${SITE.url}/mcps/${m.slug}): ${m.tagline} Status: ${m.statusLabel}. Tools: ${m.tools.map((t) => t.name).join(", ")}. Code: ${m.github}${m.npmPackage ? `. Install: npx -y ${m.npmPackage} (stdio MCP server, Node.js 20+)` : ""}`,
    ),
    "",
    "## Key pages",
    "",
    `- [About](${SITE.url}/about)`,
    `- [Request a Quote](${SITE.url}/request-a-quote)`,
    `- [Book a Discovery Call](${SITE.url}/book)`,
    `- [Blog](${SITE.blogUrl}): notes on AI tools, MCP servers, and building software — index at ${SITE.blogUrl}/llms.txt, full text at ${SITE.blogUrl}/llms-full.txt`,
    "",
    "## Optional",
    "",
    `- [Sitemap](${SITE.url}/sitemap.xml)`,
    `- [Blog sitemap](${SITE.blogUrl}/sitemap-index.xml)`,
    `- [Blog RSS](${SITE.blogUrl}/rss.xml)`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
