import {
  IconBriefcase,
  IconFileText,
  IconMicrophone,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";

export default function GeneratorPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Content Generator</h1>
      <p className="text-gray-600">
        Generate and manage your portfolio content with these tools.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/generator/metadata"
          className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg hover:border-(--primary) transition-colors"
        >
          <IconSettings className="w-8 h-8 text-(--primary)" />
          <h2 className="text-xl font-semibold">Metadata</h2>
          <p className="text-gray-600">
            Configure site metadata, title, logo, colors, font family, and
            sections.
          </p>
        </Link>

        <Link
          href="/generator/profile"
          className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg hover:border-(--primary) transition-colors"
        >
          <IconUser className="w-8 h-8 text-(--primary)" />
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-600">
            Edit your profile information, bio, and social links.
          </p>
        </Link>

        <Link
          href="/generator/resume"
          className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg hover:border-(--primary) transition-colors"
        >
          <IconBriefcase className="w-8 h-8 text-(--primary)" />
          <h2 className="text-xl font-semibold">Resume</h2>
          <p className="text-gray-600">
            Manage your work experience and professional history.
          </p>
        </Link>

        <Link
          href="/generator/article"
          className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg hover:border-(--primary) transition-colors"
        >
          <IconFileText className="w-8 h-8 text-(--primary)" />
          <h2 className="text-xl font-semibold">Article</h2>
          <p className="text-gray-600">
            Create and edit articles for your portfolio.
          </p>
        </Link>

        <Link
          href="/generator/talk"
          className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg hover:border-(--primary) transition-colors"
        >
          <IconMicrophone className="w-8 h-8 text-(--primary)" />
          <h2 className="text-xl font-semibold">Talk</h2>
          <p className="text-gray-600">Manage your talks and presentations.</p>
        </Link>
      </div>
    </div>
  );
}
