import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { SITE } from "@inexconnect/ui";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description: "Book a short discovery call with iNexConnect to talk through your project idea.",
};

/**
 * Booking opens at launch, once the scheduling tool is connected.
 * Until then this page is honest about it and routes visitors to the
 * quote form / email — no fake calendar, no fake availability.
 */
export default function BookPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Discovery call"
        title="Book a discovery call"
        intro="A short call to talk through your idea, the options, and the likely cost range — followed by a written quote. No firm price on the spot, and no obligation."
      />
      <div className="card max-w-2xl">
        <h2 className="text-xl font-bold">Online booking opens soon</h2>
        <p className="mt-3 leading-relaxed text-slate">
          Our booking calendar is being set up. Until it is live, the fastest way to get your call
          scheduled is the quote form — mention that you would like a call, and we will arrange it
          in our reply within one business day.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/request-a-quote" className="btn-primary">
            Request a Quote
          </Link>
          <a href={`mailto:${SITE.email}`} className="btn-outline-dark">
            Email {SITE.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
