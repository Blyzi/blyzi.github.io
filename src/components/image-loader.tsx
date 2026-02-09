"use client";

import { IconPhotoEdit } from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";

type ImageLoaderProps = {
  value: string;
  onChange: (base64: string) => void;
} & Omit<React.HTMLAttributes<HTMLElement>, "onChange">;

export default function ImageLoader({
  value,
  onChange,
  className,
  ...props
}: ImageLoaderProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const mimeType = file.type;

    const maxFileSize = 1 * 1024 * 1024; // 1MB

    // For SVG, WebP, or any file under 1MB, keep the original as-is
    if (
      mimeType === "image/svg+xml" ||
      mimeType === "image/webp" ||
      file.size <= maxFileSize
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // For larger files, resize and preserve the original format
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      const maxSize = 500;
      let width = img.width;
      let height = img.height;

      // Resize the image
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      // Re-encode using the original MIME type (fallback to PNG for lossless formats)
      const outputType = mimeType === "image/jpeg" ? "image/jpeg" : "image/png";
      const quality = mimeType === "image/jpeg" ? 0.95 : undefined;
      const base64String = canvas.toDataURL(outputType, quality);
      onChange(base64String);

      // Cleanup
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  };

  return (
    <label
      htmlFor="file-input"
      className={clsx("relative group cursor-pointer block", className)}
      {...props}
    >
      <input
        type="file"
        accept="image/*"
        id="file-input"
        onChange={handleFileChange}
        className="hidden"
      />
      <Image
        src={
          value ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        }
        alt="Profile"
        className={className}
        width={96}
        height={96}
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center pointer-events-none z-10">
        <IconPhotoEdit
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
          size={24}
        />
      </div>
    </label>
  );
}
