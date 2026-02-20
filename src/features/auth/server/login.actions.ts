'use server';

import { LoginFormValues, loginSchema } from "../schemas/login.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function loginAction(values: LoginFormValues) {
    const validationResult = loginSchema.safeParse(values);
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
        const { rememberMe, ...requestData } = values;
        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
            method: "POST",
            data: requestData
        };
        const { data } = await axios.request(options);
        if (data.message === "success") {
            return {
                success: true,
                message: "user logged in successfully",
                data
            };
        }
        return {
            success: false,
            message: "login failed"
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            if (errorMessage === "Incorrect email or password") {
                return {
                    success: false,
                    message: "wrong credentials",
                    errors: {
                        password: "incorrect email or password"
                    }
                };
            }
        }
        return {
            success: false,
            message: "An unexpected error occurred. Please try again."
        };
    }
}