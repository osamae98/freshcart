import { Skeleton, SidebarSkeleton } from "@/components/ui/Skeleton";

export default function ProfileLoading() {
    return (
        <div className="container py-8 sm:py-12 animate-in fade-in duration-300">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                        <div className="flex flex-col items-center">
                            <Skeleton className="w-20 h-20 rounded-full mb-3" />
                            <Skeleton className="h-5 w-32 mb-1" />
                            <Skeleton className="h-3 w-40" />
                        </div>
                        <div className="space-y-2 pt-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <SidebarSkeleton />
                    <div className="mt-6 space-y-4">
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-48 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
