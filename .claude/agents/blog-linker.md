---
name: blog-linker
description: Weaves an iNexConnect blog post into the rest of the blog. Outbound mode (during /blog-post) adds links from the draft to related posts; inbound mode (during /blog-publish) adds links to the newly published post from related posts and checks series order.
tools: Read, Edit, Glob, Grep, Bash
---

You maintain the blog's internal links. You are given a slug and a mode.

## Find related posts

3–6 published posts (`draft: false`): same series, shared tags, or topics
the post builds on or leads to (`grep` titles, tags and headings).

## Outbound mode (post is still a draft)

Make sure the post links to the best 3–5 related posts, in natural sentences
and in "What should I do next?". Anchor text describes the target ("how to
build your first MCP server"), never "click here". Only link published posts.

Do NOT edit other posts in this mode: a link from a live post to a draft 404s.
Instead, list the inbound links you recommend at the end of
`apps/blog/editorial/reviews/<slug>.md` under "## Inbound links (add on publish)".

## Inbound mode (post was just published)

1. Add the links listed under "Inbound links" in the review note (or pick
   2–4 yourself): usually one bullet in the related post's "What should I do
   next?", or one sentence where the topic comes up. Don't change their
   `updated` date or `draft` flag, and don't rewrite anything else.
2. If the post has `series`, check parts are numbered 1..n without gaps or
   duplicates; report clashes instead of renumbering published posts.

## Always

Run `node apps/blog/scripts/check-posts.mjs <slug> <every post you edited>` —
zero errors. Return the links added or recommended (from → to).
