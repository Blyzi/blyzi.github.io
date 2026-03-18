import Link from "next/link";
import type {
  Article,
  Metadata,
  Profile as ProfileType,
  Resume as ResumeType,
  Talk as TalkType,
} from "@/lib/schemas";
import ArticlePreview from "./article-preview";
import Header from "./header";
import Profile from "./profile";
import Resume from "./resume";
import Talk from "./talk";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";

type HomePageProps = {
  metadataData: Metadata;
  resumeData: ResumeType;
  talksData: TalkType[];
  profileData: ProfileType;
  articlesData: Array<Article>;
};

export default function HomePage({
  metadataData,
  resumeData,
  talksData,
  profileData,
  articlesData,
}: HomePageProps) {
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
      <div className="flex flex-col gap-8 w-5/6 xl:w-4/5 mx-auto p-2 md:p-8">
        {metadataData.sectionOrder.map((section) => {
          switch (section) {
            case "profile":
              return <Profile key="profile" data={profileData} />;
            case "articles":
              return (
                articlesData.length > 0 && (
                  <div key="articles" className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold">Recent Articles</h2>
                      {articlesData.length > 5 && (
                        <Link
                          href="/article"
                          className="text-sm rounded-lg transition-colors px-3 py-1 border border-gray-300 self-center flex items-center gap-2 bg-white"
                        >
                          See More Articles
                          <IconArrowRight className="w-4 h-4 inline" />
                        </Link>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      {articlesData.slice(0, 5).map((article) => (
                        <ArticlePreview key={article.slug} data={article} />
                      ))}
                    </div>
                  </div>
                )
              );
            case "resume":
              return (
                resumeData.experiences.length > 0 && (
                  <div key="resume" className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">Resume</h2>
                    <Resume key="resume" data={resumeData} id="resume" />
                  </div>
                )
              );
            case "talks":
              return (
                talksData.length > 0 && (
                  <div key="talks" className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">Talks</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {talksData.map((talk, index) => (
                        <Talk data={talk} key={`${talk.title}-${index}`} />
                      ))}
                    </div>
                  </div>
                )
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
