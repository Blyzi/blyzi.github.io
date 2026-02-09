import Type from "typebox";
import { Compile } from "typebox/compile";

const talkSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
  date: Type.String({ format: "date" }),
  flag: Type.Optional(Type.String()),
  links: Type.Optional(
    Type.Array(
      Type.Object({
        label: Type.String(),
        url: Type.String(),
      }),
    ),
  ),
});

const talksSchema = Type.Array(talkSchema);

export type Talk = Type.Static<typeof talkSchema>;
export type Talks = Type.Static<typeof talksSchema>;

export const TalkSchema = Compile(talkSchema);
export const TalksSchema = Compile(talksSchema);
