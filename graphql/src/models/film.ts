import { z } from "zod";

export const FilmSchema = z.object({
    title: z.string(),
    episodeId: z.number(),
    openingCrawl: z.string(),
    director: z.string(),
    producer: z.string(),
    releaseDate: z.date(),
    characterIds: z.array(z.number()),
    planetIds: z.array(z.number()),
    starshipIds: z.array(z.number()),
    vehicleIds: z.array(z.number()),
    speciesIds: z.array(z.number()),
    createdAt: z.date(),
    editedAt: z.date(),
})

export type Film = z.infer<typeof FilmSchema>;