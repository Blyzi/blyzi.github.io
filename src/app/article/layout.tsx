import Header from "@/components/header";
import rawMetadataData from "@/contents/metadata.json";
import type { Metadata } from "@/lib/schemas";

export default function ArticleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const metadataData = rawMetadataData as Metadata;

  return (
    <div
      style={
        {
          "--primary": metadataData.primaryColor,
          "--secondary": metadataData.secondaryColor,
          fontFamily: `var(--font-${metadataData.font})`,
        } as React.CSSProperties
      }
    >
      <Header data={metadataData} />
      <div className="flex flex-col gap-4 w-5/6 xl:w-4/5 mx-auto p-2 md:p-8">
        {children}
      </div>
    </div>
  );
}
