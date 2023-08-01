import { z } from "zod";

export const PersonSchema = z.object({
    name: z.string(),
    height: z.string(),
    mass: z.string(),
    hairColor: z.string(),
    skinColor: z.string(),
    eyeColor: z.string(),
    birthYear: z.string(),
    gender: z.string(),
    homeworldId: z.number(),
    filmIds: z.array(z.number()),
    speciesIds: z.array(z.number()),
    vehicleIds: z.array(z.number()),
    starshipIds: z.array(z.number()),
    createdAt: z.date(),
    editedAt: z.date(),
});

export type Person = z.infer<typeof PersonSchema>;
