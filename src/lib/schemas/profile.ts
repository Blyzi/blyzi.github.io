import Type from "typebox";
import { Compile } from "typebox/compile";

const socialSchema = Type.Object({
  platform: Type.Union([
    Type.Literal("twitter"),
    Type.Literal("linkedin"),
    Type.Literal("github"),
    Type.Literal("youtube"),
    Type.Literal("twitch"),
    Type.Literal("medium"),
    Type.Literal("scholar"),
    Type.Literal("huggingface"),
    Type.Literal("facebook"),
    Type.Literal("instagram"),
    Type.Literal("mail"),
  ]),
  url: Type.String(),
});

export const profileSchema = Type.Object({
  title: Type.String(),
  picture: Type.Optional(Type.String()),
  bio: Type.Optional(Type.String()),
  socialLinks: Type.Optional(Type.Array(socialSchema)),
});

export type SocialLink = Type.Static<typeof socialSchema>;
export type Profile = Type.Static<typeof profileSchema>;
export const ProfileSchema = Compile(profileSchema);
