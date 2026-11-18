import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { builds } from "@/content/site";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Open-source and in-house builds from iNexConnect — DevRunway, Gnanodayam, TrueIcon MCP, and ImageRight MCP. Our own projects, not client engagements.",
};

export default function BuildsPage() {
  return (
    <>
      <section className="bg-charcoal text-white">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">Open-source & in-house builds</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight">
            Built by us, in the open
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
            These are projects we designed and built ourselves — not client engagements. We show
            them because they demonstrate, in public, the same craft and tooling we would bring to
            your project.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {builds.map((build) => (
            <article key={build.name} className="card flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
                {build.tag}
              </p>
              <h2 className="mt-2 text-2xl font-bold">{build.name}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-slate">{build.description}</p>
              {build.mcpSlug && (
                <Link
                  href={`/mcps/${build.mcpSlug}`}
                  className="mt-5 font-semibold text-coral underline decoration-coral decoration-2 underline-offset-4 hover:text-charcoal"
                >
                  Try it & add it →
                </Link>
              )}
              <a
                href={build.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
              >
                Visit {build.displayUrl} →
              </a>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="leading-relaxed text-slate">Want something like this for your business?</p>
          <Link href="/request-a-quote" className="btn-primary mt-5">
            Request a Quote
          </Link>
        </div>
      </Section>
    </>
  );
}
