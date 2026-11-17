import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Keystatic content model — mirrors src/content.config.ts field for field.
 * If the two ever disagree, the build fails. That is intentional.
 *
 * Storage: LOCAL mode for now (edits write files under src/content/).
 * GitHub mode is a launch-phase switch: change `storage` to
 *   { kind: "github", repo: { owner: "manikumarkv", name: "inexconnect" },
 *     pathPrefix: "apps/blog/" }
 * and set the KEYSTATIC_* env vars (see .env.example). Do not commit secrets.
 */
export default config({
  storage: { kind: "local" },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "body" },
      columns: ["title", "date"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        headline: fields.text({
          label: "Headline",
          description: "Display title, if different from the slug source.",
        }),
        date: fields.date({
          label: "Publish date",
          validation: { isRequired: true },
        }),
        updated: fields.date({ label: "Updated date" }),
        draft: fields.checkbox({ label: "Draft", defaultValue: true }),
        summary: fields.text({ label: "Summary", multiline: true }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        coverAlt: fields.text({ label: "Cover image alt text" }),
        author: fields.relationship({ label: "Author", collection: "authors" }),
        tags: fields.array(fields.relationship({ label: "Tag", collection: "tags" }), {
          label: "Tags",
        }),
        body: fields.mdx({ label: "Body" }),
        seoTitle: fields.text({ label: "SEO title" }),
        seoDescription: fields.text({ label: "SEO description", multiline: true }),
        category: fields.text({ label: "Category" }),
        series: fields.text({ label: "Series" }),
        seriesPart: fields.integer({ label: "Series part" }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        showToc: fields.checkbox({ label: "Show table of contents", defaultValue: false }),
        tldr: fields.array(fields.text({ label: "Point" }), { label: "TL;DR points" }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQ" },
        ),
      },
    }),
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        avatar: fields.image({
          label: "Avatar",
          directory: "public/images/authors",
          publicPath: "/images/authors/",
        }),
      },
    }),
    tags: collection({
      label: "Tags",
      slugField: "name",
      path: "src/content/tags/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
      },
    }),
  },
  singletons: {
    blogSettings: singleton({
      label: "Blog settings",
      path: "src/content/settings/blog",
      format: { data: "json" },
      schema: {
        headline: fields.text({ label: "Index headline" }),
        intro: fields.text({ label: "Index intro", multiline: true }),
        postsPerPage: fields.integer({ label: "Posts per page", defaultValue: 10 }),
      },
    }),
  },
});
