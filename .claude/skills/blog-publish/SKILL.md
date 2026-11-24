---
name: blog-publish
description: Publishes an iNexConnect blog draft the human has approved — sets draft false and the date, adds inbound links from related posts, checks and builds, and queues it for social media. Only run when the human explicitly asks to publish a specific post.
---

# Blog publish

Running this command is the human's approval. Argument: the post slug (required).
Never run it on your own initiative.

1. Confirm `apps/blog/src/content/posts/<slug>.mdx` exists and is `draft: true`,
   and that `apps/blog/editorial/reviews/<slug>.md` exists (the editor passed it).
   If anything in the review note says "human must decide", show it and stop.
2. Set `draft: false`. If `date` is in the past, set it to today.
3. Run `blog-linker` with the slug in inbound mode.
4. Run `node apps/blog/scripts/check-posts.mjs` (all posts) and
   `pnpm --filter @inexconnect/blog build` — both must pass.
5. Set the backlog row to `published`.
6. Social: the post is now picked up by the social generator. Tell the user
   `/marketing-week` will include it, or run `pnpm social -- --weeks 1` to queue it now.
7. Commit with `feat(blog): publish <slug>` and push the working branch.
   (The site deploys from the main branch; a pull request is the human's call.)

Report: the live URL `https://inexconnect.com/blog/<slug>` (once deployed),
inbound links added, and the social status.
