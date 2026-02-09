import Type from "typebox";
import { Compile } from "typebox/compile";

const resumeExperienceSchema = Type.Object({
  company: Type.String(),
  companyUrl: Type.Optional(Type.String()),
  position: Type.String(),
  startDate: Type.String({ format: "date" }),
  endDate: Type.Optional(Type.String({ format: "date" })),
  description: Type.Optional(Type.String()),
  education: Type.Boolean(),
});

export type ResumeExperience = Type.Static<typeof resumeExperienceSchema>;

const resumeSchema = Type.Object({
  centered: Type.Boolean(),
  experiences: Type.Array(resumeExperienceSchema),
});

export type Resume = Type.Static<typeof resumeSchema>;
export const ResumeSchema = Compile(resumeSchema);
