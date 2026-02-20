import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
    return (
        <div className="container py-8 sm:py-12 animate-in fade-in duration-300">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
            </div>

            <div className="grid md:grid-cols-2 gap-10 xl:gap-16">
                {/* Image Gallery */}
                <div>
                    <Skeleton className="w-full aspect-square rounded-2xl mb-4" />
                    <div className="flex gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="w-20 h-20 rounded-xl" />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-3/4" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                    <div className="space-y-2 pt-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Skeleton className="h-14 flex-1 rounded-xl" />
                        <Skeleton className="h-14 w-14 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
