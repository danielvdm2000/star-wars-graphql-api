import { z } from "zod";

export const ParseStringToIntSchema = z.string()
    .refine(value => !isNaN(parseInt(value)), {
        message: 'Input must be a number',
    })
    .refine(value => parseInt(value) > 0, {
        message: 'Input must be a positive number',
    })
    .transform(value => parseInt(value));
