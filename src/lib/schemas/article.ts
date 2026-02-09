import Type from "typebox";
import { Compile } from "typebox/compile";

export const articleDataSchema = Type.Object({
  date: Type.String({ format: "date" }),
  title: Type.String(),
  flag: Type.String(),
  content: Type.Optional(Type.String()),
  authors: Type.Optional(Type.String()),
  tags: Type.Optional(Type.Array(Type.String())),
  picture: Type.Optional(Type.String()),
  links: Type.Optional(
    Type.Array(
      Type.Object({
        label: Type.String(),
        url: Type.String(),
      }),
    ),
  ),
});

const articleSchema = Type.Intersect([
  articleDataSchema,
  Type.Object({
    slug: Type.String(),
  }),
]);

export type ArticleData = Type.Static<typeof articleDataSchema>;
export type Article = Type.Static<typeof articleSchema>;

export const ArticleDataSchema = Compile(articleDataSchema);
export const ArticleSchema = Compile(articleSchema);
