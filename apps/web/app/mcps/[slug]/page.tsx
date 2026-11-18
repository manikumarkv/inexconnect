import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyBlock from "@/components/CopyBlock";
import { Section } from "@/components/Section";
import { mcpServers } from "@/content/mcps";

export function generateStaticParams() {
  return mcpServers.map((mcp) => ({ slug: mcp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mcp = mcpServers.find((m) => m.slug === slug);
  if (!mcp) return {};
  return { title: mcp.name, description: mcp.tagline };
}

export default async function McpDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mcp = mcpServers.find((m) => m.slug === slug);
  if (!mcp) notFound();

  const others = mcpServers.filter((m) => m.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: mcp.name,
    description: mcp.tagline,
    url: `https://inexconnect.com/mcps/${mcp.slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    author: { "@id": "https://inexconnect.com/#organization" },
    ...(mcp.status === "live"
      ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-charcoal text-white">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">MCP Server</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight">{mcp.name}</h1>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${
                mcp.status === "live" ? "bg-coral text-white" : "bg-white/15 text-white/85"
              }`}
            >
              {mcp.statusLabel}
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{mcp.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href={mcp.github} target="_blank" rel="noreferrer" className="btn-primary">
              View on GitHub
            </a>
            {mcp.npmPackage && (
              <a
                href={`https://www.npmjs.com/package/${mcp.npmPackage}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-light"
              >
                View on npm
              </a>
            )}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-charcoal/85">{mcp.description}</p>
            <h2 className="mt-10 text-2xl font-extrabold">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {mcp.points.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-slate">
                  <span className="font-bold text-coral">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-[20px] bg-mist p-7">
            <h2 className="font-bold">Our other MCP servers</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/mcps/${other.slug}`}
                    className="font-medium text-charcoal/80 hover:text-coral"
                  >
                    {other.name} →
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/mcps" className="font-medium text-charcoal/80 hover:text-coral">
                  All MCP servers →
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="mist">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-extrabold">What it can do — the tools</h2>
          <p className="mt-3 leading-relaxed text-slate">
            These are the tools your AI assistant gets when this server is connected. It picks the
            right one on its own — you just ask in plain words.
          </p>
          <div className="mt-6 space-y-4">
            {mcp.tools.map((tool) => (
              <div key={tool.name} className="rounded-[20px] bg-white p-6">
                <h3 className="font-mono text-[1.05rem] font-bold text-charcoal">{tool.name}</h3>
                <p className="mt-2 leading-relaxed text-slate">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {mcp.examples.length > 0 && (
        <Section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold">Try it — real example calls</h2>
            <p className="mt-3 leading-relaxed text-slate">
              These are real calls and results, recorded from the running server. A live in-browser
              demo arrives with the hosted version; until then, install it below and ask your own
              assistant the same questions.
            </p>
            <div className="mt-6 space-y-8">
              {mcp.examples.map((example) => (
                <div key={example.title}>
                  <h3 className="font-bold">{example.title}</h3>
                  <div className="mt-3">
                    <CopyBlock label="Tool call" text={example.call} />
                  </div>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-mist p-4 text-[0.83rem] leading-relaxed text-charcoal/85">
                    <code>{example.result}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {mcp.clients.length > 0 ? (
        <Section tone={mcp.examples.length > 0 ? "mist" : "white"}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold">Add it to your AI tool</h2>
            <p className="mt-3 leading-relaxed text-slate">
              Pick your tool and follow its steps — each takes about a minute. A hosted version is
              also in the works: when it ships, this page gains connect-by-URL steps for tools like
              Claude and ChatGPT on the web.
            </p>
            <div className="mt-8 space-y-10">
              {mcp.clients.map((client) => (
                <div key={client.name}>
                  <h3 className="text-lg font-extrabold">{client.name}</h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-slate">
                    {client.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  {client.code && (
                    <div className="mt-4">
                      <CopyBlock label={client.code.label} text={client.code.text} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : (
        <Section>
          <div className="max-w-3xl rounded-[20px] bg-mist p-8">
            <h2 className="text-2xl font-extrabold">In development — follow along</h2>
            <p className="mt-3 leading-relaxed text-slate">
              This server is being built in the open and isn't published for general install yet.
              The code, design notes, and progress live on GitHub — and if your team runs
              ImageRight and wants early access, email{" "}
              <a
                href="mailto:inexconnect@gmail.com"
                className="font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
              >
                inexconnect@gmail.com
              </a>
              .
            </p>
            <a href={mcp.github} target="_blank" rel="noreferrer" className="btn-primary mt-5">
              Follow on GitHub
            </a>
          </div>
        </Section>
      )}
    </>
  );
}
