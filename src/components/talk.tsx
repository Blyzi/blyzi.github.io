import clsx from "clsx";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mathFromMarkdown } from "mdast-util-math";
import { gfm } from "micromark-extension-gfm";
import { math } from "micromark-extension-math";
import type { Talk as TalkType } from "@/lib/schemas";
import Renderer from "./renderer";

type TalkProps = {
  data: TalkType;
} & Omit<React.HTMLAttributes<HTMLElement>, "data">;

export default function Talk({ data, className, ...props }: TalkProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-2 p-4 border border-gray-300 bg-white rounded-lg transition-colors",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-(--secondary)">
          {data.title}
        </h3>
        <span className="text-sm text-gray-500">
          {new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <Renderer
        data={fromMarkdown(data.description, {
          extensions: [gfm(), math()],
          mdastExtensions: [gfmFromMarkdown(), mathFromMarkdown()],
        })}
      />
      {(data.links && data.links.length > 0) || data.flag ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {data.flag && (
            <span className="text-sm text-(--primary) border-(--primary) border bg-(--primary)/20 hover:bg-(--primary)/40 px-2 py-1 rounded-lg transition-colors">
              {data.flag}
            </span>
          )}
          {data.links && data.links.length > 0
            ? data.links.map((link, linkIndex) => (
                <a
                  key={`${link.label}-${linkIndex}`}
                  href={link.url}
                  className="text-sm border rounded-lg px-2 py-1 hover:bg-gray-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}
