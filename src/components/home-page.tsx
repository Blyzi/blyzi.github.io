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
                    <h2 className="text-3xl font-bold">Recent Articles</h2>
                    <div className="flex flex-col gap-4">
                      {articlesData.slice(0, 5).map((article) =>
                        article.content ? (
                          <Link
                            key={article.slug}
                            href={`/article/${article.slug}`}
                            aria-label={`Read article: ${article.title}`}
                          >
                            <ArticlePreview data={article} />
                          </Link>
                        ) : (
                          <ArticlePreview key={article.slug} data={article} />
                        ),
                      )}
                    </div>

                    {articlesData.length > 5 && (
                      <Link
                        href="/article"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
                      >
                        See More Articles
                      </Link>
                    )}
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
