import type { MetadataRoute } from "next";
import rawMetadataData from "@/contents/metadata.json";
import { loadArticles } from "@/lib/load-articles";
import { MetadataSchema } from "@/lib/schemas";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (
    !MetadataSchema.Check(rawMetadataData) ||
    typeof rawMetadataData.websiteUrl !== "string"
  ) {
    return [];
  }

  const articles = loadArticles();
  const baseUrl = rawMetadataData.websiteUrl.replace(/\/+$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/article`, lastModified: new Date() },
  ];

  const articlePages: MetadataRoute.Sitemap = articles
    .filter(
      (article) =>
        typeof article.content === "string" &&
        article.content.trim().length > 0,
    )
    .map((article) => ({
      url: `${baseUrl}/article/${article.slug}`,
      lastModified: new Date(),
    }));

  return [...staticPages, ...articlePages];
}
