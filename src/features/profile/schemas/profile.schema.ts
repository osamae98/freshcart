import { z } from "zod";

export const personalInfoSchema = z.object({
    firstName: z.string().min(2, "First name is too short").max(50, "First name is too long"),
    lastName: z.string().min(2, "Last name is too short").max(50, "Last name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^(\+2)?01[0125][0-9]{8}$/, "Only Egyptian phone numbers are allowed").optional().or(z.literal("")),
    dateOfBirth: z.string().optional().or(z.literal("")),
});

export const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[a-z]/, "Must contain one lowercase letter")
        .regex(/[0-9]/, "Must contain one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain one special character"),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
