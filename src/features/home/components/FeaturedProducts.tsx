import ProductCard from "@/features/products/components/ProductCard";
import { getProducts } from "../../products/server/products.actions";
import { Product } from "@/features/products/types/Products.types";

export default async function FeaturedProducts() {
    let products: Product[] = [];
    try {
        const response = await getProducts();
        products = response.data;
    } catch {
        // API temporarily unavailable — show empty state gracefully
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <>
        <section className="py-10">
            <div className="container mx-auto">
                <div className="flex items-center gap-3 my-8">
                    <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-gray-600">Products</h2>
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
        </>
    )
}