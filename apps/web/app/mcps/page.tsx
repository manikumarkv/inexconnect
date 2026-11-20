import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { mcpServers } from "@/content/mcps";

export const metadata: Metadata = {
  alternates: { canonical: "/mcps" },
  title: "MCP Servers",
  description:
    "Open-source MCP servers built by iNexConnect — TrueIcon (icon search for AI coding assistants) and ImageRight MCP (version-aware ImageRight access). See what they do, try example calls, and add them to your AI tool.",
};

export default function McpsPage() {
  return (
    <>
      <section className="bg-charcoal text-white">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">Open-source MCP servers</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight">
            Our MCP servers, ready to plug into your AI tool
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
            MCP (Model Context Protocol) is the standard way AI tools like Claude, ChatGPT, and
            Cursor connect to outside software. These are servers we built and published ourselves
            — open them up, see exactly what they do, and add one to your AI tool in minutes.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {mcpServers.map((mcp) => (
            <article key={mcp.slug} className="card flex flex-col">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${
                    mcp.status === "live"
                      ? "bg-coral/10 text-coral"
                      : "bg-charcoal/5 text-slate"
                  }`}
                >
                  {mcp.statusLabel}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate">
                  {mcp.transport === "stdio" ? "Local · stdio" : "Hosted · remote"}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold">{mcp.name}</h2>
              <p className="mt-1 font-medium text-charcoal/80">{mcp.tagline}</p>
              <p className="mt-3 flex-1 leading-relaxed text-slate">
                {mcp.description.split(". ")[0]}.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link href={`/mcps/${mcp.slug}`} className="btn-primary !px-5 !py-2.5 text-sm">
                  {mcp.status === "live" ? "Try it & add it" : "See what it does"}
                </Link>
                <a
                  href={mcp.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                >
                  GitHub →
                </a>
                {mcp.npmPackage && (
                  <a
                    href={`https://www.npmjs.com/package/${mcp.npmPackage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                  >
                    npm →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[20px] bg-mist p-8 text-center">
          <h2 className="text-xl font-extrabold">Want an MCP server for your own software?</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate">
            Building MCP servers is one of our services — we connect your systems to today's AI
            tools, safely and on your terms.
          </p>
          <Link href="/services/ai-tooling" className="btn-primary mt-5">
            See the service
          </Link>
        </div>
      </Section>
    </>
  );
}
