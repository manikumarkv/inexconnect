import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 leading-relaxed ${dark ? "text-white/70" : "text-slate"}`}>{intro}</p>
      )}
    </div>
  );
}

export function Section({
  id,
  tone = "white",
  children,
}: {
  id?: string;
  tone?: "white" | "mist" | "dark";
  children: ReactNode;
}) {
  const bg = tone === "dark" ? "bg-charcoal" : tone === "mist" ? "bg-mist" : "bg-white";
  return (
    <section id={id} className={`${bg} py-16 sm:py-20`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
