import { CartItemSkeleton, Skeleton, SidebarSkeleton } from "@/components/ui/Skeleton";

export default function WishlistLoading() {
    return (
        <div className="container py-8 sm:py-12 animate-in fade-in duration-300">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                {/* Wishlist Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <Skeleton className="h-8 w-40 mb-2" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-10 w-36 rounded-lg" />
                            </div>
                        </div>
                        <div className="px-6 sm:px-8">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <CartItemSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <SidebarSkeleton />
                    <SidebarSkeleton />
                </div>
            </div>
        </div>
    );
}
