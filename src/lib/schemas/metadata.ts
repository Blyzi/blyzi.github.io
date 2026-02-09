import Type from "typebox";
import { Compile } from "typebox/compile";

export const fontOptions = [
  "monaspace-neon",
  "montserrat",
  "roboto",
  "open-sans",
  "lato",
  "poppins",
  "inter",
  "raleway",
  "nunito",
  "playfair-display",
] as const;

export const fontSchema = Type.Union([
  Type.Literal("monaspace-neon"),
  Type.Literal("montserrat"),
  Type.Literal("roboto"),
  Type.Literal("open-sans"),
  Type.Literal("lato"),
  Type.Literal("poppins"),
  Type.Literal("inter"),
  Type.Literal("raleway"),
  Type.Literal("nunito"),
  Type.Literal("playfair-display"),
]);

const metadataSchema = Type.Object({
  title: Type.String(),
  logo: Type.Optional(Type.String()),
  primaryColor: Type.String(),
  secondaryColor: Type.String(),
  font: fontSchema,
  sectionOrder: Type.Array(
    Type.Union([
      Type.Literal("profile"),
      Type.Literal("articles"),
      Type.Literal("resume"),
      Type.Literal("talks"),
    ]),
  ),
});

export type FontOption = Type.Static<typeof fontSchema>;
export type Metadata = Type.Static<typeof metadataSchema>;
export const MetadataSchema = Compile(metadataSchema);
