import z from "zod/v4-mini";

export const siriRouteSchema = z.object({
  id: z.number(),
  line_ref: z.number(),
  operator_ref: z.number(),
});

export type SiriRoute = z.infer<typeof siriRouteSchema>;
