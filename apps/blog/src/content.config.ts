import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Astro Content Collections schema — mirrors keystatic.config.ts field for
 * field. If the two ever disagree, the build fails. That is intentional.
 *
 * Reading rules: a post is published when draft = false and its publish date
 * is today or earlier. Index sorts newest first.
 */

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    headline: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    summary: z.string().optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    author: reference("authors").optional(),
    tags: z.array(reference("tags")).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/tags" }),
  schema: z.object({
    name: z.string(),
  }),
});

export const collections = { posts, authors, tags };
