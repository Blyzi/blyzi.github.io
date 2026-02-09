import clsx from "clsx";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mathFromMarkdown } from "mdast-util-math";
import { gfm } from "micromark-extension-gfm";
import { math } from "micromark-extension-math";
import Image from "next/image";
import type { Article as ArticleType } from "@/lib/schemas";
import Renderer from "./renderer";
import Link from "next/link";

type ArticleProps = {
  data: ArticleType;
} & Omit<React.HTMLAttributes<HTMLElement>, "data">;

export default function ArticlePreview({
  data,
  className,
  ...props
}: ArticleProps) {
  return (
    <div
      className={clsx(
        "border rounded-lg border-gray-300 p-4 flex gap-4 items-center bg-white transition-colors group",
        className,
        { "hover:border-(--secondary)": data.content },
      )}
      {...props}
    >
      {data.picture && (
        <Image
          src={data.picture}
          alt={data.title}
          width={144}
          height={144}
          className="w-36 h-36 object-cover hidden md:block"
        />
      )}
      <div className="flex flex-col gap-2 justify-center">
        <h2 className="text-2xl font-bold text-(--secondary) text-pretty">
          {data.content || (data.links && data.links.length > 0) ? (
            <Link
              href={
                // biome-ignore lint/style/noNonNullAssertion: We know that if data.content is falsy, then data.links must be non-empty
                data.content ? `/articles/${data.slug}` : data.links![0].url
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {data.title}
            </Link>
          ) : (
            data.title
          )}
        </h2>
        <div className="text-gray-600 text-sm">
          <Renderer
            data={fromMarkdown(
              typeof data.authors === "string" && data.authors.trim() !== ""
                ? `${data.authors} (${new Date(data.date).getFullYear()})`
                : new Date(data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }),
              {
                extensions: [gfm(), math()],
                mdastExtensions: [gfmFromMarkdown(), mathFromMarkdown()],
              },
            )}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-(--primary) border-(--primary) border bg-(--primary)/20 hover:bg-(--primary)/40 px-2 py-1 rounded-lg transition-colors">
            {data.flag}
          </span>

          {data.tags &&
            data.tags.filter((tag) => tag.trim() !== "").length > 0 &&
            data.tags
              .filter((tag) => tag.trim() !== "")
              .map((tag) => (
                <span
                  key={`${tag}`}
                  className="text-sm text-(--secondary) border-(--secondary) border bg-(--secondary)/20 hover:bg-(--secondary)/40 px-2 py-1 rounded-lg transition-colors"
                >
                  {tag}
                </span>
              ))}

          {data.links
            ? data.links
                .filter(
                  (link) => link.label.trim() !== "" && link.url.trim() !== "",
                )
                .map((link, index) => (
                  <a
                    key={`${link.label}-${index}`}
                    className="text-sm border rounded-lg px-2 py-1 hover:bg-gray-200 transition-colors hover:underline"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))
            : null}
        </div>
      </div>
    </div>
  );
}
