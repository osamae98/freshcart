import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .nonempty("name is required")
        .min(3, "name must be at least 3 characters long")
        .max(25, "name must be at most 25 characters long"),

    email: z.string().nonempty("email is required").pipe(z.email("Invalid email address")),

    password: z
        .string()
        .nonempty("password is required")
        .min(8, "password must be at least 8 characters long")
        .regex(/[A-Z]/, "password must contain at least one uppercase letter")
        .regex(/[a-z]/, "password must contain at least one lowercase letter")
        .regex(/[0-9]/, "password must contain at least one number")
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "password must contain at least one special character"
        ),
    
    rePassword: z.string().nonempty("confirm password is required"),

    phone: z
        .string()
        .nonempty('phone is required')
        .regex(/^(\+2)?01[0125][0-9]{8}$/,
        "only Egyptian phone numbers are allowed"),

    terms: z.boolean().refine((value) => value === true, {
        message: "You must accept the terms and conditions",
    })
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "Password and confirm password must match",
})

export type SignupFormValues = z.infer<typeof signupSchema>