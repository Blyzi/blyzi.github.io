import { clsx } from "clsx";
import type { PhrasingContent, Root } from "mdast";
import type { JSX } from "react";
import { BlockMath, InlineMath } from "react-katex";
import SyntaxHighlighter from "react-syntax-highlighter";
import a11y from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import "katex/dist/katex.min.css";
import Image from "next/image";

// Helper function to recursively render inline content
function renderInlineContent(
  children: PhrasingContent[],
  keyPrefix: string,
): (JSX.Element | null)[] {
  return children.map((child, index) => {
    const childKey = `${keyPrefix}-${child.type}-${index}`;

    if (child.type === "text") {
      return <span key={childKey}>{child.value}</span>;
    }
    if (child.type === "strong") {
      return (
        <strong key={childKey}>
          {renderInlineContent(child.children, childKey)}
        </strong>
      );
    }
    if (child.type === "emphasis") {
      return (
        <em key={childKey}>{renderInlineContent(child.children, childKey)}</em>
      );
    }
    if (child.type === "delete") {
      return (
        <span key={childKey} className="line-through">
          {renderInlineContent(child.children, childKey)}
        </span>
      );
    }
    if (child.type === "link") {
      // Check if link text is "image" to render as image
      const linkText = child.children
        .map((c) => (c.type === "text" ? c.value : ""))
        .join("");

      if (linkText.toLowerCase() === "image") {
        if (child.title) {
          return (
            <span key={childKey} className="inline-block w-full">
              <Image
                src={child.url}
                alt={linkText}
                width={800}
                height={600}
                className="mx-auto h-auto w-2/3 block"
              />
              <span className="text-sm text-gray-600 mt-2 text-center block">
                {child.title}
              </span>
            </span>
          );
        }
        return (
          <Image
            key={childKey}
            src={child.url}
            alt={linkText}
            width={800}
            height={600}
            className="inline-block h-auto mx-auto w-2/3"
          />
        );
      }

      return (
        <a
          key={childKey}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--primary) hover:underline"
        >
          {renderInlineContent(child.children, childKey)}
        </a>
      );
    }
    if (child.type === "inlineCode") {
      return (
        <code
          key={childKey}
          className="bg-gray-100 px-1 py-0.5 rounded text-sm"
        >
          {child.value}
        </code>
      );
    }
    if (child.type === "inlineMath") {
      return <InlineMath key={childKey} math={child.value} />;
    }
    if (child.type === "footnoteReference") {
      return (
        <sup key={childKey}>
          <a
            href={`#fn-${child.identifier}`}
            className="text-(--primary) hover:underline"
          >
            [{child.label}]
          </a>
        </sup>
      );
    }
    if (child.type === "break") {
      return <br key={childKey} />;
    }
    if (child.type === "image") {
      if (child.title) {
        return (
          <span key={childKey} className="inline-block my-4">
            <Image
              src={child.url}
              alt={child.alt || ""}
              width={800}
              height={600}
              className="max-w-full h-auto block"
            />
            <span className="text-sm text-gray-600 mt-2 text-center block">
              {child.title}
            </span>
          </span>
        );
      }
      return (
        <Image
          key={childKey}
          src={child.url}
          alt={child.alt || ""}
          width={800}
          height={600}
          className="inline-block max-w-full h-auto"
        />
      );
    }
    return null;
  });
}

