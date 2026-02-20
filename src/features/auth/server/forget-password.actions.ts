'use server';

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ForgetPasswordValues, forgetPasswordSchema } from "../schemas/forget-password.schema";

export default async function forgetPasswordAction(values: ForgetPasswordValues) {
    const validationResult = forgetPasswordSchema.safeParse(values);
    if (!validationResult.success) {
        const errors: Record<string, string> = {};
        validationResult.error.issues.forEach((issue) => {
            const key = issue.path[0] as string;
            const message = issue.message;
            if (!errors[key]) {
                errors[key] = message;
            }
        });
        return {
            success: false,
            message: "validation errors",
            errors
        };
    }

    try {
        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            method: "POST",
            data: values
        };
        const { data } = await axios.request(options);
        
        if (data.statusMsg === "success") {
            return {
                success: true,
                message: data.message || "Reset link sent to your email",
                data
            };
        }
        return {
            success: false,
            message: data.message || "Failed to send reset link"
        };
    } catch (error) {
        if (error instanceof AxiosError) {
             return {
                success: false,
                message: error.response?.data.message || "An error occurred"
            };
        }
        return {
            success: false,
            message: "An unexpected error occurred. Please try again."
        };
    }
}
