import z from "zod/v4";

const errorDetailSchema = z.object({
  loc: z.tuple([z.string(), z.number()]),
  msg: z.string(),
  type: z.string(),
});

export const openBusErrorSchema = z.object({
  detail: z.array(errorDetailSchema),
});

export type openBusErrorType = z.infer<typeof openBusErrorSchema>;
