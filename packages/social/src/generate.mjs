#!/usr/bin/env node
/**
 * Social content generator for iNexConnect.
 *
 * Reads the published blog posts and writes ready-to-post drafts for
 * LinkedIn, X, Instagram and YouTube, plus a posting calendar. Nothing is
 * posted automatically: a person reviews each draft and posts it by hand.
 *
 *   node src/generate.mjs [--start YYYY-MM-DD] [--weeks 8] [--per-week 2] [--force]
 *
 * Re-running schedules the NEXT batch: posts that already have drafts are
 * skipped, new rows are appended to calendar.csv, and the start date defaults
 * to the Monday after the calendar's last date. Hand-edited drafts are never
 * overwritten. --force wipes that memory and regenerates from scratch.
 */
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { SITE } from "@inexconnect/ui";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = join(ROOT, "../../apps/blog/src/content/posts");
const OUT_DIR = join(ROOT, "drafts");

// ---------- options ----------
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const FORCE = args.includes("--force");
const WEEKS = Number(opt("weeks", 8));
const PER_WEEK = Math.min(2, Math.max(1, Number(opt("per-week", 2))));
const CALENDAR = join(ROOT, "calendar.csv");
const HAS_CALENDAR = existsSync(CALENDAR) && !FORCE;
const START = mondayOnOrAfter(opt("start", defaultStart()));

function defaultStart() {
  if (!HAS_CALENDAR) return addDays(isoDate(new Date()), 1);
  const dates = readFileSync(CALENDAR, "utf8").match(/^\d{4}-\d{2}-\d{2}/gm) ?? [];
  return dates.length ? addDays(dates.sort().at(-1), 1) : isoDate(new Date());
}

// ---------- brand constants ----------
const HASHTAGS = {
  ai: "#AI",
  claude: "#Claude",
  "claude-code": "#ClaudeCode",
  mcp: "#MCP",
  copilot: "#GitHubCopilot",
  astro: "#Astro",
  keystatic: "#Keystatic",
  workflow: "#DevWorkflow",
};
const BASE_TAGS = ["#SoftwareDevelopment", "#AIEngineering"];
const IG_EXTRA_TAGS = ["#Developers", "#Coding", "#TechTips", "#LearnAI", "#BuildInPublic"];

// ---------- load posts ----------
function loadPosts() {
  const today = isoDate(new Date());
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), "utf8");
      const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      if (!m) return null;
      const data = parseYaml(m[1]) ?? {};
      return {
        slug: file.replace(/\.mdx$/, ""),
        ...data,
        date: isoDate(new Date(data.date)),
        tags: data.tags ?? [],
        tldr: data.tldr ?? [],
        faq: data.faq ?? [],
        headings: [...m[2].matchAll(/^##\s+(.+)$/gm)].map((h) => h[1].trim()),
      };
    })
    .filter((p) => p && p.draft === false && p.date <= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
}

// ---------- helpers ----------
function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
function addDays(iso, n) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return isoDate(d);
}
function mondayOnOrAfter(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  const offset = (8 - d.getUTCDay()) % 7; // 0 when already Monday
  return addDays(iso, offset);
}
function link(post, source) {
  return `${SITE.blogUrl}/${post.slug}?utm_source=${source}&utm_medium=social&utm_campaign=blog`;
}
function tagsFor(post, extra = []) {
  const fromPost = post.tags.map((t) => HASHTAGS[t]).filter(Boolean);
  return [...new Set([...fromPost, ...BASE_TAGS, ...extra])];
}
/** Short display title: the part before a colon or question mark. */
function shortTitle(post) {
  const t = post.headline || post.title;
  return t.split(/[:?]/)[0].trim();
}
function hook(post) {
  if (post.category === "What is") return `${shortTitle(post)}? Here's the short answer.`;
  return post.headline || post.title;
}
/** X counts every link as 23 characters. */
function xLength(text) {
  return [...text.replace(/https?:\/\/\S+/g, "x".repeat(23))].length;
}
function words(text) {
  return text.split(/\s+/).filter(Boolean).length;
}
function header(post, platform, date) {
  return [
    `<!-- ${platform} · scheduled ${date} · source: apps/blog/src/content/posts/${post.slug}.mdx -->`,
    `<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->`,
    "",
  ].join("\n");
}

