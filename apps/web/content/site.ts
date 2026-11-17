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
    description:
      "An MCP server for searching icons across popular React icon libraries, with semantic search — published on npm as `trueicon`.",
  },
  {
    name: "ImageRight MCP",
    href: "https://github.com/manikumarkv/imageright-mcp",
    displayUrl: "github.com/manikumarkv/imageright-mcp",
    tag: "Open-source · MCP Server",
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
