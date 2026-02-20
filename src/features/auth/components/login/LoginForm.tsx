"use client";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
    faLock,
    faSpinner,
    faStar,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import loginAction from "../../server/login.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setToken } from "../../server/auth.actions";
import { setAuthInfo } from "../../store/auth.slice";
import { useDispatch } from "react-redux";

export default function LoginForm() {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(loginSchema),
    });
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
        try {
            const response = await loginAction(values);

            if (response?.success) {
                await setToken(response.data.token, values.rememberMe);
                toast.success(response?.message);
                dispatch(setAuthInfo({
                    isAuthenticated: true,
                    userInfo: response.data.user
                }));

                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                if (response?.errors) {
                    Object.keys(response.errors).forEach((key) => {
                        toast.error(response.errors![key]);
                    });
                } else {
                    toast.error(response?.message || "Login failed.");
                }
            }
        } catch (error: unknown) {
            console.error(error);
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-3xl font-bold text-primary-600">
                            Fresh<span className="text-gray-800">Cart</span>
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600">
                        Sign in to continue your fresh shopping experience
                    </p>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100">
                        <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
                        <span className="font-medium text-gray-700">
                            Continue with Google
                        </span>
                    </button>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100">
                        <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-lg" />
                        <span className="font-medium text-gray-700">
                            Continue with Facebook
                        </span>
                    </button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">
                            OR CONTINUE WITH EMAIL
                        </span>
                    </div>
                </div>

                {/* Login Form */}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                className="w-full px-4 py-3 pl-12 border-gray-200 rounded-xl focus:outline"
                                placeholder="Enter your email"
                                id="email"
                                {...register("email")}
                            />
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 mt-1">
                            {errors.email.message}
                        </p>}
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Password
                            </label>
                            <Link href="/forget-password" className="text-primary-600 hover:text-primary-700 cursor-pointer font-bold">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline"
                                placeholder="Enter your password"
                                id="password"
                                {...register("password")}
                            />
                            <FontAwesomeIcon
                                icon={faLock}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 mt-1">
                            {errors.password.message}
                        </p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 accent-primary-600 border-gray-300 rounded"
                                {...register("rememberMe")}
                            />
                            <span className="ml-3 text-sm text-gray-600">
                                Keep me signed in
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition duration-300"
                    >
                        {isSubmitting ?
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                                <span>Signing in...</span>
                            </> : <>Sign In</>}
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                    <p className="text-gray-600">
                        New to FreshCart?
                        <Link
                            href="/signUp"
                            className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer">
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faLock} className="mr-1" />
                        SSL Secured
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUsers} className="mr-1" />
                        50K+ Users
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faStar} className="mr-1" />
                        4.9 Rating
                    </div>
                </div>
            </div>
        </div>
    );
}