// ---------- platform drafts ----------
function linkedin(post, date) {
  const lines = [hook(post), "", post.summary ?? ""];
  if (post.tldr.length) {
    lines.push("", "Key takeaways:", ...post.tldr.slice(0, 4).map((t) => `→ ${t}`));
  }
  if (post.faq[0]) lines.push("", `Q: ${post.faq[0].question}`, `A: ${post.faq[0].answer}`);
  lines.push("", `Full guide: ${link(post, "linkedin")}`, "", tagsFor(post).slice(0, 5).join(" "));
  const body = lines.join("\n");
  const warn =
    body.length > 3000 ? `\n\n> ⚠ ${body.length} chars — LinkedIn's limit is 3,000.\n` : "";
  return `${header(post, "LinkedIn", date)}${body}\n${warn}`;
}

function xThread(post, date) {
  const tweets = [
    `${hook(post)} 🧵👇`,
    ...post.tldr.map((t, i) => `${i + 1}/ ${t}`),
    `Full write-up, with examples:\n${link(post, "x")}\n\n${tagsFor(post).slice(0, 2).join(" ")}`,
  ];
  const out = tweets.map((t, i) => {
    const len = xLength(t);
    const flag = len > 280 ? `  ⚠ ${len}/280 — trim before posting` : `  (${len}/280)`;
    return `### Post ${i + 1}${flag}\n\n${t}`;
  });
  return `${header(post, "X thread", date)}${out.join("\n\n")}\n`;
}

function instagram(post, date) {
  const slides = [
    `Slide 1 (cover): ${shortTitle(post)}`,
    ...post.tldr.map((t, i) => `Slide ${i + 2}: ${t}`),
    `Slide ${post.tldr.length + 2} (CTA): Full guide → link in bio · inexconnect.com/blog`,
  ];
  const caption = [
    hook(post),
    "",
    post.summary ?? "",
    "",
    "💾 Save this for later · Follow @inexconnect for practical AI dev tips",
    "",
    tagsFor(post, IG_EXTRA_TAGS).slice(0, 12).join(" "),
  ].join("\n");
  return [
    header(post, "Instagram carousel (1080×1350)", date),
    "## Carousel slides",
    "",
    "Design in the brand template (coral #FF5C50, one idea per slide, big type).",
    "",
    ...slides.map((s) => `- ${s}`),
    "",
    "## Caption",
    "",
    caption,
    "",
    `Link-in-bio URL: ${link(post, "instagram")}`,
    "",
  ].join("\n");
}

function youtubeShort(post, date) {
  const points = post.tldr.slice(0, 3);
  const script = [
    `[0–3s · HOOK] ${hook(post)}`,
    ...points.map((p, i) => `[${3 + i * 15}–${18 + i * 15}s · POINT ${i + 1}] ${p}`),
    `[~50s · CTA] The full guide is on our blog — link in the description. Follow for more AI dev tips.`,
  ];
  const spoken = script.map((s) => s.replace(/^\[.*?\]\s*/, "")).join(" ");
  const desc = [
    post.summary ?? "",
    "",
    `Full guide: ${link(post, "youtube")}`,
    `Work with us: ${SITE.url}/book`,
    "",
    [...tagsFor(post).slice(0, 3), "#Shorts"].join(" "),
  ].join("\n");
  return [
    header(post, "YouTube Short (vertical 9:16, ≤60s)", date),
    `**Title:** ${shortTitle(post)} in 60 seconds #Shorts`,
    "",
    `## Script (~${words(spoken)} words — aim for 130–150)`,
    "",
    "Record as screen capture + face cam or voiceover. Put each point on screen as big text.",
    "",
    ...script.map((s) => `- ${s}`),
    "",
    "## Description",
    "",
    desc,
    "",
  ].join("\n");
}

