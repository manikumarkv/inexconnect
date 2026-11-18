import { z } from "zod";

/**
 * Marketing content as typed data (plan: website copy lives in code, not a CMS).
 * Everything is validated at module load — a malformed entry fails the build.
 */

const serviceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  short: z.string(),
  description: z.string(),
  points: z.array(z.string()).min(1),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(1),
});

export type Service = z.infer<typeof serviceSchema>;

export const services: Service[] = z.array(serviceSchema).parse([
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    short: "iOS and Android apps your customers actually enjoy using.",
    description:
      "We design and build mobile apps end to end — from the first sketch to the store listing. One codebase where it makes sense, native where it matters, and a release process that does not surprise you.",
    points: [
      "iOS and Android, designed for real phones and real users",
      "App Store and Play Store submission handled for you",
      "Updates, fixes, and improvements after launch",
    ],
    faqs: [
      {
        q: "How does a mobile app project start?",
        a: "With a free discovery call about your idea and goals. You then get a written quote before any work begins — no obligation, and no work starts without your approval.",
      },
      {
        q: "Do you build for both iPhone and Android?",
        a: "Yes. We build for iOS and Android, using one shared codebase where it makes sense and native code where it matters, and we handle App Store and Play Store submission for you.",
      },
      {
        q: "How much does a mobile app cost?",
        a: "It depends on the features and scope, which is why every project starts with a written quote tailored to your app. The quote comes before any commitment, so you know the full cost up front.",
      },
      {
        q: "What happens after the app launches?",
        a: "We stay available for updates, fixes, and improvements as your app and your business grow — launch is the start, not the finish.",
      },
    ],
  },
  {
    slug: "web-apps",
    title: "Web Apps & Websites",
    short: "Fast, modern websites and web applications that grow with you.",
    description:
      "Marketing sites that load instantly and web applications that hold up under real use. Built on current frameworks, structured so the next change is easy — not a rewrite.",
    points: [
      "Business websites that look sharp on every screen",
      "Web applications: dashboards, portals, internal tools",
      "Built for speed, search visibility, and easy updates",
    ],
    faqs: [
      {
        q: "How does a website or web app project start?",
        a: "With a free discovery call about what you need and who it is for. You then get a written quote before any work begins — no obligation, and no work starts without your approval.",
      },
      {
        q: "Will my website be fast and easy to find on Google?",
        a: "Yes — we build on current frameworks with speed and search visibility as requirements from the start: fast load times, clean structure, and pages search engines can properly index.",
      },
      {
        q: "Can you rebuild or improve our existing website?",
        a: "Yes. We can assess what you have, keep what works, and rebuild what doesn't — structured so future changes are easy rather than another rewrite.",
      },
      {
        q: "Can we update the site ourselves after launch?",
        a: "That is the goal. We structure sites and web apps so routine updates are straightforward, and we stay available for bigger changes, fixes, and improvements.",
      },
    ],
  },
  {
    slug: "consulting",
    title: "Software Consulting",
    short: "A clear technical plan before you spend on building the wrong thing.",
    description:
      "Not sure what to build, or whether to build at all? We look at your process, your tools, and your goals, and give you a straight answer — including when the answer is simpler than you expected.",
    points: [
      "Honest assessment of what you need (and what you don't)",
      "Architecture and tool choices explained in plain language",
      "A written plan you can act on, with or without us",
    ],
    faqs: [
      {
        q: "What do we get from a consulting engagement?",
        a: "A straight, written assessment: what to build (or not build), which tools and architecture fit, and a plan you can act on — with or without us doing the building.",
      },
      {
        q: "We don't know what we need yet. Is that a problem?",
        a: "No — that is exactly what consulting is for. We look at your process, your tools, and your goals, and explain the options in plain language, including when the right answer is simpler than you expected.",
      },
      {
        q: "How does consulting start?",
        a: "With a free discovery call. If we take the engagement, you get a written quote before any work begins.",
      },
      {
        q: "Will you tell us if we don't need custom software?",
        a: "Yes. An honest assessment is the product — if an off-the-shelf tool or a simpler process solves your problem, that is what we will recommend.",
      },
    ],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    short: "Put the latest AI to work inside the products you already have.",
    description:
      "We integrate AI into your app or website — assistants that answer from your own content, search that understands what people mean, and automation that removes repetitive work. Practical features, not demos.",
    points: [
      "AI assistants and chat grounded in your business content",
      "Smart search across your documents and catalog",
      "Automation for repetitive, rules-based work",
    ],
    faqs: [
      {
        q: "What can AI integration do for our existing product?",
        a: "Practical features, not demos: an assistant that answers from your own content, search that understands what people mean instead of matching keywords, and automation that removes repetitive, rules-based work.",
      },
      {
        q: "Will an AI assistant answer using our content, not generic answers?",
        a: "Yes. We ground assistants in your business content — your documents, catalog, and help material — so answers come from your material and stay on topic.",
      },
      {
        q: "Do we need to rebuild our app to add AI?",
        a: "Usually not. We integrate AI into the app or website you already have, starting with the feature that gives you the most value.",
      },
      {
        q: "How does an AI integration project start?",
        a: "With a free discovery call about your product and the work you want AI to take on. You then get a written quote before any work begins.",
      },
    ],
  },
  {
    slug: "ai-tooling",
    title: "MCP Servers, Skills & AI Agents",
    short: "Custom AI tooling that connects your systems to today's AI tools.",
    description:
      "We build MCP servers, skills, and AI agents that let AI tools work with your software safely and usefully — the same kind of tooling we build and publish ourselves, in the open.",
    points: [
      "MCP servers that expose your tools and data to AI assistants",
      "Reusable skills that teach AI tools your workflows",
      "AI agents for multi-step tasks, with human oversight built in",
    ],
    faqs: [
      {
        q: "What is an MCP server, in plain terms?",
        a: "An MCP server connects your software and data to AI tools like Claude and ChatGPT, using the Model Context Protocol — a standard way to plug AI assistants into your tools, so they can do useful work with your systems, safely and on your terms.",
      },
      {
        q: "What do you build: MCP servers, skills, or agents?",
        a: "All three. MCP servers that expose your tools and data to AI assistants, reusable skills that teach AI tools your workflows, and AI agents for multi-step tasks — with human oversight built in.",
      },
      {
        q: "Is it safe to connect our systems to AI tools?",
        a: "Safety is part of the design: scoped access, your rules about what the AI can read and change, and human approval where it matters. We build and publish this kind of tooling ourselves, in the open.",
      },
      {
        q: "How does an AI tooling project start?",
        a: "With a free discovery call about your systems and the workflows you want AI to help with. You then get a written quote before any work begins.",
      },
    ],
  },
]);

