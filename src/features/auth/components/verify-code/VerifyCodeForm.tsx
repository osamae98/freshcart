"use client";

import {
    faShieldAlt,
    faSpinner,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import verifyCodeAction from "../../server/verify-code.actions";
import forgetPasswordAction from "../../server/forget-password.actions";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const CODE_LENGTH = 6;
const TIMER_DURATION = 180; // 3 minutes in seconds

export default function VerifyCodeForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
    const [error, setError] = useState("");

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    const handleChange = (index: number, value: string) => {
        // Only allow single digits
        if (value.length > 1) {
            value = value.slice(-1);
        }
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError("");

        // Auto-focus next input
        if (value && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
        if (pastedData) {
            const newCode = [...code];
            for (let i = 0; i < pastedData.length; i++) {
                newCode[i] = pastedData[i];
            }
            setCode(newCode);
            // Focus the next empty input or the last one
            const nextEmpty = newCode.findIndex((c) => !c);
            const focusIndex = nextEmpty === -1 ? CODE_LENGTH - 1 : nextEmpty;
            inputRefs.current[focusIndex]?.focus();
        }
    };

    const handleSubmit = useCallback(async () => {
        const fullCode = code.join("");
        if (fullCode.length !== CODE_LENGTH) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await verifyCodeAction({ resetCode: fullCode });

            if (response?.success) {
                toast.success(response?.message || "Code verified successfully!");
                setTimeout(() => {
                    router.push("/reset-password");
                }, 1500);
            } else {
                setError(response?.message || "Invalid verification code.");
                toast.error(response?.message || "Invalid verification code.");
            }
        } catch {
            setError("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }, [code, router]);

    const handleResendCode = async () => {
        if (!email) {
            toast.error("Email not available. Please go back to forgot password.");
            return;
        }

        setIsResending(true);
        try {
            const response = await forgetPasswordAction({ email });
            if (response?.success) {
                toast.success("A new code has been sent to your email.");
                setTimeLeft(TIMER_DURATION);
                setCode(Array(CODE_LENGTH).fill(""));
                setError("");
                inputRefs.current[0]?.focus();
            } else {
                toast.error(response?.message || "Failed to resend code.");
            }
        } catch {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    const isCodeComplete = code.every((c) => c !== "");

    return (
        <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 relative">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-3xl" />
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-primary-100 animate-ping opacity-20" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Verify Reset Code
                </h1>
                <p className="text-gray-500 mb-2 max-w-sm mx-auto">
                    We&apos;ve sent a verification code to your email address
                </p>
                {email && (
                    <p className="text-primary-600 font-semibold mb-8">
                        {email}
                    </p>
                )}

                {/* Code Label */}
                <p className="text-sm font-semibold text-gray-700 mb-4">
                    Enter 6-digit verification code
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold border-2 rounded-xl 
                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                transition-all duration-200
                                ${digit ? "border-primary-300 bg-primary-50/50 text-primary-700" : "border-gray-200 bg-gray-50"}
                                ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}
                            `}
                            aria-label={`Digit ${index + 1}`}
                            id={`verify-code-input-${index}`}
                        />
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm mb-4 animate-pulse">
                        {error}
                    </p>
                )}

                {/* Timer */}
                <p className="text-sm text-gray-500 mb-6">
                    Code expires in{" "}
                    <span
                        className={`font-bold ${
                            timeLeft <= 30
                                ? "text-red-500"
                                : "text-primary-600"
                        }`}
                    >
                        {formatTime(timeLeft)}
                    </span>
                </p>

                {/* Verify Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isCodeComplete}
                    className={`w-full py-3.5 px-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                        ${
                            isCodeComplete && !isSubmitting
                                ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }
                    `}
                    id="verify-code-submit-btn"
                >
                    {isSubmitting ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} spin />
                            <span>Verifying...</span>
                        </>
                    ) : (
                        <>
                            <span>Verify Code</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </>
                    )}
                </button>

                {/* Resend Code */}
                <div className="mt-6">
                    <p className="text-gray-500 text-sm mb-2">
                        Didn&apos;t receive the code?
                    </p>
                    <button
                        onClick={handleResendCode}
                        disabled={isResending || timeLeft > 0}
                        className={`font-bold text-sm transition-colors duration-200
                            ${
                                timeLeft > 0 || isResending
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-primary-600 hover:text-primary-700"
                            }
                        `}
                        id="verify-code-resend-btn"
                    >
                        {isResending ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" />
                                Resending...
                            </>
                        ) : (
                            "Resend Code"
                        )}
                    </button>
                </div>

                {/* Back to Sign In */}
                <div className="mt-4">
                    <Link
                        href="/login"
                        className="text-primary-600 hover:text-primary-700 font-bold text-sm transition-colors duration-200"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </div>

            {/* Contact Support */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    Need help?{" "}
                    <Link
                        href="/support"
                        className="text-primary-600 hover:underline"
                    >
                        Contact Support
                    </Link>
                </p>
            </div>
        </div>
    );
}
