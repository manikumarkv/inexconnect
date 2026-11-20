import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { services } from "@/content/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <section className="bg-charcoal text-white">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight">{service.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{service.short}</p>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-charcoal/85">{service.description}</p>
            <h2 className="mt-10 text-2xl font-extrabold">What is included</h2>
            <ul className="mt-4 space-y-3">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-slate">
                  <span className="font-bold text-coral">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/request-a-quote" className="btn-primary">
                Request a Quote
              </Link>
              <Link href="/book" className="btn-outline-dark">
                Book a Discovery Call
              </Link>
            </div>
          </div>

          <aside className="rounded-[20px] bg-mist p-7">
            <h2 className="font-bold">Other services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="font-medium text-charcoal/80 hover:text-coral"
                  >
                    {other.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
