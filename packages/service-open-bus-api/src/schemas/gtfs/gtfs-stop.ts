import z from "zod/v4";

export const gtfsStopSchema = z.object({
  id: z.number(),
  date: z.date(),
  code: z.number(),
  lat: z.number(),
  lon: z.number(),
  name: z.string(),
  city: z.string(),
});

export type GtfsStopType = z.infer<typeof gtfsStopSchema>;
