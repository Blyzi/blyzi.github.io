import clsx from "clsx";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mathFromMarkdown } from "mdast-util-math";
import { gfm } from "micromark-extension-gfm";
import { math } from "micromark-extension-math";
import type { Resume as ResumeType } from "@/lib/schemas";
import Renderer from "./renderer";

type ResumeProps = {
  data: ResumeType;
} & Omit<React.HTMLAttributes<HTMLElement>, "data">;

function ExperienceCard({
  experience,
}: {
  experience: ResumeType["experiences"][0];
}) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
        <h3 className="text-xl font-semibold">{experience.position}</h3>
        <span className="text-sm text-gray-500">
          {new Date(experience.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}{" "}
          -{" "}
          {experience.endDate
            ? new Date(experience.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "Present"}
        </span>
      </div>
      <p
        className={clsx(
          "text-lg font-medium",
          experience.education ? "text-(--secondary)" : "text-(--primary)",
        )}
      >
        {experience.companyUrl ? (
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {experience.company}
          </a>
        ) : (
          experience.company
        )}
      </p>
      {experience.description && (
        <Renderer
          data={fromMarkdown(experience.description, {
            extensions: [gfm(), math()],
            mdastExtensions: [gfmFromMarkdown(), mathFromMarkdown()],
          })}
        />
      )}
    </div>
  );
}

function TimelineDot({ education }: { education: boolean }) {
  return (
    <div className="shrink-0 pt-2.5">
      <div className="relative w-3 h-3">
        <div
          className={clsx(
            "w-3 h-3 rounded-full ring-4 transition-all",
            education
              ? "bg-(--secondary) ring-(--secondary)/20"
              : "bg-(--primary) ring-(--primary)/20",
          )}
        />
        <div
          className={clsx(
            "absolute inset-0 w-3 h-3 rounded-full opacity-0 group-hover:opacity-75 group-hover:animate-ping",
            education ? "bg-(--secondary)" : "bg-(--primary)",
          )}
        />
      </div>
    </div>
  );
}

export default function Resume({ data, className, ...props }: ResumeProps) {
  const { centered, experiences } = data;

  if (centered) {
    return (
      <div className={clsx("relative", className)} {...props}>
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gray-300 hidden md:block" />
        <div className="absolute left-1.25 top-4 bottom-4 w-0.5 bg-gray-300 md:hidden" />

        <div className="flex flex-col gap-8">
          {experiences.map((experience, index) => (
            <div
              key={`${experience.company}-${index}`}
              className={clsx(
                "relative group",
                "flex gap-6",
                "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6",
              )}
            >
              {/* Mobile: always dot then content */}
              <div className="md:hidden flex gap-6">
                <TimelineDot education={experience.education} />
                <ExperienceCard experience={experience} />
              </div>

              {/* Desktop: education on left, work on right */}
              <div
                className={clsx(
                  "hidden md:flex",
                  experience.education ? "justify-end" : "",
                )}
              >
                {experience.education && (
                  <ExperienceCard experience={experience} />
                )}
              </div>
              <div className="hidden md:block">
                <TimelineDot education={experience.education} />
              </div>
              <div
                className={clsx(
                  "hidden md:flex",
                  !experience.education ? "justify-start" : "",
                )}
              >
                {!experience.education && (
                  <ExperienceCard experience={experience} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("relative", className)} {...props}>
      <div className="absolute left-1.25 top-4 bottom-4 w-0.5 bg-gray-300" />

      <div className="flex flex-col gap-8">
        {experiences.map((experience, index) => (
          <div
            key={`${experience.company}-${index}`}
            className="relative flex gap-6 group"
          >
            <TimelineDot education={experience.education} />
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
    </div>
  );
}
