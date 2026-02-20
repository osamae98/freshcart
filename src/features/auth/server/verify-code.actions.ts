'use server';

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { VerifyCodeValues, verifyCodeSchema } from "../schemas/verify-code.schema";

export default async function verifyCodeAction(values: VerifyCodeValues) {
    const validationResult = verifyCodeSchema.safeParse(values);
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
            url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            method: "POST",
            data: {
                resetCode: values.resetCode
            }
        };
        const { data } = await axios.request(options);

        if (data.status === "Success") {
            return {
                success: true,
                message: data.message || "Code verified successfully"
            };
        }
        return {
            success: false,
            message: data.message || "Invalid verification code"
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
