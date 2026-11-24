# Social content pipeline

Turns published blog posts into ready-to-post content for **LinkedIn, X,
Instagram and YouTube** — copy, carousel images, Short videos, long-form
scripts and thumbnails — plus a posting calendar. Posting stays manual.

## How it works

Agents do all the marketing work. **You only post.**

```text
/marketing-week
  1. marketing-strategist  → picks the week's posts, angles, CTAs (drafts/_weeks/<monday>.md)
  2. social-copywriter     → LinkedIn, X thread, Instagram caption + carousel.json   ┐ in parallel,
     video-producer        → Short script + short.mp4, long-form script + thumbnail  ┘ per post
  3. visual-designer       → renders carousel PNGs, checks every image
  4. brand-reviewer        → fact/voice/limit checks, marks rows `ready`,
                             writes drafts/_weeks/<monday>-POSTING.md
```

Agents live in `.claude/agents/`, the orchestrator in
`.claude/skills/marketing-week/`. Voice rules: `BRAND_VOICE.md`.

## Your weekly routine (~20 min)

1. In Claude Code, run `/marketing-week` (or `/marketing-week 2026-11-30`).
2. Open `drafts/_weeks/<monday>-POSTING.md` and post each item on its day.
3. Set the row's `status` to `posted` in `calendar.csv`.
4. Optional: once a month, drop platform analytics exports into `analytics/`
   — the strategist uses them to pick better angles.

Status flow: `todo` → `ready` (agents) → `posted` (you).

## Render visuals by hand

```bash
node packages/social/src/render.mjs carousel  <slug>   # carousel.json  → instagram/slide-N.png
node packages/social/src/render.mjs thumbnail <slug>   # thumbnail.json → youtube/thumbnail.png
node packages/social/src/render.mjs short     <slug>   # short.json     → youtube/short.mp4
```

Needs Playwright (Chromium) and `ffmpeg`. Shorts render silent; add trending
audio in the YouTube app, or set `"voiceover": "voiceover.mp3"` in `short.json`.

## Generate the next batch

```bash
pnpm social                          # next 8 weeks, 2 posts a week
pnpm social -- --weeks 4             # shorter batch
pnpm social -- --start 2027-02-01    # pick the start Monday
```

Each run schedules posts that have no drafts yet, appends to
`calendar.csv`, and starts the Monday after the last scheduled date. Edited
drafts are never overwritten. `--force` regenerates everything from scratch
(and resets the calendar).

## Weekly layout

| Day | Post A                                     | Post B              |
| --- | ------------------------------------------ | ------------------- |
| Mon | LinkedIn + X thread                        |                     |
| Tue | Instagram carousel                         |                     |
| Wed | YouTube Short                              |                     |
| Thu |                                            | LinkedIn + X thread |
| Fri |                                            | Instagram carousel  |
| Sat |                                            | YouTube Short       |
| Sun | Long-form YouTube video, every second week |

## What each template draft contains (agents then rewrite them)

- `linkedin.md` — hook, summary, key takeaways, one FAQ, link, 5 hashtags.
- `x-thread.md` — thread with a character count per post (links count as 23).
- `instagram.md` — slide-by-slide carousel copy, caption, hashtags.
- `youtube-short.md` — timed 60-second script, title, description.
- `youtube-long.md` — outline from the post's headings, chapters, tags.

Every link carries UTM tags (`utm_source=linkedin|x|instagram|youtube`) so
traffic from each platform shows up separately in analytics.

> Links point to `inexconnect.com/blog`, which goes live with the blog
> launch. Don't post before then.
