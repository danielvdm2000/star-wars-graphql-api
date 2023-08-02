import { z } from "zod";

export const SpeciesSchema = z.object({
    name: z.string(),
    classification: z.string(),
    designation: z.string(),
    averageHeight: z.string(),
    skinColors: z.string(),
    hairColors: z.string(),
    eyeColors: z.string(),
    averageLifespan: z.string(),
    homeworldId: z.number().nullable(),
    language: z.string(),
    peopleIds: z.array(z.number()),
    filmIds: z.array(z.number()),
    createdAt: z.date(),
    editedAt: z.date(),
});

export type Species = z.infer<typeof SpeciesSchema>;
