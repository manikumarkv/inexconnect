---
name: blog-post
description: Has the blog agents research, write, edit and link a new iNexConnect blog post (or refresh an old one) and leave it as a draft for review. Use for "write a blog post about X", "next blog post", "refresh the <slug> post", or /blog-post [topic | slug].
---

# Blog post

Agents do the work; the human reviews and publishes with `/blog-publish`.

Argument: a topic, a backlog slug, `refresh <slug>`, or nothing (take the top
`idea` in `apps/blog/editorial/BACKLOG.md`).

## New post

1. **Brief** — `blog-planner` in brief mode with the argument. Returns the brief path.
2. **Write** — `blog-writer` with the brief path. Returns the post path.
3. **Edit** — `blog-editor` with the slug. Fix-and-recheck until the checker
   and build pass (it does this itself).
4. **Link** — `blog-linker` with the slug in outbound mode.
5. Set the backlog row to `drafted`.

## Refresh

1. `blog-writer` in refresh mode with the slug and the change list from the backlog.
2. `blog-editor` with the slug.

## Report (short)

- Post path and title, word count.
- Review note path (`apps/blog/editorial/reviews/<slug>.md`) and anything the human must decide.
- Next step: "Read it at http://localhost:4321/blog/<slug> (`pnpm dev`), then run `/blog-publish <slug>`."

Never set `draft: false`. In a cloud session, commit and push the working branch.
