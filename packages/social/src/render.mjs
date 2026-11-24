#!/usr/bin/env node
/**
 * Renders brand visuals from JSON specs that the marketing agents write.
 *
 *   node src/render.mjs carousel  <slug>   drafts/<slug>/carousel.json  → drafts/<slug>/instagram/slide-N.png (1080×1350)
 *   node src/render.mjs thumbnail <slug>   drafts/<slug>/thumbnail.json → drafts/<slug>/youtube/thumbnail.png (1280×720)
 *   node src/render.mjs short     <slug>   drafts/<slug>/short.json     → drafts/<slug>/youtube/short.mp4 (1080×1920)
 *
 * Specs:
 *   carousel.json  { "slides": [{ "kicker"?: str, "title": str, "body"?: str }] }   first = cover, last = CTA
 *   thumbnail.json { "text": str, "sub"?: str }
 *   short.json     { "scenes": [{ "text": str, "seconds": num }], "voiceover"?: "file.mp3" }
 *
 * Needs Playwright (Chromium) and ffmpeg on PATH (ffmpeg only for `short`).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// Playwright is resolved from the project, or from a global install (NODE_PATH).
const { chromium } = await import("playwright").catch(() =>
  createRequire(import.meta.url)("playwright"),
);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MARK = readFileSync(join(ROOT, "../brand/assets/mark-white.svg"), "utf8");
const C = {
  charcoal: "#232323",
  coral: "#FF5C50",
  white: "#FFFFFF",
  slate: "#5B5B60",
  mist: "#F7F7F8",
};
const FONT = `Inter, "Helvetica Neue", Arial, "DejaVu Sans", system-ui, sans-serif`;

const [kind, slug] = process.argv.slice(2);
if (!["carousel", "thumbnail", "short"].includes(kind) || !slug) {
  console.error("usage: render.mjs <carousel|thumbnail|short> <slug>");
  process.exit(1);
}
const DIR = join(ROOT, "drafts", slug);
const spec = JSON.parse(readFileSync(join(DIR, `${kind}.json`), "utf8"));

const esc = (s = "") =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
/** **word** → coral highlight. */
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, `<span style="color:${C.coral}">$1</span>`);

