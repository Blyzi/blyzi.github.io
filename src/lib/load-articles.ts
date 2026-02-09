import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import slugify from "slugify";
import { type Article, ArticleDataSchema } from "./schemas";

export function loadArticles(): Article[] {
  const articlesDirectory = join(process.cwd(), "src/contents/articles");
  const files = readdirSync(articlesDirectory);

  const articles: Article[] = [];
  for (const file of files) {
    if (file.endsWith(".json")) {
      let slug = slugify(file.replace(".json", ""), {
        lower: true,
        strict: true,
        locale: "en",
      });

      while (articles.find((a) => a.slug === slug)) {
        // Ensure unique slugs by appending a counter
        const count = articles.filter((a) => a.slug.startsWith(slug)).length;
        slug = `${slug}-${count + 1}`;
      }

      const content = JSON.parse(
        readFileSync(join(articlesDirectory, file), "utf-8"),
      );

      if (!ArticleDataSchema.Check(content)) {
        console.warn(`Article ${file} does not conform to the schema.`);
        continue;
      }

      articles.push({ slug, ...content });
    }
  }

  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return sortedArticles;
}
