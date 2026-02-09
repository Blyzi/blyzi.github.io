"use client";

import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconBriefcase,
  IconBuilding,
  IconLink,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import CopyButton from "@/components/copy-button";
import Input from "@/components/input";
import ItemList from "@/components/item-list";
import Resume from "@/components/resume";
import resumeData from "@/contents/resume.json";
import type { ResumeExperience, Resume as ResumeType } from "@/lib/schemas";
import { ResumeSchema } from "@/lib/schemas";

export default function GeneratorResumePage() {
  const [centered, setCentered] = useState<boolean>(() =>
    ResumeSchema.Check(resumeData) ? resumeData.centered : false,
  );

  const [experiences, setExperiences] = useState<ResumeExperience[]>(() =>
    ResumeSchema.Check(resumeData) ? resumeData.experiences : [],
  );

  const draftResumeData: ResumeType = useMemo(
    () => ({
      centered,
      experiences: experiences.map((exp) => ({
        ...exp,
        endDate: exp.endDate || undefined,
        companyUrl: exp.companyUrl || undefined,
        description: exp.description || undefined,
        education: exp.education || false,
      })),
    }),
    [centered, experiences],
  );

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        companyUrl: undefined,
        position: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: undefined,
        description: undefined,
        education: false,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (
    index: number,
    field: keyof ResumeExperience,
    value: string | boolean,
  ) => {
    setExperiences(
      experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  const moveExperience = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= experiences.length) return;
    const updated = [...experiences];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setExperiences(updated);
  };

  return (
    <div className="flex flex-col gap-8">
      <CopyButton text={JSON.stringify(draftResumeData)}>
        Copy Resume
      </CopyButton>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={centered}
          onChange={(e) => setCentered(e.target.checked)}
          className="w-4 h-4 accent-(--primary)"
        />
        <span className="text-sm font-medium">
          Centered layout (education left, work right)
        </span>
      </label>

      <ItemList
        items={experiences}
        onAdd={addExperience}
        onRemove={removeExperience}
        onMove={moveExperience}
        addButtonText="Add Experience"
        renderItem={(experience, index) => (
          <>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 grow">
              <Input
                icon={<IconBuilding />}
                value={experience.company}
                onChange={(value) => updateExperience(index, "company", value)}
                placeholder="Company Name"
                className="grow"
              />

              <Input
                icon={<IconLink />}
                value={experience.companyUrl || ""}
                onChange={(value) =>
                  updateExperience(index, "companyUrl", value)
                }
                placeholder="Company URL"
                className="grow"
              />

              <Input
                icon={<IconBriefcase />}
                value={experience.position}
                onChange={(value) => updateExperience(index, "position", value)}
                placeholder="Position/Role"
                className="grow"
              />

              <Input
                icon={<IconArrowBarRight />}
                type="date"
                value={experience.startDate}
                onChange={(value) =>
                  updateExperience(index, "startDate", value)
                }
                placeholder="Start Date"
                className="grow"
              />

              <Input
                icon={<IconArrowBarToRight />}
                type="date"
                value={experience.endDate || ""}
                onChange={(value) => updateExperience(index, "endDate", value)}
                placeholder="End Date (leave empty for current)"
                className="grow"
              />

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={experience.education || false}
                  onChange={(e) =>
                    updateExperience(index, "education", e.target.checked)
                  }
                  className="w-4 h-4 accent-(--secondary)"
                />
                <span className="text-sm font-medium">Education</span>
              </label>

              <div className="flex flex-col gap-2 md:col-span-2">
                <div className="text-sm font-medium">Description</div>
                <Input
                  mode="textarea"
                  value={experience.description || ""}
                  onChange={(value) =>
                    updateExperience(index, "description", value)
                  }
                  placeholder="Describe your role and responsibilities..."
                />
              </div>
            </div>
          </>
        )}
      />

      <div className="border-t border-gray-300 pt-8">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        {ResumeSchema.Check(draftResumeData) && (
          <Resume data={draftResumeData} />
        )}
      </div>
    </div>
  );
}