function youtubeLong(post, date) {
  const chapters = ["Intro", ...post.headings, "Wrap-up & next steps"];
  const desc = [
    post.summary ?? "",
    "",
    `📖 Written guide: ${link(post, "youtube")}`,
    `📅 Book a free discovery call: ${SITE.url}/book`,
    "",
    "Chapters (fill in timestamps after editing — the first must be 00:00):",
    ...chapters.map((c, i) => `${i === 0 ? "00:00" : "--:--"} ${c}`),
    "",
    tagsFor(post).slice(0, 3).join(" "),
  ].join("\n");
  const tags = [
    ...post.tags.map((t) => t.replace(/-/g, " ")),
    shortTitle(post).toLowerCase(),
    "ai for developers",
    "tutorial",
  ];
  return [
    header(post, "YouTube long-form (16:9, 8–15 min)", date),
    `**Title:** ${post.headline || post.title}`,
    "",
    `**Thumbnail text:** pick ≤4 bold words from "${shortTitle(post)}"`,
    "",
    "## Outline",
    "",
    `1. Hook (0:00–0:30): "${hook(post)}" — show the end result first.`,
    ...post.headings.map((h, i) => `${i + 2}. ${h}`),
    `${post.headings.length + 2}. Wrap-up: recap ${post.tldr.length} takeaways, point to the written guide, ask a question for comments.`,
    "",
    "## Description",
    "",
    desc,
    "",
    `**Tags:** ${[...new Set(tags)].join(", ")}`,
    "",
  ].join("\n");
}

// ---------- schedule ----------
/**
 * Week layout (per blog post "slot"):
 *   slot A: Mon LinkedIn + X · Tue Instagram · Wed YouTube Short
 *   slot B: Thu LinkedIn + X · Fri Instagram · Sat YouTube Short
 * Long-form YouTube: every second week, Sunday, from the next How-to / Deep-dive post.
 */
function buildSchedule(allPosts) {
  const rows = [];
  const done = (slug, file) => !FORCE && existsSync(join(OUT_DIR, slug, file));
  const posts = allPosts.filter((p) => !done(p.slug, "linkedin.md"));
  const longPool = allPosts.filter(
    (p) => p.category !== "What is" && p.headings.length >= 3 && !done(p.slug, "youtube-long.md"),
  );
  let next = 0;
  let nextLong = 0;
  for (let w = 0; w < WEEKS; w++) {
    const monday = addDays(START, w * 7);
    for (let s = 0; s < PER_WEEK && next < posts.length; s++, next++) {
      const post = posts[next];
      const d0 = addDays(monday, s * 3);
      rows.push(
        { date: d0, platform: "LinkedIn", post, file: "linkedin.md", render: linkedin },
        { date: d0, platform: "X", post, file: "x-thread.md", render: xThread },
        {
          date: addDays(d0, 1),
          platform: "Instagram",
          post,
          file: "instagram.md",
          render: instagram,
        },
        {
          date: addDays(d0, 2),
          platform: "YouTube Short",
          post,
          file: "youtube-short.md",
          render: youtubeShort,
        },
      );
    }
    if (w % 2 === 1 && nextLong < longPool.length) {
      const post = longPool[nextLong++];
      rows.push({
        date: addDays(monday, 6),
        platform: "YouTube",
        post,
        file: "youtube-long.md",
        render: youtubeLong,
      });
    }
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

// ---------- write ----------
function main() {
  const posts = loadPosts();
  const rows = buildSchedule(posts);
  mkdirSync(OUT_DIR, { recursive: true });

  for (const r of rows) {
    const dir = join(OUT_DIR, r.post.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, r.file), r.render(r.post, r.date));
  }

  const lines = rows.map((r) => {
    const day = new Date(`${r.date}T00:00:00Z`).toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });
    const title = `"${r.post.title.replace(/"/g, '""')}"`;
    return [r.date, day, r.platform, title, `drafts/${r.post.slug}/${r.file}`, "todo"].join(",");
  });
  if (HAS_CALENDAR) {
    if (lines.length) appendFileSync(CALENDAR, `${lines.join("\n")}\n`);
  } else {
    writeFileSync(CALENDAR, ["date,day,platform,post,draft,status", ...lines].join("\n") + "\n");
  }

  const used = posts.filter((p) => existsSync(join(OUT_DIR, p.slug, "linkedin.md"))).length;
  console.log(
    `${posts.length} published posts · ${rows.length} drafts written for ${WEEKS} weeks from ${START} · ` +
      `${posts.length - used} posts not yet scheduled.`,
  );
}

main();
