import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function SearchLoading() {
    return (
        <div className="container py-8 sm:py-12 animate-in fade-in duration-300">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
            </div>

            {/* Search Header */}
            <div className="mb-8">
                <Skeleton className="h-8 w-72 mb-2" />
                <Skeleton className="h-4 w-40" />
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between mb-8">
                <Skeleton className="h-12 w-full max-w-md rounded-xl" />
                <div className="flex gap-3">
                    <Skeleton className="h-12 w-40 rounded-xl" />
                    <Skeleton className="h-12 w-24 rounded-xl" />
                </div>
            </div>

            {/* Product Grid */}
            <ProductGridSkeleton count={10} />
        </div>
    );
}
