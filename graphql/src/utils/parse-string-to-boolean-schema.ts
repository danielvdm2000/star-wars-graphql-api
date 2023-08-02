import { z } from "zod";

export const ParseStringToBooleanSchema = z.string()
    .refine(value => {
        const lowerCaseValue = value.toLowerCase();
        return lowerCaseValue === "true" || lowerCaseValue === "false";
    }, {
        message: 'Input must be a boolean value ("true" or "false")',
    })
    .transform(value => value.toLowerCase() === "true");