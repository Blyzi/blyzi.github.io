import Link from "next/link";
import ArticlePreview from "@/components/article-preview";
import { loadArticles } from "@/lib/load-articles";

export default function Articles() {
  const articles = loadArticles();
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">All Articles</h1>
      <div className="flex flex-col gap-4">
        {sortedArticles.map((article) =>
          article.content && article.content.trim().length > 0 ? (
            <Link key={article.slug} href={`/article/${article.slug}`}>
              <ArticlePreview data={article} />
            </Link>
          ) : (
            <ArticlePreview key={article.slug} data={article} />
          ),
        )}
      </div>
    </div>
  );
}
