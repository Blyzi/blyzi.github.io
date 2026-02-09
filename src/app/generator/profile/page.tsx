"use client";

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandTwitch,
  IconBrandX,
  IconBrandYoutube,
  IconHeading,
  IconMail,
  IconMoodSmileBeam,
  IconPhoto,
  IconSchool,
  IconTextCaption,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import CopyButton from "@/components/copy-button";
import ImageLoader from "@/components/image-loader";
import Input from "@/components/input";
import Profile from "@/components/profile";
import profileData from "@/contents/profile.json";
import type { SocialLink } from "@/lib/schemas";
import { ProfileSchema as ProfileValidator } from "@/lib/schemas";

export default function GeneratorProfilePage() {
  const [title, setTitle] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [bio, setBio] = useState<string>("");

  const draftProfileData = useMemo(
    () => ({
      title,
      bio,
      socialLinks,
      picture,
    }),
    [title, bio, socialLinks, picture],
  );

  useEffect(() => {
    if (ProfileValidator.Check(profileData)) {
      const { title, bio, socialLinks, picture } = profileData;
      setTitle(title);
      setBio(bio || "");
      setSocialLinks(socialLinks || []);
      setPicture(picture || "");
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <CopyButton text={JSON.stringify(draftProfileData)}>
        Copy Profile
      </CopyButton>

      <div className="grid gap-4 grid-cols-2">
        <Input
          icon={<IconHeading />}
          value={title}
          onChange={setTitle}
          placeholder="Title"
          className="grow"
        />
        {[
          { platform: "mail", icon: <IconMail /> },
          { platform: "twitter", icon: <IconBrandX /> },
          { platform: "linkedin", icon: <IconBrandLinkedin /> },
          { platform: "github", icon: <IconBrandGithub /> },
          { platform: "youtube", icon: <IconBrandYoutube /> },
          { platform: "twitch", icon: <IconBrandTwitch /> },
          { platform: "medium", icon: <IconBrandMedium /> },
          { platform: "scholar", icon: <IconSchool /> },
          { platform: "huggingface", icon: <IconMoodSmileBeam /> },
          { platform: "facebook", icon: <IconBrandFacebook /> },
          { platform: "instagram", icon: <IconBrandInstagram /> },
        ].map(({ platform, icon }) => (
          <Input
            key={platform}
            icon={icon}
            value={
              socialLinks.find((link) => link.platform === platform)?.url || ""
            }
            onChange={(url) => {
              setSocialLinks((prev) => {
                const existingLink = prev.find(
                  (link) => link.platform === platform,
                );
                if (existingLink) {
                  if (url.trim() === "") {
                    return prev.filter((link) => link.platform !== platform);
                  }

                  return prev.map((link) =>
                    link.platform === platform ? { ...link, url } : link,
                  );
                } else {
                  return [
                    ...prev,
                    { platform: platform as SocialLink["platform"], url },
                  ];
                }
              });
            }}
            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
            className="grow"
          />
        ))}
      </div>

      <Input
        mode="textarea"
        value={bio}
        onChange={setBio}
        placeholder="Bio (Markdown supported)"
        icon={<IconTextCaption />}
      />

      <div className="flex gap-2">
        <IconPhoto />
        <ImageLoader
          value={picture}
          onChange={setPicture}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      <Profile className="w-5/6 xl:w-4/5 mx-auto" data={draftProfileData} />
    </div>
  );
}
