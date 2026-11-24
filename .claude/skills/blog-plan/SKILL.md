---
name: blog-plan
description: Refreshes the iNexConnect blog backlog — finds topic gaps, current developer demand and stale posts, and ranks what to write next in apps/blog/editorial/BACKLOG.md. Use for "what should we blog about", "plan the blog", or /blog-plan.
---

# Blog plan

1. Run `blog-planner` in plan mode.
2. Run `node apps/blog/scripts/check-posts.mjs` and add any post with errors
   to "Refresh old posts" in the backlog.
3. Report the top 5 new ideas (title + why now) and the posts to refresh, then
   suggest `/blog-post` to write the top one. In a cloud session, commit and push.
