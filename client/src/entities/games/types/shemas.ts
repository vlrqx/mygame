import { z } from "zod";

export const GamesSchema = z.object({
  id: z.number(),
  name: z.string(),
  Questions: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      points: z.number(),
      answer: z.string(),
      isClosed: z.boolean(),
    })
  ),
});

export const GamesListSchema = z.array(GamesSchema);

export const SearchSchema = z
  .string()
  .min(3)
  .regex(/^[a-zA-Z0-9а-яА-Я\s]+$/, "Invalid search query");

export type Games = z.infer<typeof GamesSchema>;
export type GamesList = z.infer<typeof GamesListSchema>;
