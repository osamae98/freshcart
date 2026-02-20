import { CategoryCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function CategoriesLoading() {
    return (
        <div className="pb-20 animate-in fade-in duration-300">
            {/* Breadcrumb */}
            <div className="container pt-6 pb-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>

            <div className="container">
                {/* Header */}
                <div className="mb-8">
                    <Skeleton className="h-9 w-64 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>

                {/* Popular Subcategories */}
                <div className="mb-16">
                    <Skeleton className="h-7 w-52 mb-8" />
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 p-4">
                                <Skeleton className="w-16 h-16 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
