---
name: marketing-week
description: Runs the iNexConnect marketing agents for one week — plans, writes LinkedIn/X/Instagram posts, produces YouTube Shorts and long-form scripts, renders images and video, reviews everything, and leaves a posting checklist. Posting stays manual. Use when asked to "do this week's marketing", "prepare social posts", or "run marketing-week [YYYY-MM-DD]".
---

# Marketing week

Everything is done by agents except posting. The output is a week of
ready-to-post content plus a checklist for the human.

Argument: optional Monday `YYYY-MM-DD`. Without it, the strategist picks the
earliest week with `todo` rows.

## Steps

1. **Plan** — run the `marketing-strategist` agent (pass the Monday if given).
   It returns the Monday, the slugs, and the brief path.
2. **Create** — for each slug, run in parallel:
   - `social-copywriter` with the slug and brief path,
   - `video-producer` with the slug and brief path.
3. **Design** — run `visual-designer` with all slugs.
4. **Review** — run `brand-reviewer` with the Monday.
5. **Report** — tell the user, briefly:
   - the posting checklist path (`packages/social/drafts/_weeks/<monday>-POSTING.md`),
   - rows ready vs. still `todo` and why,
   - anything that needs a human (voiceover, face cam, audio).

Do not post anything, and do not connect to any social platform API.
If running in a cloud session, commit the week's drafts and assets and push
the working branch so the human can pull them.
