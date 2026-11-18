/**
 * Shared site specification for iNexConnect.
 * The website (React) and the blog (Astro) each render their own header/footer
 * components, but both read navigation, contact, and chat values from here so
 * the two apps cannot drift apart.
 */

export const SITE = {
  name: "iNexConnect",
  tagline: "Idea • Build • Grow",
  email: "inexconnect@gmail.com",
  url: "https://inexconnect.com",
  blogUrl: "https://inexconnect.com/blog",
  blogOrigin: "https://blog.inexconnect.com",
  description:
    "iNexConnect designs and builds mobile apps, web apps, and websites — using the latest AI tools for faster, higher-quality development, and building AI into the products we ship.",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation for the marketing website (paths are website routes). */
export const WEB_NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "AI", href: "/#ai" },
  { label: "Builds", href: "/builds" },
  { label: "MCPs", href: "/mcps" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const PRIMARY_CTA: NavLink = { label: "Request a Quote", href: "/request-a-quote" };
export const SECONDARY_CTA: NavLink = { label: "Book a Discovery Call", href: "/book" };

/**
 * Tawk.to live-chat specification — one property serves both apps.
 * The embed only loads when real property/widget IDs are configured
 * (see each app's env example). Never render a fake chat UI.
 */
export const CHAT_SPEC = {
  provider: "Tawk.to",
  position: "bottom-right",
  color: "#FF5C50",
  agent: "Yamini",
  offlineNote:
    "We reply within one business day. For a project inquiry, the quote form gets you a faster, complete answer.",
} as const;
