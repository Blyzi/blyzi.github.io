"use client";

import {
  IconHeading,
  IconPalette,
  IconPhoto,
  IconTypography,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import CopyButton from "@/components/copy-button";
import HomePage from "@/components/home-page";
import ImageLoader from "@/components/image-loader";
import Input from "@/components/input";
import rawMetadataData from "@/contents/metadata.json";
import rawProfileData from "@/contents/profile.json";
import rawResumeData from "@/contents/resume.json";
import rawTalksData from "@/contents/talks.json";
import {
  type Article,
  type FontOption,
  fontOptions,
  type Metadata as MetadataType,
  MetadataSchema as MetadataValidator,
  type Profile,
  type Resume,
  type Talk,
} from "@/lib/schemas";

export default function GeneratorMetadataPage() {
  const [title, setTitle] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [primaryColor, setPrimaryColor] = useState<string>("#8b5cf6");
  const [secondaryColor, setSecondaryColor] = useState<string>("#42ff7b");
  const [font, setFont] = useState<FontOption>("monaspace-neon");
  const [sectionOrder, setSectionOrder] = useState<
    MetadataType["sectionOrder"]
  >(["profile", "articles", "resume", "talks"]);

  const draftMetadataData = useMemo(
    () => ({
      title,
      logo,
      primaryColor,
      secondaryColor,
      font,
      sectionOrder,
    }),
    [title, logo, primaryColor, secondaryColor, font, sectionOrder],
  );

  useEffect(() => {
    if (MetadataValidator.Check(rawMetadataData)) {
      const { title, logo, primaryColor, secondaryColor, font, sectionOrder } =
        rawMetadataData as MetadataType;
      setTitle(title);
      setLogo(logo || "");
      setPrimaryColor(primaryColor);
      setSecondaryColor(secondaryColor);
      if (font) {
        setFont(font);
      }
      if (sectionOrder) {
        setSectionOrder(sectionOrder);
      }
    }
  }, []);

  const profileData = rawProfileData as Profile;
  const talksData = rawTalksData as Talk[];
  const resumeData = rawResumeData as Resume;
  const articlesData: Article[] = [
    {
      slug: "example-article",
      title: "Example Article",
      date: new Date().toISOString().split("T")[0],
      links: [
        {
          label: "Read More",
          url: "https://example.com/article",
        },
      ],
      tags: ["example", "article"],
      flag: "New",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <CopyButton text={JSON.stringify(draftMetadataData)}>
        Copy Metadata
      </CopyButton>

      <div className="flex items-center gap-2 grow">
        <IconHeading />
        <Input
          value={title}
          onChange={setTitle}
          placeholder="Site Title"
          className="grow"
        />
      </div>

      <div className="flex gap-2">
        <IconPhoto />
        <ImageLoader
          value={logo}
          onChange={setLogo}
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>

      <div className="flex gap-6">
        <Input
          mode="color"
          icon={<IconPalette />}
          value={primaryColor}
          onChange={setPrimaryColor}
          placeholder="#8b5cf6"
          className="grow"
        />

        <Input
          mode="color"
          icon={<IconPalette />}
          value={secondaryColor}
          onChange={setSecondaryColor}
          placeholder="#42ff7b"
          className="grow"
        />
      </div>

      <Input
        mode="select"
        icon={<IconTypography />}
        value={font}
        onChange={(v) => setFont(v as FontOption)}
        options={fontOptions.map((f) => ({
          value: f,
          label: f
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
        }))}
        className="grow"
      />

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Section Order</h3>
        <div className="flex flex-col gap-2">
          {sectionOrder.map((section, index) => (
            <div
              key={section}
              className="flex items-center gap-2 p-2 border rounded-lg"
            >
              <span className="grow capitalize">{section}</span>
              <button
                type="button"
                onClick={() => {
                  if (index > 0) {
                    const newSections = [...sectionOrder];
                    [newSections[index - 1], newSections[index]] = [
                      newSections[index],
                      newSections[index - 1],
                    ];
                    setSectionOrder(newSections);
                  }
                }}
                disabled={index === 0}
                className="px-2 py-1 text-sm border rounded disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => {
                  if (index < sectionOrder.length - 1) {
                    const newSections = [...sectionOrder];
                    [newSections[index], newSections[index + 1]] = [
                      newSections[index + 1],
                      newSections[index],
                    ];
                    setSectionOrder(newSections);
                  }
                }}
                disabled={index === sectionOrder.length - 1}
                className="px-2 py-1 text-sm border rounded disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => {
                  setSectionOrder(sectionOrder.filter((_, i) => i !== index));
                }}
                className="px-2 py-1 text-sm border rounded text-red-500 hover:bg-red-50"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {(["profile", "articles", "resume", "talks"] as const).some(
          (section) => !sectionOrder.includes(section),
        ) && (
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium">Add Section</h4>
            <div className="flex flex-wrap gap-2">
              {(["profile", "articles", "resume", "talks"] as const)
                .filter((section) => !sectionOrder.includes(section))
                .map((section) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => {
                      setSectionOrder([...sectionOrder, section]);
                    }}
                    className="px-3 py-1 text-sm border rounded capitalize hover:bg-gray-100"
                  >
                    + {section}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold">Preview</h2>

      <HomePage
        metadataData={draftMetadataData}
        resumeData={resumeData}
        talksData={talksData}
        profileData={profileData}
        articlesData={articlesData}
      />
    </div>
  );
}
