'use server';
import { SignupFormValues, signupSchema } from "../schemas/signup.schemas";
import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";

export default async function signupAction(values:SignupFormValues) {
    const validationResult = signupSchema.safeParse(values)
    
 if (!validationResult.success) {
        const errors: Record<string, string> = {};

        if(validationResult.error) {
            validationResult.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                const message = issue.message;

                if(!errors[field]) {
                    errors[field] = message;
                }
            });
        }

        return {
            success: false,
            message: "validation errors",
            errors
        }
    
}

   const {terms, ...requestBody} = values;

   try {
    const options:AxiosRequestConfig= {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: requestBody
    }
    const {data} = await axios.request(options);

    if (data.message === "success") {
        return {
            success: true,
            message: "account created successfully",
            data
        }
    }

    return {
        success: false,
        message: data.message || "something went wrong",
    }
   }
   catch(error){
    if(error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        if(errorMessage === "Account already exists") {
            return {
                success: false,
                message: "account exists",
                errors: {
                    email: 'an account with this email already exists'
                }
        }
   }
}

   
}
}