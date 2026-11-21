import Link from "next/link";
import { SITE, SOCIAL_LINKS, WEB_NAV_LINKS } from "@inexconnect/ui";

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
          <ul className="mt-5 flex gap-3" aria-label="iNexConnect on social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={`iNexConnect on ${social.label}`}
                  title={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-coral hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d={social.iconPath} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
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
