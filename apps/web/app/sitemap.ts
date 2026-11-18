import type { MetadataRoute } from "next";
import { mcpServers } from "@/content/mcps";
import { services } from "@/content/site";
import { SITE } from "@inexconnect/ui";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/builds",
    "/mcps",
    "/about",
    "/request-a-quote",
    "/book",
    "/contact",
  ];
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE.url}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${SITE.url}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...mcpServers.map((mcp) => ({
      url: `${SITE.url}/mcps/${mcp.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
