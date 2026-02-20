import { Skeleton } from "@/components/ui/Skeleton";

export default function CheckoutLoading() {
    return (
        <div className="container py-8 sm:py-12 animate-in fade-in duration-300">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                {/* Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
                        <Skeleton className="h-7 w-48 mb-2" />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Skeleton className="h-12 w-full rounded-xl" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Skeleton className="h-12 w-full rounded-xl" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                        <Skeleton className="h-6 w-36 mb-4" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton className="w-14 h-14 rounded-lg" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-3/4 mb-1" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                                <Skeleton className="h-4 w-12" />
                            </div>
                        ))}
                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <Skeleton className="h-14 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
