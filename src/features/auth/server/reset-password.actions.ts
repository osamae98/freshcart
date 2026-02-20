'use server';

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ResetPasswordValues, resetPasswordSchema } from "../schemas/reset-password.schema";

export default async function resetPasswordAction(values: ResetPasswordValues) {
    const validationResult = resetPasswordSchema.safeParse(values);
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
            url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            method: "PUT",
            data: {
                email: values.email,
                newPassword: values.newPassword
            }
        };
        const { data } = await axios.request(options);
        
        if (data.token) {
            return {
                success: true,
                message: "Password reset successfully",
                token: data.token
            };
        }
        return {
            success: false,
            message: data.message || "Failed to reset password"
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
