"use client";

import {
  IconCalendar,
  IconFileText,
  IconHeading,
  IconLink,
  IconTag,
} from "@tabler/icons-react";
import { useState } from "react";
import CopyButton from "@/components/copy-button";
import Input from "@/components/input";
import ItemList from "@/components/item-list";
import Talk from "@/components/talk";
import talkData from "@/contents/talks.json";
import type { Talks as TalksType } from "@/lib/schemas";
import { TalksSchema } from "@/lib/schemas";

export default function GeneratorTalkPage() {
  const [talks, setTalks] = useState<TalksType>(() =>
    TalksSchema.Check(talkData) ? talkData : [],
  );

  const addTalk = () => {
    setTalks((prevTalks) => [
      ...prevTalks,
      {
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        flag: "",
        links: [],
      },
    ]);
  };

  const removeTalk = (index: number) => {
    setTalks((prevTalks) => prevTalks.filter((_, i) => i !== index));
  };

  const updateTalk = (
    index: number,
    field: keyof TalksType[number],
    value: string,
  ) => {
    setTalks((prevTalks) =>
      prevTalks.map((talk, i) =>
        i === index ? { ...talk, [field]: value } : talk,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <CopyButton text={JSON.stringify(talks)}>Copy Talks</CopyButton>

      <ItemList
        items={talks}
        onAdd={addTalk}
        onRemove={removeTalk}
        addButtonText="Add Talk"
        renderItem={(talk, index) => (
          <div className="flex flex-col gap-4 grow">
            <Input
              icon={<IconHeading />}
              value={talk.title}
              onChange={(value) => updateTalk(index, "title", value)}
              placeholder="Talk Title"
              className="grow"
            />

            <Input
              icon={<IconCalendar />}
              type="date"
              value={talk.date}
              onChange={(value) => updateTalk(index, "date", value)}
              placeholder="Talk Date"
              className="grow"
            />

            <Input
              icon={<IconTag />}
              value={talk.flag || ""}
              onChange={(value) => updateTalk(index, "flag", value)}
              placeholder="Flag (e.g. Conference, Meetup...)"
              className="grow"
            />

            <Input
              mode="textarea"
              icon={<IconFileText />}
              value={talk.description}
              onChange={(value) => updateTalk(index, "description", value)}
              placeholder="Describe your talk..."
            />

            <ItemList
              icon={<IconLink />}
              items={talk.links || []}
              onAdd={() => {
                const newTalks = [...talks];
                newTalks[index].links = [
                  ...(talk.links || []),
                  { label: "", url: "" },
                ];
                setTalks(newTalks);
              }}
              onRemove={(linkIndex) => {
                const newTalks = [...talks];
                newTalks[index].links =
                  talk.links?.filter((_, i) => i !== linkIndex) || [];
                setTalks(newTalks);
              }}
              addButtonText="Add Link"
              renderItem={(link, linkIndex) => (
                <div className="flex gap-2 grow">
                  <Input
                    value={link.label}
                    onChange={(value) => {
                      const newTalks = [...talks];
                      if (newTalks[index].links) {
                        newTalks[index].links[linkIndex].label = value;
                        setTalks(newTalks);
                      }
                    }}
                    placeholder="Link Label"
                    className="grow"
                  />
                  <Input
                    value={link.url}
                    onChange={(value) => {
                      const newTalks = [...talks];
                      if (newTalks[index].links) {
                        newTalks[index].links[linkIndex].url = value;
                        setTalks(newTalks);
                      }
                    }}
                    placeholder="https://..."
                    className="grow"
                  />
                </div>
              )}
            />
          </div>
        )}
      />

      <div key="talks" className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Talks</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {talks.map((talk, index) => (
            <Talk data={talk} key={`${talk.title}-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
