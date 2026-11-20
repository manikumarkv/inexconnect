import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import { SITE } from "@inexconnect/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/request-a-quote" },
  title: "Request a Quote",
  description:
    "Tell iNexConnect about your project and get a written quote. We reply within one business day.",
};

export default function RequestQuotePage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Start a project"
        title="Request a quote"
        intro="A few details now save a lot of back-and-forth later. You will get a written reply — and a written quote before any work begins."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <QuoteForm />
        <aside className="rounded-[20px] bg-charcoal p-8 text-white">
          <h2 className="text-xl font-bold">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-white/75">
            <li>We read your request and reply within one business day.</li>
            <li>If it helps, we schedule a short discovery call.</li>
            <li>You receive a written quote — scope, timeline, and price.</li>
            <li>Work starts only after you approve it in writing.</li>
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-white/60">
            Prefer to talk first?{" "}
            <Link
              href="/book"
              className="font-semibold text-white underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
            >
              Book a discovery call
            </Link>{" "}
            — or email {SITE.email}.
          </p>
        </aside>
      </div>
    </Section>
  );
}
