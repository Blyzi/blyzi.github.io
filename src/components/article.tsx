import clsx from "clsx";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mathFromMarkdown } from "mdast-util-math";
import { gfm } from "micromark-extension-gfm";
import { math } from "micromark-extension-math";
import type { Article as ArticleType } from "@/lib/schemas";
import Renderer from "./renderer";

type ArticleProps = {
  data: ArticleType;
} & Omit<React.HTMLAttributes<HTMLElement>, "data">;

export default function Article({ data, className, ...props }: ArticleProps) {
  return (
    <div className={clsx("flex flex-col gap-4", className)} {...props}>
      <h1 className="text-4xl font-bold text-(--secondary) text-pretty">
        {data.title}
      </h1>

      <div className="flex flex-col gap-2 text-gray-600 text-sm">
        {data.authors && (
          <Renderer
            data={fromMarkdown(data.authors, {
              extensions: [gfm(), math()],
              mdastExtensions: [gfmFromMarkdown(), mathFromMarkdown()],
            })}
          />
        )}

        <time dateTime={data.date}>
          {new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      <div className="flex flex-wrap gap-2">
        <p className="text-sm text-(--primary) bg-(--primary)/20 hover:bg-(--primary)/40 border-(--primary) border px-3 py-1 rounded-lg">
          {data.flag}
        </p>
        {data.tags && data.tags.length > 0
          ? data.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-(--secondary) border-(--secondary) border bg-(--secondary)/20 hover:bg-(--secondary)/40 px-3 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))
          : null}

        {data.links && data.links.length > 0
          ? data.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="text-sm border rounded-lg px-3 py-1 hover:underline hover:bg-gray-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))
          : null}
      </div>

      {data.content && (
        <div className="prose prose-lg max-w-none">
          <Renderer
            data={fromMarkdown(data.content, {
              extensions: [gfm(), math()],
              mdastExtensions: [gfmFromMarkdown(), mathFromMarkdown()],
            })}
          />
        </div>
      )}
    </div>
  );
}
