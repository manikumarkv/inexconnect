import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import { aiOfferings, builds, processSteps, services } from "@/content/site";
import { SITE } from "@inexconnect/ui";

const coreServices = services.filter((s) =>
  ["mobile-apps", "web-apps", "consulting"].includes(s.slug),
);

export default function HomePage() {
  return (
    <>
      {/* Hero — charcoal, no logo here (header carries the brand). */}
      <section className="bg-charcoal text-white">
        <div className="wrap py-20 sm:py-24">
          <p className="eyebrow">{SITE.tagline}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            We build apps and websites that move your business forward.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            iNexConnect designs and builds mobile apps, web apps, and websites. We use the latest AI
            tools in our own development — for faster delivery and higher quality — and we build AI
            into the products we ship, so your business gets the latest technology, not last
            year&apos;s.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/request-a-quote" className="btn-primary">
              Request a Quote
            </Link>
            <Link href="/book" className="btn-outline-light">
              Book a Discovery Call
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2.5 text-sm text-white/85">
            {[
              "Latest AI tools in our workflow",
              "AI built into your product",
              "Human-led quality, start to finish",
            ].map((pill) => (
              <li key={pill} className="rounded-full border border-white/25 px-4 py-1.5">
                <span className="mr-2 font-bold text-coral">✓</span>
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <Section id="services">
        <SectionHeading
          eyebrow="Services"
          title="What we can build for you"
          intro="From the first idea to a product your customers use every day — and the AI tooling that makes it smarter."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {coreServices.map((service) => (
            <article key={service.slug} className="card flex flex-col">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate">{service.short}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-5 font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
              >
                Learn more →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[20px] bg-charcoal p-8 text-white sm:p-10">
          <p className="eyebrow">New — AI services</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
            AI integration, MCP servers, skills &amp; AI agents
          </h3>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {aiOfferings.map((offering) => (
              <div key={offering.title}>
                <h4 className="text-lg font-bold text-coral">{offering.title}</h4>
                <p className="mt-2 leading-relaxed text-white/75">{offering.text}</p>
                <Link
                  href={offering.href}
                  className="mt-3 inline-block font-semibold text-white underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AI section */}
      <Section id="ai" tone="dark">
        <SectionHeading
          dark
          eyebrow="How we work"
          title="AI-assisted. Human-led."
          intro="AI is part of how we build and what we build — with people owning the decisions and the quality."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border border-white/12 bg-white/5 p-8">
            <h3 className="text-xl font-bold text-white">How we build</h3>
            <ul className="mt-4 space-y-3 leading-relaxed text-white/75">
              <li>
                <span className="mr-2 font-bold text-coral">✓</span>Latest AI tools in our
                development workflow, for faster cycles
              </li>
              <li>
                <span className="mr-2 font-bold text-coral">✓</span>AI-assisted code review and
                testing on every project
              </li>
              <li>
                <span className="mr-2 font-bold text-coral">✓</span>Human ownership of architecture,
                quality, and the final call
              </li>
            </ul>
          </div>
          <div className="rounded-[20px] border border-white/12 bg-white/5 p-8">
            <h3 className="text-xl font-bold text-white">What we build for you</h3>
            <ul className="mt-4 space-y-3 leading-relaxed text-white/75">
              <li>
                <span className="mr-2 font-bold text-coral">✓</span>AI assistants grounded in your
                own business content
              </li>
              <li>
                <span className="mr-2 font-bold text-coral">✓</span>Smart search and automation
                inside your product
              </li>
              <li>
                <span className="mr-2 font-bold text-coral">✓</span>Custom MCP servers, skills, and
                AI agents for your team
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Builds */}
      <Section id="builds" tone="mist">
        <SectionHeading
          eyebrow="Open-source & in-house builds"
          title="Built by us, in the open"
          intro="These are projects we designed and built ourselves — not client engagements. They are the best way to see how we work."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {builds.map((build) => (
            <article key={build.name} className="card flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
                {build.tag}
              </p>
              <h3 className="mt-2 text-xl font-bold">{build.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate">{build.description}</p>
              <a
                href={build.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
              >
                {build.displayUrl} →
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8">
          <Link href="/builds" className="btn-outline-dark">
            More about our builds
          </Link>
        </p>
      </Section>

      {/* Process */}
      <Section id="process">
        <SectionHeading eyebrow="Process" title="Idea · Build · Grow" />
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step) => (
            <div key={step.number} className="rounded-[20px] bg-mist p-8">
              <p className="text-4xl font-extrabold text-coral">{step.number}</p>
              <h3 className="mt-3 text-xl font-bold">{step.name}</h3>
              <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about" tone="mist">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.4fr]">
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-animated.svg"
              alt="iNexConnect animated logo"
              width={260}
              height={260}
              className="max-w-[260px]"
            />
          </div>
          <div>
            <SectionHeading eyebrow="About" title="A small studio with a builder's mindset" />
            <p className="-mt-4 leading-relaxed text-slate">
              iNexConnect is a software studio built by people who ship their own products too. We
              keep the team small, the process written down, and the communication direct — you
              always know what is being built, why, and what it costs before we start.
            </p>
            <p className="mt-6">
              <Link href="/about" className="btn-outline-dark">
                More about us
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* Quote */}
      <Section id="quote">
        <SectionHeading
          eyebrow="Start a project"
          title="Request a quote"
          intro="Tell us what you are building. We reply within one business day — and if a short call would help, you can book a discovery call instead."
        />
        <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          <QuoteForm />
          <aside className="rounded-[20px] bg-charcoal p-8 text-white">
            <h3 className="text-xl font-bold">Prefer to talk first?</h3>
            <p className="mt-3 leading-relaxed text-white/75">
              Book a short discovery call. We will talk through your idea, the options, and the
              likely cost range — no firm price on the spot, and no obligation. You get a written
              quote afterwards.
            </p>
            <Link href="/book" className="btn-primary mt-6">
              Book a Discovery Call
            </Link>
            <p className="mt-6 text-sm text-white/60">Or email us any time at {SITE.email}.</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
