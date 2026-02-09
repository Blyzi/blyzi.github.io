import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "@/lib/schemas";

type HeaderProps = {
  data: Metadata;
} & Omit<React.HTMLAttributes<HTMLElement>, "data">;

export default function Header({ data, className, ...props }: HeaderProps) {
  return (
    <div
      className={clsx(
        "flex gap-4 items-center sticky top-0 bg-gray-50 z-10 w-5/6 xl:w-4/5 mx-auto p-2 md:p-8 border-b border-gray-200",
        className,
      )}
      {...props}
    >
      {data.logo && (
        <Image
          src={data.logo}
          alt="Logo"
          width={64}
          height={64}
          className="w-16 h-16 object-cover"
        />
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold text-pretty">{data.title}</h1>
        <div className="flex divide-x  divide-(--primary)">
          {[
            { url: "/", label: "Home" },
            { url: "/article", label: "Publications" },
            { url: "/#resume", label: "Resume" },
          ].map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="hover:underline px-2 first:pl-0 text-(--primary)"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
