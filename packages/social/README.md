# Social content pipeline

Turns published blog posts into ready-to-post drafts for **LinkedIn, X,
Instagram and YouTube**, plus a posting calendar. Posting stays manual: you
review each draft, tweak it, and post it yourself.

## Weekly routine (~1 hour)

1. Open `calendar.csv` and filter to this week.
2. For each row, open the draft file, edit the wording, and post it.
3. Change the row's `status` from `todo` to `posted`.
4. Instagram and YouTube need visuals: design the carousel in the brand
   template, record the Short (see `YOUTUBE_PLAN.md`).

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

## What each draft contains

- `linkedin.md` — hook, summary, key takeaways, one FAQ, link, 5 hashtags.
- `x-thread.md` — thread with a character count per post (links count as 23).
- `instagram.md` — slide-by-slide carousel copy, caption, hashtags.
- `youtube-short.md` — timed 60-second script, title, description.
- `youtube-long.md` — outline from the post's headings, chapters, tags.

Every link carries UTM tags (`utm_source=linkedin|x|instagram|youtube`) so
traffic from each platform shows up separately in analytics.

> Links point to `inexconnect.com/blog`, which goes live with the blog
> launch. Don't post before then.
