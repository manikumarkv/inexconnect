import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { processSteps } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "iNexConnect is a small software studio: mobile apps, web apps, and AI tooling — built with the latest AI tools, led by humans.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal text-white">
        <div className="wrap flex flex-col items-start gap-8 py-16 sm:py-20 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight">
              A small studio with a builder&apos;s mindset
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
              We build software for clients — and we build our own products too. That second part
              matters: it keeps our skills current and our advice honest.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-animated.svg"
            alt="iNexConnect animated logo"
            width={200}
            height={200}
            className="w-[160px] shrink-0 md:w-[200px]"
          />
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="How we work" title="Written down, start to finish" />
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step) => (
            <div key={step.number} className="rounded-[20px] bg-mist p-8">
              <p className="text-4xl font-extrabold text-coral">{step.number}</p>
              <h2 className="mt-3 text-xl font-bold">{step.name}</h2>
              <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-3xl space-y-4 leading-relaxed text-slate">
          <p>
            Every project starts with a discovery conversation and a written quote — scope,
            timeline, and price in writing before work begins. Changes are agreed in writing too. No
            surprises is the whole business model.
          </p>
          <p>
            We use the latest AI tools in our development workflow, and we build AI into products
            where it genuinely helps. What we will not do is sell you technology you do not need.
          </p>
        </div>
        <p className="mt-10">
          <Link href="/request-a-quote" className="btn-primary">
            Start a project
          </Link>
        </p>
      </Section>
    </>
  );
}
