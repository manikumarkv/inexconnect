import Link from "next/link";
import { CHAT_SPEC, SITE, WEB_NAV_LINKS } from "@inexconnect/ui";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-dark.svg" alt="iNexConnect" width={190} height={44} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {SITE.tagline}. Mobile apps, web apps & websites — built with the latest AI tools, led
            by humans.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {WEB_NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="text-white/80 transition-colors hover:text-coral">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/request-a-quote"
                className="text-white/80 transition-colors hover:text-coral"
              >
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm font-semibold text-white underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
          >
            {SITE.email}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Live chat (bottom-right, when we are online): {CHAT_SPEC.offlineNote}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-white/50">
          <span>
            © {year} {SITE.name}. All rights reserved.
          </span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
