import { z } from "zod";

export const StarshipSchema = z.object({
    name: z.string(),
    model: z.string(),
    manufacturer: z.string(),
    costInCredits: z.string(),
    length: z.string(),
    maxAtmospheringSpeed: z.string(),
    crew: z.string(),
    passengers: z.string(),
    cargoCapacity: z.string(),
    consumables: z.string(),
    hyperdriveRating: z.string(),
    MGLT: z.string(),
    starshipClass: z.string(),
    pilotIds: z.array(z.number()),
    filmIds: z.array(z.number()),
    createdAt: z.date(),
    editedAt: z.date(),
});

export type Starship = z.infer<typeof StarshipSchema>;
