import { z } from "zod";

export const agentInsertSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  instructions: z
    .string()
    .trim()
    .min(1, { message: "Instructions are required" }),
});
