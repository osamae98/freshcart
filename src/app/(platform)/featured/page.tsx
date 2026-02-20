import ProductCard from "@/features/products/components/ProductCard";
import { getProducts } from "@/features/products/server/products.actions";
import { Product } from "@/features/products/types/Products.types";

export default async function FeaturedPage() {
    let products: Product[] = [];
    try {
        const response = await getProducts();
        products = response.data;
    } catch {
        // API temporarily unavailable
    }

    if (products.length === 0) {
        return (
            <section className="py-10">
                <div className="container mx-auto text-center py-20">
                    <p className="text-gray-400 text-lg">Products are temporarily unavailable. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10">
            <div className="container mx-auto">
                <div className="flex items-center gap-3 my-8">
                    <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-gray-600">Featured Products</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {
                        products.map((product) => (
                            <ProductCard key={product._id} info={product} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
