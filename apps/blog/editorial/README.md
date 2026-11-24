# Blog editorial

Agents research, write, edit and link posts. **You review and publish.**

| Command                     | What the agents do                                                                        | You                                    |
| --------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- |
| `/blog-plan`                | Find topic gaps, current demand and stale posts; rank `BACKLOG.md`                        | Reorder or veto ideas                  |
| `/blog-post [topic]`        | planner → brief · writer → MDX draft · editor → fact-check, style, build · linker → links | Read the draft and `reviews/<slug>.md` |
| `/blog-post refresh <slug>` | Update an outdated post                                                                   | Review the diff                        |
| `/blog-publish <slug>`      | Set `draft: false`, add links from related posts, check, build, queue for social          | Run it only when you approve           |

Files: `STYLE.md` (house style), `BACKLOG.md` (plan), `briefs/`, `reviews/`.
Agents: `.claude/agents/blog-*.md`. Checker: `node apps/blog/scripts/check-posts.mjs [slug]`.

Once published, a post flows into social media automatically: `/marketing-week`
picks it up (see `packages/social/README.md`).
