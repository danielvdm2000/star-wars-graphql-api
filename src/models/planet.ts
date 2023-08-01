import { z } from "zod";

export const PlanetSchema = z.object({
    name: z.string(),
    rotationPeriod: z.string(),
    orbitalPeriod: z.string(),
    diameter: z.string(),
    climate: z.string(),
    gravity: z.string(),
    terrain: z.string(),
    surfaceWater: z.string(),
    population: z.string(),
    residentIds: z.array(z.number()),
    filmIds: z.array(z.number()),
    createdAt: z.date(),
    editedAt: z.date(),
});

export type Planet = z.infer<typeof PlanetSchema>;
