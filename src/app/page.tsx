import HomePageComponent from "@/components/home-page";
import rawMetadataConfig from "@/contents/metadata.json";
import rawProfileData from "@/contents/profile.json";
import rawResumeData from "@/contents/resume.json";
import rawTalksData from "@/contents/talks.json";
import { loadArticles } from "@/lib/load-articles";
import {
  type Metadata,
  MetadataSchema,
  type Profile as ProfileType,
  ProfileSchema as ProfileValidator,
  ResumeSchema,
  TalksSchema,
} from "@/lib/schemas";

export default function Home() {
  if (!ProfileValidator.Check(rawProfileData)) {
    console.error("Invalid profile data:", rawProfileData);
  }
  const profileData = rawProfileData as ProfileType;

  if (!MetadataSchema.Check(rawMetadataConfig)) {
    console.error("Invalid metadata config:", rawMetadataConfig);
  }
  const metadataConfig = rawMetadataConfig as Metadata;

  const articles = loadArticles();

  const resumeData = ResumeSchema.Check(rawResumeData)
    ? rawResumeData
    : { centered: false, experiences: [] };
  const talksData = TalksSchema.Check(rawTalksData) ? rawTalksData : [];

  return (
    <HomePageComponent
      metadataData={metadataConfig}
      profileData={profileData}
      articlesData={articles}
      resumeData={resumeData}
      talksData={talksData}
    />
  );
}
