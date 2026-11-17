import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import type { APIContext } from "astro";
import settings from "../content/settings/blog.json";

type Post = CollectionEntry<"posts">;

export async function GET(context: APIContext) {
  const now = new Date();
  const posts: Post[] = (await getCollection("posts"))
    .filter((post: Post) => !post.data.draft && post.data.date <= now)
    .sort((a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "iNexConnect Blog",
    description: settings.intro,
    site: context.site ?? "https://inexconnect.com/blog",
    items: posts.map((post) => ({
      title: post.data.headline ?? post.data.title,
      pubDate: post.data.date,
      description: post.data.summary ?? "",
      link: `/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
