import z from "zod/v4";

export const gtfsRouteSchema = z.object({
  id: z.number(),
  date: z.date(),
  line_ref: z.number(),
  operator_ref: z.number(),
  route_short_name: z.string(),
  route_long_name: z.string(),
  route_mkt: z.string(),
  route_direction: z.string(),
  route_alternative: z.string(),
  agency_name: z.string(),
  route_type: z.string(),
});

export type GtfsRouteType = z.infer<typeof gtfsRouteSchema>;
