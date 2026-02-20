import { Skeleton } from "@/components/ui/Skeleton";

export default function AuthLoading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 animate-in fade-in duration-300">
            <div className="w-full max-w-xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <Skeleton className="w-16 h-16 rounded-full" />
                    </div>

                    {/* Title & Description */}
                    <div className="flex flex-col items-center mb-8">
                        <Skeleton className="h-7 w-48 mb-3" />
                        <Skeleton className="h-4 w-72" />
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5">
                        <div>
                            <Skeleton className="h-4 w-28 mb-2" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>

                    {/* Footer Link */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                        <Skeleton className="h-4 w-48" />
                    </div>
                </div>
            </div>
        </div>
    );
}
