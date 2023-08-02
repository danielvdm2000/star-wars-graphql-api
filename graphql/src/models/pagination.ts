import { z } from "zod";

export const PaginationSchema = <T extends z.ZodType<any, any>>(itemSchema: T) => z.object({
  count: z.number(),
  page: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(itemSchema),
});

export type Pagination<T> = {
  count: number;
  page: number;
  next: string | null;
  previous: string | null;
  results: T[];
}