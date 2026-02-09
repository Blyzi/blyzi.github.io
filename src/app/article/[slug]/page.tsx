import Link from "next/link";
import Article from "@/components/article";
import { loadArticles } from "@/lib/load-articles";

export function generateStaticParams() {
  // Read all files from the articles directory
  const articles = loadArticles();

  return articles.map(({ slug }) => ({
    slug,
  }));
}

export default async function Publication({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = loadArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <>
        <h1 className="text-4xl font-bold">Article not found</h1>
        <Link href="/article" className="text-(--primary) hover:underline">
          ← Back to all articles
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/article" className="text-(--primary) hover:underline mb-4">
        ← Back to all articles
      </Link>
      <Article data={article} />
    </>
  );
}
