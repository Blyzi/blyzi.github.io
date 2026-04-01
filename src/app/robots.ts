import type { MetadataRoute } from "next";
import { MetadataSchema } from "@/lib/schemas";
import rawMetadataData from "@/contents/metadata.json";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/generator",
    },
    ...(MetadataSchema.Check(rawMetadataData) &&
      typeof rawMetadataData.websiteUrl === "string" && {
        sitemap: `${new URL(rawMetadataData.websiteUrl).origin}/sitemap.xml`,
      }),
  };
}
