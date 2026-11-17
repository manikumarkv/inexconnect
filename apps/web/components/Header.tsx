"use client";

import { useState } from "react";
import Link from "next/link";
import { PRIMARY_CTA, WEB_NAV_LINKS } from "@inexconnect/ui";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="iNexConnect home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={38} height={38} />
          <span className="text-[1.35rem] font-extrabold tracking-tight text-charcoal">
            iNexConnect
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {WEB_NAV_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-[0.95rem] font-medium text-charcoal/80 transition-colors hover:text-coral"
            >
              {link.label}
            </Link>
          ))}
          <Link href={PRIMARY_CTA.href} className="btn-primary !px-5 !py-2.5 text-sm">
            {PRIMARY_CTA.label}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white lg:hidden" aria-label="Mobile">
          <div className="wrap flex flex-col gap-1 py-4">
            {WEB_NAV_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="rounded-lg px-2 py-2.5 font-medium text-charcoal hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={PRIMARY_CTA.href}
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              {PRIMARY_CTA.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
