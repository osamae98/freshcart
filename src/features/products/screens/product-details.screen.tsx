import { getProductById, getProducts } from "../server/products.actions";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductTabs from "../components/ProductDetails/ProductTabs";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/Products.types";

export default async function ProductDetailsScreen({productId}: {productId: string}) {
    let product: Product | null = null;
    let relatedProducts: Product[] = [];
    let recentlyViewed: Product[] = [];

    try {
        const [productResponse, allProductsResponse] = await Promise.all([
            getProductById({id: productId}),
            getProducts()
        ]);

        product = productResponse.data;
        relatedProducts = allProductsResponse.data
            .filter(p => p.category._id === product!.category._id && p._id !== product!._id)
            .slice(0, 4);
        recentlyViewed = allProductsResponse.data
            .filter(p => p._id !== product!._id)
            .slice(0, 6);
    } catch {
        // API failed
    }

    if (!product) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not available</h1>
                <p className="text-gray-500 mb-8">This product could not be loaded right now. Please try again later.</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-xl transition-all">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-8 sm:py-12">
            {/* Main Product Section */}
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
                <ProductGallery images={product.images} title={product.title} />
                <ProductInfo product={product} />
            </div>

            {/* Product Details Tabs */}
            <ProductTabs product={product} />

            {/* You May Also Like Section */}
            <section className="mt-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map(item => (
                        <ProductCard key={item._id} info={item} />
                    ))}
                </div>
            </section>

            {/* Recently Viewed Section */}
            <section className="mt-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
                    <button className="text-primary-600 font-semibold hover:text-primary-700">View All</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {recentlyViewed.map(item => (
                        <div key={item._id} className="group cursor-pointer">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-3 transition-transform group-hover:-translate-y-1">
                                <Image 
                                    src={item.imageCover} 
                                    alt={item.title} 
                                    fill
                                    className="p-2 object-contain"
                                />
                                <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FontAwesomeIcon icon={faChevronRight} size="xs" />
                                </button>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                                {item.title}
                            </h3>
                            <span className="text-sm font-bold text-gray-500">${item.price}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}