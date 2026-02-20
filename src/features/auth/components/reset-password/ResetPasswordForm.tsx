"use client";

import {
    faEnvelope,
    faLock,
    faKey,
    faEye,
    faEyeSlash,
    faSpinner,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordValues, resetPasswordSchema } from "../../schemas/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordAction from "../../server/reset-password.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export default function ResetPasswordForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordValues>({
        defaultValues: {
            email: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
        resolver: zodResolver(resetPasswordSchema),
    });

    const newPassword = watch("newPassword", "");

    const passwordRequirements = [
        { label: "At least 8 characters", met: newPassword.length >= 8 },
        { label: "One uppercase letter", met: /[A-Z]/.test(newPassword) },
        { label: "One number", met: /[0-9]/.test(newPassword) },
    ];

    const onSubmit: SubmitHandler<ResetPasswordValues> = async (values) => {
        try {
            const response = await resetPasswordAction(values);

            if (response?.success) {
                toast.success(response?.message);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                toast.error(response?.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                        <FontAwesomeIcon icon={faKey} className="text-2xl" />
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Reset Password
                </h1>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    Enter your email address and new password to reset your account password.
                </p>

                <form className="space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
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
                                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="Enter your email address"
                                id="email"
                                {...register("email")}
                            />
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* New Password Field */}
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="Enter new password"
                                id="newPassword"
                                {...register("newPassword")}
                            />
                            <FontAwesomeIcon
                                icon={faLock}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        
                        {/* Password Requirements */}
                        <div className="mt-3 space-y-2">
                            <p className="text-xs font-semibold text-gray-500">Password must contain:</p>
                            {passwordRequirements.map((req, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs">
                                    <FontAwesomeIcon 
                                        icon={req.met ? faCheckCircle : faCircle} 
                                        className={req.met ? "text-primary-500" : "text-gray-300"} 
                                    />
                                    <span className={req.met ? "text-gray-700" : "text-gray-500"}>
                                        {req.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {errors.newPassword && <p className="text-red-500 mt-1 text-sm">{errors.newPassword.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="Confirm new password"
                                id="confirmPassword"
                                {...register("confirmPassword")}
                            />
                            <FontAwesomeIcon
                                icon={faLock}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <span>Resetting...</span>
                            </>
                        ) : (
                            <span>Reset Password</span>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="text-primary-600 hover:text-primary-700 font-bold"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    Need help? <Link href="/support" className="text-primary-600 hover:underline">Contact Support</Link>
                </p>
            </div>
        </div>
    );
}
