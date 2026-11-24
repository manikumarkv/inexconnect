# Blog house style (for the blog agents)

Learned from the 71 published posts. The checker enforces most of it:
`node apps/blog/scripts/check-posts.mjs <slug>`.

## Who reads it

Developers learning practical AI (MCP, agents, RAG, Claude, fine-tuning), and
technical founders deciding what to build. They want to understand a thing
and then do it.

## Voice

Plain English, short sentences, second person ("you"). Calm, specific,
honest about limits and risks. No hype words (game-changer, revolutionary,
supercharge, unlock, delve, "let's dive in"). Explain every term the first
time it appears. Never invent facts, numbers, quotes, versions or commands —
check them against official docs and link the source.

## File

`apps/blog/src/content/posts/<slug>.mdx`. Slug: lowercase, hyphenated, 3–6
words, keyword first (`what-is-rag`, `build-your-first-mcp-server`).

```yaml
---
title: <keyword-first, ≤ 65 chars>
date: <YYYY-MM-DD planned publish date>
draft: true                  # agents always leave this true; a human publishes
summary: <1–2 sentences: what the reader gets>
seoDescription: <≤ 160 chars, usually the summary>
author: mani
tags: [<only existing files in content/tags/>]
category: How-to | What is | Deep dive
series: <optional, existing series name>
seriesPart: <number, if series>
featured: false
showToc: true
tldr:                        # 4 points, each one full sentence
  - ...
faq:                         # 3–4 real questions people search for
  - question: ...
    answer: ...
---
```

## Structure

1. **Intro** (no heading): 2 short paragraphs — what it is / what you'll
   build, and why it matters to the reader.
2. **H2 sections phrased as questions** the reader would ask
   ("How does RAG work?", "What if it doesn't work?").
3. A **`## Try it: ...`** section with something runnable for How-to and What-is posts.
4. Ends with **`## What should I do next?`** — 3–4 bullets, at least two
   linking other posts (`/blog/<slug>`), one to official docs.

Length: What is ≈ 1,700–2,500 words · How-to ≈ 2,500–4,000 · Deep dive ≈ 3,500–8,000.

## Components (the only ones allowed)

<!-- prettier-ignore -->
```mdx
<Callout type="warning" title="Only connect servers you trust">

Text, with a blank line after the opening tag so Markdown renders.

</Callout>

<Steps>

<Step title="Add the server">

Text and code.

</Step>

</Steps>
```

Callout types: `note`, `tip`, `warning` (most used: security, cost, gotchas).
Diagrams: fenced code blocks tagged `mermaid`. Code blocks always have a
language and must run as written; prefer TypeScript and the official SDKs.

## Links

- Internal: relative `/blog/<slug>`, 3+ per post, natural anchor text.
- External: official docs first (vendor docs, specs, GitHub repos).
- Service-adjacent posts may end with one line pointing to
  `https://inexconnect.com/book` — never a sales pitch inside the body.