/** The three AI offerings shown in the homepage services feature block. */
export const aiOfferings = [
  {
    title: "AI Integration",
    text: "Assistants, smart search, and automation built into your product.",
    href: "/services/ai-integration",
  },
  {
    title: "MCP Servers",
    text: "Connect your software and data to AI tools, safely and on your terms.",
    href: "/services/ai-tooling",
  },
  {
    title: "Skills & AI Agents",
    text: "Custom skills and agents that carry out real workflows for your team.",
    href: "/services/ai-tooling",
  },
] as const;

const buildSchema = z.object({
  name: z.string(),
  href: z.string().url(),
  displayUrl: z.string(),
  tag: z.string(),
  description: z.string(),
  /** When this build is also an MCP server, its /mcps/<slug> page. */
  mcpSlug: z.string().optional(),
});

export type BuildEntry = z.infer<typeof buildSchema>;

/** Open-source & in-house builds — our own projects, NOT client engagements. */
export const builds: BuildEntry[] = z.array(buildSchema).parse([
  {
    name: "DevRunway",
    href: "https://devrunway.dev",
    displayUrl: "devrunway.dev",
    tag: "In-house Build · Developer Tool",
    description:
      "A full software-development-lifecycle plugin for Claude Code — product planning, design, coding, and review as one guided workflow.",
  },
  {
    name: "Gnanodayam",
    href: "https://gnanodayam.com",
    displayUrl: "gnanodayam.com",
    tag: "In-house Build · Web Product",
    description:
      "A free career-guidance app that maps the options after every education stage — 10th, 12th, diploma, undergraduate, postgraduate — with real demand, salary, and competition context.",
  },
  {
    name: "TrueIcon MCP",
    href: "https://github.com/manikumarkv/trueicon",
    displayUrl: "github.com/manikumarkv/trueicon",
    tag: "Open-source · MCP Server",
    mcpSlug: "trueicon",
    description:
      "An MCP server that lets AI coding assistants search 24 icon libraries (Lucide, Heroicons, React Icons, and more, incl. Vue and Svelte) with exact, version-correct imports — published on npm as `trueicon`.",
  },
  {
    name: "ImageRight MCP",
    href: "https://github.com/manikumarkv/imageright-mcp",
    displayUrl: "github.com/manikumarkv/imageright-mcp",
    tag: "Open-source · MCP Server",
    mcpSlug: "imageright",
    description:
      "A version-aware MCP server for Vertafore ImageRight (24 / 25 / 7.2, REST + SOAP) with a custom error catalog and a safe dry-run mode.",
  },
]);

export const processSteps = [
  {
    number: "01",
    name: "Idea",
    text: "We start with your idea and your goal — what it should do, who it is for, and what success looks like. You get a written quote before any work begins.",
  },
  {
    number: "02",
    name: "Build",
    text: "We design and build in short, visible steps, using the latest AI tools for speed — with human review owning quality at every step.",
  },
  {
    number: "03",
    name: "Grow",
    text: "Launch is the start, not the finish. We help you improve, extend, and grow what we built as your business changes.",
  },
] as const;

export const quoteServiceOptions = [
  "Mobile Apps",
  "Web Apps & Websites",
  "Software Consulting",
  "AI Integration",
  "MCP Servers / Skills / AI Agents",
  "Not sure yet",
] as const;
