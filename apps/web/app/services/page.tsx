import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mobile apps, web apps & websites, software consulting, AI integration, and MCP servers, skills & AI agents from iNexConnect.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-charcoal text-white">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight">
            Everything you need to ship — and to keep shipping.
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
            Pick the service that fits, or start with consulting and a clear plan. Every engagement
            starts with a written quote.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="card flex flex-col">
              <h2 className="text-xl font-bold">{service.title}</h2>
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
        <div className="mt-12 rounded-[20px] bg-mist p-8 text-center">
          <h2 className="text-2xl font-extrabold">Not sure which one you need?</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate">
            That is normal — tell us the goal and we will recommend the smallest thing that gets you
            there.
          </p>
          <Link href="/request-a-quote" className="btn-primary mt-6">
            Request a Quote
          </Link>
        </div>
      </Section>
    </>
  );
}
