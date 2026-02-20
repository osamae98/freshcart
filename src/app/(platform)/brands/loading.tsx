import { BrandCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function BrandsLoading() {
    return (
        <div className="pb-20 animate-in fade-in duration-300">
            {/* Hero Skeleton */}
            <Skeleton className="w-full h-48 md:h-64 rounded-none" />

            <div className="container mt-12">
                {/* Featured Brands */}
                <Skeleton className="h-7 w-40 mb-8" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <Skeleton className="h-48 w-full rounded-none" />
                            <div className="p-5 space-y-3">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters Skeleton */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <Skeleton className="h-12 w-full md:max-w-md rounded-xl" />
                    <Skeleton className="h-12 w-48 rounded-xl" />
                </div>

                {/* Brand Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <BrandCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
