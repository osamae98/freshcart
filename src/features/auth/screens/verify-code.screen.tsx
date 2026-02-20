import VerifyCodeForm from "../components/verify-code/VerifyCodeForm";
import { Suspense } from "react";

export default function VerifyCodeScreen() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
            <div className="container mx-auto">
                <Suspense fallback={
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                }>
                    <VerifyCodeForm />
                </Suspense>
            </div>
        </main>
    );
}
