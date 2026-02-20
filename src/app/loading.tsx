import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
    return (
        <div className="animate-in fade-in duration-300">
            {/* Hero Slider Skeleton */}
            <div className="relative">
                <Skeleton className="w-full h-[400px] md:h-[500px] rounded-none" />
            </div>

            {/* Categories Skeleton */}
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="flex items-center gap-3 my-8">
                        <Skeleton className="h-8 w-1.5 rounded-full" />
                        <Skeleton className="h-8 w-40" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Skeleton */}
            <section className="py-10">
                <div className="container mx-auto">
                    <div className="flex items-center gap-3 my-8">
                        <Skeleton className="h-8 w-1.5 rounded-full" />
                        <Skeleton className="h-8 w-32" />
                    </div>
                    <ProductGridSkeleton count={10} />
                </div>
            </section>
        </div>
    );
}
