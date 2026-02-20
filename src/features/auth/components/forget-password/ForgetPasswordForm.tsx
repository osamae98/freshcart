"use client";

import {
    faEnvelope,
    faLock,
    faPaperPlane,
    faShieldAlt,
    faSpinner,
    faHeadset,
    faQuestionCircle,
    faEnvelopeOpenText
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetPasswordValues, forgetPasswordSchema } from "../../schemas/forget-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import forgetPasswordAction from "../../server/forget-password.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ForgetPasswordForm() {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<ForgetPasswordValues>({
        defaultValues: {
            email: "",
        },
        mode: "onSubmit",
        resolver: zodResolver(forgetPasswordSchema),
    });

    const onSubmit: SubmitHandler<ForgetPasswordValues> = async (values) => {
        try {
            const response = await forgetPasswordAction(values);

            if (response?.success) {
                toast.success(response?.message);
                // The API might expect a redirect to verify code page
                setTimeout(() => {
                    router.push(`/verify-code?email=${encodeURIComponent(values.email)}`);
                }, 2000);
            } else {
                toast.error(response?.message || "Failed to send reset link.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                        <FontAwesomeIcon icon={faLock} className="text-2xl" />
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Forgot your password?
                </h1>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    No worries! Enter your email address and we&apos;ll send you a link to reset your password.
                </p>

                <form className="space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>
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
                                placeholder="Your registered email address"
                                id="email"
                                {...register("email")}
                            />
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 mt-1 text-sm">
                            {errors.email.message}
                        </p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faPaperPlane} />
                                <span>Send Reset Link</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-gray-600">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="text-primary-600 hover:text-primary-700 font-bold"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex gap-4">
                <div className="text-primary-600 mt-1">
                    <FontAwesomeIcon icon={faShieldAlt} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-800">Security Notice</h4>
                    <p className="text-xs text-gray-600 mt-1">
                        For your security, a password reset link will be sent to your registered email address. The link will expire after 30 minutes.
                    </p>
                </div>
            </div>

            {/* Help Section */}
            <div className="pt-8">
                <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Need additional help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HelpCard 
                        icon={faHeadset} 
                        title="Contact Support" 
                        description="Our customer support team is available 24/7 to assist you."
                        linkText="Contact Us"
                        linkHref="/support"
                    />
                    <HelpCard 
                        icon={faQuestionCircle} 
                        title="FAQs" 
                        description="Find answers to frequently asked questions about your account."
                        linkText="View FAQs"
                        linkHref="/faq"
                    />
                    <HelpCard 
                        icon={faEnvelopeOpenText} 
                        title="Email Not Received?" 
                        description="Check your spam folder or request a new reset link."
                        linkText="Resend Email"
                        linkHref="#"
                        isAction
                    />
                </div>
            </div>
        </div>
    );
}

interface HelpCardProps {
    icon: IconDefinition;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    isAction?: boolean;
}

function HelpCard({ icon, title, description, linkText, linkHref, isAction }: HelpCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center flex flex-col items-center shadow-sm">
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-4 text-sm font-bold">
                <FontAwesomeIcon icon={icon} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2 truncate w-full">{title}</h4>
            <p className="text-xs text-gray-500 mb-4 line-clamp-3 h-12">
                {description}
            </p>
            {isAction ? (
                <button className="text-primary-600 hover:text-primary-700 text-sm font-bold flex items-center gap-1 mt-auto">
                    {linkText} <span className="text-lg">→</span>
                </button>
            ) : (
                <Link href={linkHref} className="text-primary-600 hover:text-primary-700 text-sm font-bold flex items-center gap-1 mt-auto">
                    {linkText} <span className="text-lg">→</span>
                </Link>
            )}
        </div>
    );
}