export default function Renderer({ data }: { data: Root }) {
  return (
    <div className="flex flex-col gap-4">
      {data.children.map((node, index) => {
        const nodeKey = `${node.type}-${index}`;

        // Paragraph
        if (node.type === "paragraph") {
          return (
            <p key={nodeKey} className="text-base leading-relaxed">
              {renderInlineContent(node.children, nodeKey)}
            </p>
          );
        }

        // Heading
        if (node.type === "heading") {
          const HeadingTag = `h${node.depth}` as keyof JSX.IntrinsicElements;
          const className = clsx({
            "text-3xl font-bold": node.depth === 1,
            "text-2xl font-bold": node.depth === 2,
            "text-xl font-bold": node.depth === 3,
            "text-lg font-semibold": node.depth === 4,
            "text-base font-semibold": node.depth === 5,
            "text-sm font-semibold": node.depth === 6,
          });
          return (
            <HeadingTag key={nodeKey} className={className}>
              {renderInlineContent(node.children, nodeKey)}
            </HeadingTag>
          );
        }

        // Code block
        if (node.type === "code") {
          return (
            <SyntaxHighlighter
              key={nodeKey}
              language={node.lang || "text"}
              style={a11y}
              customStyle={{
                borderRadius: "0.375rem",
                padding: "1rem",
              }}
            >
              {node.value}
            </SyntaxHighlighter>
          );
        }

        // List
        if (node.type === "list") {
          const ListTag = node.ordered ? "ol" : "ul";
          const hasCheckboxes = node.children.some(
            (item) => item.checked !== null && item.checked !== undefined,
          );

          return (
            <ListTag
              key={nodeKey}
              className={clsx({
                "list-decimal list-inside": node.ordered,
                "list-disc list-inside": !node.ordered && !hasCheckboxes,
                "list-none": hasCheckboxes,
              })}
            >
              {node.children.map((item, itemIndex) => {
                const hasCheckbox =
                  item.checked !== null && item.checked !== undefined;
                const itemKey = `${nodeKey}-listItem-${itemIndex}`;

                return (
                  <li
                    key={itemKey}
                    className={clsx({ "flex items-start gap-2": hasCheckbox })}
                  >
                    {hasCheckbox && (
                      <input
                        type="checkbox"
                        checked={item.checked === true}
                        disabled
                        className="mt-1 cursor-default"
                      />
                    )}
                    <span>
                      {item.children.map((child) => {
                        if (child.type === "paragraph") {
                          return renderInlineContent(
                            child.children,
                            `${nodeKey}-${itemIndex}`,
                          );
                        }
                        return null;
                      })}
                    </span>
                  </li>
                );
              })}
            </ListTag>
          );
        }

        // Table
        if (node.type === "table") {
          const numCols = node.children[0]?.children.length || 0;
          const align = node.align || [];

          return (
            <div
              key={nodeKey}
              className="grid border border-gray-300 rounded-lg overflow-hidden"
              style={{
                gridTemplateColumns: `repeat(${numCols}, 1fr)`,
              }}
            >
              {node.children.map((row, rowIndex) =>
                row.children.map((cell, cellIndex) => {
                  const cellKey = `${nodeKey}-${rowIndex}-${cellIndex}`;
                  const alignment = align[cellIndex];

                  return (
                    <div
                      key={cellKey}
                      className={clsx("p-2 border-gray-300", {
                        "border-b": rowIndex < node.children.length - 1,
                        "border-r": cellIndex < row.children.length - 1,
                        "text-left": !alignment || alignment === "left",
                        "text-center": alignment === "center",
                        "text-right": alignment === "right",
                      })}
                    >
                      {renderInlineContent(cell.children, cellKey)}
                    </div>
                  );
                }),
              )}
            </div>
          );
        }

        // Block math
        if (node.type === "math") {
          return (
            <div key={nodeKey} className="my-4 overflow-x-auto">
              <BlockMath math={node.value} />
            </div>
          );
        }

        // Footnote definition
        if (node.type === "footnoteDefinition") {
          return (
            <div
              key={nodeKey}
              id={`fn-${node.identifier}`}
              className="text-sm text-gray-600 border-l-2 border-gray-300 pl-4 py-2"
            >
              <span className="font-semibold">[{node.label}]: </span>
              {node.children.map((child, childIdx) => {
                const childKey = `${nodeKey}-para-${childIdx}`;
                if (child.type === "paragraph") {
                  return (
                    <span key={childKey}>
                      {renderInlineContent(child.children, childKey)}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          );
        }

        // Blockquote
        if (node.type === "blockquote") {
          return (
            <blockquote
              key={nodeKey}
              className="border-l-4 border-gray-300 pl-4 py-2 text-gray-600 italic"
            >
              {node.children.map((child, childIdx) => {
                const childKey = `${nodeKey}-para-${childIdx}`;
                if (child.type === "paragraph") {
                  return (
                    <p key={childKey}>
                      {renderInlineContent(child.children, childKey)}
                    </p>
                  );
                }
                return null;
              })}
            </blockquote>
          );
        }

        // Thematic break (horizontal rule)
        if (node.type === "thematicBreak") {
          return <hr key={nodeKey} className="my-4 border-gray-300" />;
        }

        return null;
      })}
    </div>
  );
}