function page(w, h, bg, inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box;margin:0}
    body{width:${w}px;height:${h}px;background:${bg};font-family:${FONT};overflow:hidden;position:relative}
    .mark svg{width:100%;height:100%}
  </style></head><body>${inner}</body></html>`;
}

function footer(dark, pad) {
  const color = dark ? "rgba(255,255,255,.75)" : C.slate;
  const markBg = dark ? "transparent" : C.charcoal;
  return `<div style="position:absolute;left:${pad}px;right:${pad}px;bottom:${pad}px;display:flex;align-items:center;justify-content:space-between;font-size:30px;color:${color};font-weight:600">
    <div style="display:flex;align-items:center;gap:18px"><div class="mark" style="width:64px;height:64px;background:${markBg};border-radius:16px;padding:6px">${MARK}</div>iNexConnect</div>
    <div>inexconnect.com</div></div>`;
}

function carouselSlide(s, i, n) {
  const dark = i === 0 || i === n - 1;
  const fg = dark ? C.white : C.charcoal;
  const titleSize = i === 0 ? 96 : 72;
  return page(
    1080,
    1350,
    dark ? C.charcoal : C.mist,
    `<div style="position:absolute;top:0;left:0;width:100%;height:14px;background:${C.coral}"></div>
     <div style="position:absolute;top:80px;right:90px;font-size:28px;font-weight:700;color:${dark ? "rgba(255,255,255,.5)" : C.slate}">${i + 1} / ${n}</div>
     <div class="content" style="position:absolute;left:90px;right:90px;top:200px;bottom:220px;display:flex;flex-direction:column;justify-content:center;gap:40px;color:${fg}">
       ${s.kicker ? `<div style="font-size:34px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.coral}">${esc(s.kicker)}</div>` : ""}
       <div style="font-size:${titleSize}px;line-height:1.08;font-weight:800;letter-spacing:-.02em">${rich(s.title)}</div>
       ${s.body ? `<div style="font-size:42px;line-height:1.35;color:${dark ? "rgba(255,255,255,.85)" : C.slate}">${rich(s.body)}</div>` : ""}
     </div>
     ${footer(dark, 90)}`,
  );
}

function thumbnail(s) {
  return page(
    1280,
    720,
    C.charcoal,
    `<div style="position:absolute;left:0;top:0;bottom:0;width:24px;background:${C.coral}"></div>
     <div class="content" style="position:absolute;left:90px;right:90px;top:70px;bottom:150px;display:flex;flex-direction:column;justify-content:center;gap:24px">
       <div style="font-size:124px;line-height:1;font-weight:900;color:${C.white};letter-spacing:-.03em;text-transform:uppercase">${rich(s.text)}</div>
       ${s.sub ? `<div style="font-size:44px;font-weight:700;color:${C.coral}">${esc(s.sub)}</div>` : ""}
     </div>
     ${footer(true, 60)}`,
  );
}

function shortFrame(scene, i, n) {
  return page(
    1080,
    1920,
    C.charcoal,
    `<div class="content" style="position:absolute;left:100px;right:100px;top:300px;bottom:400px;display:flex;align-items:center">
       <div style="font-size:${i === 0 ? 104 : 84}px;line-height:1.15;font-weight:800;color:${C.white};letter-spacing:-.02em">${rich(scene.text)}</div>
     </div>
     <div style="position:absolute;left:100px;right:100px;bottom:300px;height:12px;border-radius:6px;background:rgba(255,255,255,.15)">
       <div style="width:${((i + 1) / n) * 100}%;height:100%;border-radius:6px;background:${C.coral}"></div></div>
     ${footer(true, 100)}`,
  );
}

async function shoot(browser, html, w, h, out) {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.setContent(html, { waitUntil: "load" });
  // Flag text that overflows its box so the agent can shorten it.
  const overflow = await p.evaluate(() =>
    [...document.querySelectorAll(".content")].some(
      (d) => d.scrollHeight > d.clientHeight + 2 || d.scrollWidth > d.clientWidth + 2,
    ),
  );
  await p.screenshot({ path: out });
  await p.close();
  if (overflow) console.warn(`⚠ ${out}: text may overflow — shorten it and re-render`);
}

const browser = await chromium.launch();
try {
  if (kind === "carousel") {
    const out = join(DIR, "instagram");
    rmSync(out, { recursive: true, force: true });
    mkdirSync(out, { recursive: true });
    const n = spec.slides.length;
    for (const [i, s] of spec.slides.entries()) {
      await shoot(browser, carouselSlide(s, i, n), 1080, 1350, join(out, `slide-${i + 1}.png`));
    }
    console.log(`${n} slides → ${out}`);
  }

  if (kind === "thumbnail") {
    const out = join(DIR, "youtube");
    mkdirSync(out, { recursive: true });
    await shoot(browser, thumbnail(spec), 1280, 720, join(out, "thumbnail.png"));
    console.log(`thumbnail → ${join(out, "thumbnail.png")}`);
  }

  if (kind === "short") {
    const out = join(DIR, "youtube");
    const tmp = join(out, ".frames");
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });
    const n = spec.scenes.length;
    const list = [];
    for (const [i, sc] of spec.scenes.entries()) {
      const png = join(tmp, `f${i}.png`);
      await shoot(browser, shortFrame(sc, i, n), 1080, 1920, png);
      list.push(`file '${png}'`, `duration ${sc.seconds}`);
    }
    list.push(`file '${join(tmp, `f${n - 1}.png`)}'`); // concat demuxer needs the last file twice
    writeFileSync(join(tmp, "list.txt"), list.join("\n"));
    const total = spec.scenes.reduce((a, s) => a + s.seconds, 0);
    const vo = spec.voiceover ? resolve(DIR, spec.voiceover) : null;
    const audio =
      vo && existsSync(vo) ? ["-i", vo] : ["-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo"];
    const mp4 = join(out, "short.mp4");
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-loglevel",
        "error",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        join(tmp, "list.txt"),
        ...audio,
        "-vf",
        "fps=30,format=yuv420p",
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "-t",
        String(total),
        "-shortest",
        mp4,
      ],
      { stdio: "inherit" },
    );
    rmSync(tmp, { recursive: true, force: true });
    console.log(
      `${total}s short (${vo && existsSync(vo) ? "with voiceover" : "silent — add music in YouTube Studio or a voiceover"}) → ${mp4}`,
    );
    if (total > 60) console.warn("⚠ over 60s — YouTube Shorts must be 60s or less for best reach");
  }
} finally {
  await browser.close();
}
