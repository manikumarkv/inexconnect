#!/usr/bin/env node
/**
 * House-style checker for blog posts. Run by the blog agents (and by hand).
 *
 *   node apps/blog/scripts/check-posts.mjs            # every post
 *   node apps/blog/scripts/check-posts.mjs <slug>...  # just these
 *
 * Errors (exit 1) break the build or the house style. Warnings are judgement
 * calls for the editor. The Astro schema itself is checked by `astro sync`.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const CONTENT = join(dirname(fileURLToPath(import.meta.url)), "../src/content");
const POSTS = join(CONTENT, "posts");
const CATEGORIES = ["How-to", "What is", "Deep dive"];
const COMPONENTS = ["Callout", "Steps", "Step"];
const CALLOUT_TYPES = ["note", "tip", "warning", "danger", "escalate", "resolve"];
const HYPE =
  /\b(game[- ]chang\w*|revolutioni[sz]\w*|supercharg\w*|unlock the power|in today's fast-paced|let's dive in|delve)\b/i;

const allSlugs = new Set(
  readdirSync(POSTS)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.slice(0, -4)),
);
/** slug → draft flag, so published posts never link to unpublished ones. */
const isDraft = new Map(
  [...allSlugs].map((s) => [
    s,
    /^draft:\s*true\s*$/m.test(
      readFileSync(join(POSTS, `${s}.mdx`), "utf8").split(/^---$/m)[1] ?? "",
    ),
  ]),
);
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : [...allSlugs].sort();
let errorCount = 0;

for (const slug of slugs) {
  const errors = [];
  const warnings = [];
  const file = join(POSTS, `${slug}.mdx`);
  if (!existsSync(file)) {
    console.log(`✗ ${slug}: no such post`);
    errorCount++;
    continue;
  }
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) {
    console.log(`✗ ${slug}: missing frontmatter`);
    errorCount++;
    continue;
  }
  let fm;
  try {
    fm = parseYaml(m[1]) ?? {};
  } catch (e) {
    console.log(`✗ ${slug}: frontmatter is not valid YAML — ${e.message}`);
    errorCount++;
    continue;
  }
  const body = m[2];
  // Code blocks would trip the heading/link checks.
  const prose = body.replace(/```[\s\S]*?```/g, "");

  // ---- frontmatter ----
  for (const k of ["title", "date", "summary", "seoDescription", "author", "category"]) {
    if (!fm[k]) errors.push(`missing \`${k}\``);
  }
  if (typeof fm.draft !== "boolean") errors.push("`draft` must be true or false");
  if (fm.seoDescription && fm.seoDescription.length > 160)
    warnings.push(`seoDescription is ${fm.seoDescription.length} chars (aim ≤ 160)`);
  if (fm.title && fm.title.length > 70)
    warnings.push(`title is ${fm.title.length} chars (search shows ~60–70)`);
  if (fm.author && !existsSync(join(CONTENT, "authors", `${fm.author}.json`)))
    errors.push(`author \`${fm.author}\` has no file in content/authors/`);
  for (const t of fm.tags ?? []) {
    if (!existsSync(join(CONTENT, "tags", `${t}.json`)))
      errors.push(`tag \`${t}\` has no file in content/tags/`);
  }
  if (!(fm.tags ?? []).length) warnings.push("no tags");
  if (fm.category && !CATEGORIES.includes(fm.category))
    warnings.push(`category \`${fm.category}\` is not one of ${CATEGORIES.join(", ")}`);
  if (fm.series && !fm.seriesPart) errors.push("`series` set without `seriesPart`");
  const tldr = fm.tldr ?? [];
  if (tldr.length < 3 || tldr.length > 5)
    warnings.push(`tldr has ${tldr.length} points (house style: 3–5)`);
  if ((fm.faq ?? []).length < 2)
    warnings.push(`faq has ${(fm.faq ?? []).length} entries (house style: 3–4)`);
  if (fm.showToc !== true) warnings.push("showToc is not true");

  // ---- body ----
  if (/^#\s/m.test(prose)) errors.push("body has an H1 — the title is the only H1");
  const h2 = [...prose.matchAll(/^##\s+(.+)$/gm)].map((x) => x[1].trim());
  if (h2.length < 3) warnings.push(`only ${h2.length} H2 sections`);
  const notQuestion = h2.filter(
    (h) =>
      !h.endsWith("?") &&
      !/^(Try it|Common traps|Practice questions|Answer key|Scenario [A-Z]:)/i.test(h),
  );
  if (notQuestion.length)
    warnings.push(`H2s not phrased as questions: ${notQuestion.map((h) => `"${h}"`).join(", ")}`);
  if (h2.length && h2.at(-1) !== "What should I do next?")
    warnings.push('last H2 should be "What should I do next?"');

  for (const [, name] of prose.matchAll(/<([A-Z][A-Za-z]*)/g)) {
    if (!COMPONENTS.includes(name))
      errors.push(`unknown component <${name}> (allowed: ${COMPONENTS.join(", ")})`);
  }
  for (const [, type] of prose.matchAll(/<Callout[^>]*type="([^"]+)"/g)) {
    if (!CALLOUT_TYPES.includes(type)) warnings.push(`Callout type "${type}" is unusual`);
  }
  const internal = [...prose.matchAll(/\]\(\/blog\/([a-z0-9-]+)\/?(?:#[^)]*)?\)/g)].map(
    (x) => x[1],
  );
  for (const target of internal) {
    if (!allSlugs.has(target)) errors.push(`broken internal link /blog/${target}`);
    else if (!fm.draft && isDraft.get(target))
      errors.push(
        `published post links to draft /blog/${target} — it 404s until that post is published`,
      );
  }
  if (internal.length < 2) warnings.push(`only ${internal.length} internal links (aim for 3+)`);
  if (/\]\(https?:\/\/(www\.)?inexconnect\.com\/blog\//.test(prose))
    warnings.push("use relative /blog/<slug> links for internal posts");
  const hype = prose.match(HYPE);
  if (hype) warnings.push(`hype phrase: "${hype[0]}"`);
  const words = prose.split(/\s+/).filter(Boolean).length;
  if (words < 1200) warnings.push(`${words} words — most posts run 1,700–4,000`);

  errorCount += errors.length;
  const mark = errors.length ? "✗" : warnings.length ? "!" : "✓";
  console.log(`${mark} ${slug}${fm.draft ? " (draft)" : ""}`);
  for (const e of errors) console.log(`    error: ${e}`);
  for (const w of warnings) console.log(`    warn:  ${w}`);
}

process.exit(errorCount ? 1 : 0);
