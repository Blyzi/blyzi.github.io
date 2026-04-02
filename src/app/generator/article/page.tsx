"use client";

import {
  IconCalendar,
  IconFlag,
  IconHeading,
  IconLink,
  IconPhoto,
  IconTag,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import Article from "@/components/article";
import ArticlePreview from "@/components/article-preview";
import CopyButton from "@/components/copy-button";
import ImageLoader from "@/components/image-loader";
import Input from "@/components/input";
import ItemList from "@/components/item-list";
import { ArticleSchema, type Article as ArticleType } from "@/lib/schemas";

export default function GeneratorArticlePage() {
  const [title, setTitle] = useState<string>("");
  const [flag, setFlag] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>([]);
  const [picture, setPicture] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [images, setImages] = useState<{ path: string; dataUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageMap = useMemo(
    () => Object.fromEntries(images.map((img) => [img.path, img.dataUrl])),
    [images],
  );

  const draftArticleData = useMemo<ArticleType>(
    () => ({
      slug: "",
      title,
      flag,
      date,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      links: links.filter((link) => link.label && link.url),
      picture: picture || undefined,
      authors: authors,
    }),
    [title, flag, date, content, tags, links, picture, authors],
  );

  const copyData = useMemo(() => {
    const { slug: _slug, ...data } = draftArticleData;

    if (images.length === 0) return JSON.stringify(data);
    let embeddedContent = draftArticleData.content || "";
    for (const img of images) {
      embeddedContent = embeddedContent.replaceAll(img.path, img.dataUrl);
    }
    return JSON.stringify({ ...data, content: embeddedContent });
  }, [draftArticleData, images]);

  return (
    <div className="flex flex-col gap-8">
      <CopyButton text={copyData}>Copy Article</CopyButton>

      <div className="grid gap-4 grid-cols-1">
        <Input
          icon={<IconHeading />}
          value={title}
          onChange={setTitle}
          placeholder="Title"
          className="grow"
        />

        <Input
          icon={<IconFlag />}
          value={flag}
          onChange={setFlag}
          placeholder="Flag (e.g., 'Conference Name', 'Published', etc.)"
          className="grow"
        />

        <Input
          icon={<IconCalendar />}
          type="date"
          value={date}
          onChange={setDate}
          placeholder="Date"
          className="grow"
        />

        <Input
          icon={<IconTag />}
          value={tags}
          onChange={setTags}
          placeholder="Tags (comma-separated)"
          className="grow"
        />

        <Input
          icon={<IconUser />}
          value={authors}
          onChange={setAuthors}
          placeholder="Authors (Markdown supported)"
          className="grow"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Article Thumbnail</h3>
          {picture && (
            <button
              type="button"
              onClick={() => setPicture("")}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete Picture
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <IconPhoto />
          <ImageLoader
            value={picture}
            onChange={setPicture}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>

      <ItemList
        icon={<IconLink />}
        items={links}
        onAdd={() => setLinks([...links, { label: "", url: "" }])}
        onRemove={(index) => setLinks(links.filter((_, i) => i !== index))}
        addButtonText="Add Link"
        renderItem={(link, index) => (
          <div className="flex gap-2 grow">
            <Input
              value={link.label}
              onChange={(value) => {
                const newLinks = [...links];
                newLinks[index].label = value;
                setLinks(newLinks);
              }}
              placeholder="Link Label"
              className="grow"
            />
            <Input
              value={link.url}
              onChange={(value) => {
                const newLinks = [...links];
                newLinks[index].url = value;
                setLinks(newLinks);
              }}
              placeholder="https://..."
              className="grow"
            />
          </div>
        )}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === "string") {
                setImages((prev) => [
                  ...prev,
                  {
                    path: file.name,
                    dataUrl: reader.result as string,
                  },
                ]);
              }
            };
            reader.readAsDataURL(file);
          });
          e.target.value = "";
        }}
      />
      <ItemList
        icon={<IconPhoto />}
        items={images}
        onAdd={() => fileInputRef.current?.click()}
        onRemove={(index) => setImages(images.filter((_, i) => i !== index))}
        addButtonText="Add Image"
        renderItem={(img) => (
          <div className="flex items-center gap-2 grow">
            <Image
              src={img.dataUrl}
              alt={img.path}
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded"
            />
            <span className="font-mono text-sm">{img.path}</span>
          </div>
        )}
      />

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Content</span>
        <Input
          mode="textarea"
          value={content}
          onChange={setContent}
          placeholder="Write your article content..."
        />
      </div>

      {ArticleSchema.Check(draftArticleData) && (
        <>
          <ArticlePreview data={draftArticleData} />
          <Article data={draftArticleData} imageMap={imageMap} />
        </>
      )}
    </div>
  );
}
