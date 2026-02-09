import rawMetadataData from "@/contents/metadata.json";
import type { Metadata } from "@/lib/schemas";

export default function GeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metadataData = rawMetadataData as Metadata;

  return (
    <div
      className="flex flex-col gap-4 p-8"
      style={
        {
          "--primary": metadataData.primaryColor,
          "--secondary": metadataData.secondaryColor,
          fontFamily: `var(--font-${metadataData.font})`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
