import { Skeleton, TableRowSkeleton } from "@/components/ui/Skeleton";

export default function OrdersLoading() {
    return (
        <div className="container py-8 sm:py-12 animate-in fade-in duration-300">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
            </div>

            {/* Header */}
            <div className="mb-8">
                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
                <div className="px-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
