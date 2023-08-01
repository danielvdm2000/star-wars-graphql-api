import { z } from "zod";

export const VehicleSchema = z.object({
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
    vehicleClass: z.string(),
    pilotIds: z.array(z.number()),
    filmIds: z.array(z.number()),
    createdAt: z.date(),
    editedAt: z.date(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
