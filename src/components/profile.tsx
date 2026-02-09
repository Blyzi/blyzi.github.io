import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandTwitch,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
  IconMoodSmileBeam,
  IconSchool,
} from "@tabler/icons-react";
import clsx from "clsx";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mathFromMarkdown } from "mdast-util-math";
import { gfm } from "micromark-extension-gfm";
import { math } from "micromark-extension-math";
import Image from "next/image";
import type { Profile as ProfileType } from "@/lib/schemas";
import Renderer from "./renderer";

type ProfileProps = {
  data: ProfileType;
} & Omit<React.HTMLAttributes<HTMLElement>, "data">;

export default function Profile({ data, className, ...props }: ProfileProps) {
  return (
    <div className={clsx("flex flex-col gap-4", className)} {...props}>
      <div className="flex gap-4">
        {data.picture && (
          <Image
            src={data.picture}
            alt={data.title}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full shadow-lg object-cover"
          />
        )}
        <div className="flex-col flex gap-2 justify-center">
          <h1 className="text-2xl md:text-3xl font-bold">{data.title}</h1>
          {typeof data.socialLinks !== "undefined" &&
            data.socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-4">
                {data.socialLinks.map(
                  (link, index) =>
                    link.url && (
                      <a
                        key={`${link.platform}-${index}`}
                        href={
                          link.platform === "mail"
                            ? `mailto:${link.url}`
                            : link.url
                        }
                        className="flex gap-2 items-center hover:opacity-70 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.platform}
                      >
                        {link.platform === "github" && <IconBrandGithub />}
                        {link.platform === "linkedin" && <IconBrandLinkedin />}
                        {link.platform === "medium" && <IconBrandMedium />}
                        {link.platform === "twitter" && <IconBrandX />}
                        {link.platform === "youtube" && <IconBrandYoutube />}
                        {link.platform === "twitch" && <IconBrandTwitch />}
                        {link.platform === "scholar" && <IconSchool />}
                        {link.platform === "huggingface" && (
                          <IconMoodSmileBeam />
                        )}
                        {link.platform === "facebook" && <IconBrandFacebook />}
                        {link.platform === "instagram" && (
                          <IconBrandInstagram />
                        )}
                        {link.platform === "mail" && <IconMail />}
                        <span className="hidden md:inline capitalize hover:underline">
                          {link.platform}
                        </span>
                      </a>
                    ),
                )}
              </div>
            )}
        </div>
      </div>
      {data.bio && (
        <Renderer
          data={fromMarkdown(data.bio, {
            extensions: [gfm(), math()],
            mdastExtensions: [gfmFromMarkdown(), mathFromMarkdown()],
          })}
        />
      )}
    </div>
  );
}
