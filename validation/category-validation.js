import { z } from "zod";

export const categoryValidaton = z.object({
  type: z
    .string({ required_error: "type is required" })
    .max(100, { message: "type should no be longer than 100 characters" }),
});
