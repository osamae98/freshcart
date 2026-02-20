interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <Skeleton className="w-full h-60 rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function CategoryCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden">
            <Skeleton className="h-52 w-full rounded-2xl" />
        </div>
    );
}

export function BrandCardSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
            <Skeleton className="w-20 h-20 rounded-xl mx-auto mb-4" />
            <Skeleton className="h-4 w-24 mx-auto mb-2" />
            <Skeleton className="h-3 w-16 mx-auto" />
        </div>
    );
}

export function CartItemSkeleton() {
    return (
        <div className="flex items-center gap-6 py-6 border-b border-gray-100">
            <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-6 w-16" />
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gray-100">
            <Skeleton className="h-64 md:h-80 w-full rounded-2xl" />
        </div>
    );
}

export function SidebarSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <Skeleton className="h-5 w-32 mb-4" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
        </div>
    );
}
