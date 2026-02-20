import { z } from "zod";

export const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must contain only digits"),
});

export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;
