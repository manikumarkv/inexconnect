import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { CHAT_SPEC, SITE } from "@inexconnect/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact iNexConnect at ${SITE.email}. We reply within one business day.`,
};

export default function ContactPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Contact"
        title="Talk to us"
        intro="One inbox, read by a person. We reply within one business day."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-bold">Email</h2>
          <p className="mt-3 leading-relaxed text-slate">
            For anything at all — questions, ideas, or a project you are considering:
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-block text-lg font-bold text-charcoal underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
          >
            {SITE.email}
          </a>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold">Live chat</h2>
          <p className="mt-3 leading-relaxed text-slate">
            Use the chat button at the bottom-right of any page for a quick question.
            {` ${CHAT_SPEC.offlineNote}`}
          </p>
          <p className="mt-4 leading-relaxed text-slate">
            Starting a project? The quote form gives us everything we need in one go:
          </p>
          <Link href="/request-a-quote" className="btn-primary mt-5">
            Request a Quote
          </Link>
        </div>
      </div>
    </Section>
  );
}
