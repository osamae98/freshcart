import { getProducts } from "../server/products.actions";
import { getAllCategories } from "@/features/categories/server/categories.actions";
import { getAllBrands } from "@/features/brands/server/brands.actions";
import ProductCard from "../components/ProductCard";
import SearchFilters from "../components/SearchFilters";
import SearchResultsHeader from "../components/SearchResultsHeader";
import RecentlyViewed from "../components/RecentlyViewed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

interface SearchResultsScreenProps {
  searchParams: {
    keyword?: string;
    category?: string;
    brand?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    view?: string;
    rating?: string;
  };
}

export default async function SearchResultsScreen({ searchParams }: SearchResultsScreenProps) {
  const params = {
    keyword: searchParams.keyword,
    category: searchParams.category,
    brand: searchParams.brand,
    sort: searchParams.sort,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    rating: searchParams.rating ? Number(searchParams.rating) : undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
  };

  // Keep the active search and filters when changing pages
  const pageHref = (page: number) => {
    const query = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") query.set(key, value);
    });
    query.set("page", page.toString());
    return `?${query.toString()}`;
  };

  const [productsResult, categoriesResult, brandsResult, allProductsResult] = await Promise.allSettled([
    getProducts(params),
    getAllCategories(),
    getAllBrands(1, 100),
    getProducts({ limit: 6 })
  ]);

  const products = productsResult.status === 'fulfilled' ? productsResult.value.data : [];
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value.data : [];
  const brands = brandsResult.status === 'fulfilled' ? brandsResult.value.data : [];
  const recentlyViewedProducts = allProductsResult.status === 'fulfilled' ? allProductsResult.value.data : [];

  const totalResults = productsResult.status === 'fulfilled' ? productsResult.value.results || 0 : 0;
  const currentPage = productsResult.status === 'fulfilled' ? productsResult.value.metadata?.currentPage || 1 : 1;
  const totalPages = productsResult.status === 'fulfilled' ? productsResult.value.metadata?.numberOfPages || 1 : 1;

  const isGrid = searchParams.view !== "list";

  return (
    <div className="container py-8 sm:py-12">
      <SearchResultsHeader 
        totalResults={totalResults} 
        keyword={searchParams.keyword || ""}
        categoryName={categories.find((category) => category._id === searchParams.category)?.name}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white p-6 border border-gray-100 rounded-2xl sticky top-24">
            <SearchFilters categories={categories} brands={brands} />
          </div>
        </aside>

        {/* Product Listing */}
        <main className="flex-1">
          {products.length > 0 ? (
            <>
              <div className={isGrid ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
                {products.map((product) => (
                    isGrid ? (
                        <ProductCard key={product._id} info={product} />
                    ) : (
                        <div key={product._id} className="flex gap-6 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition">
                            <div className="w-48 h-48 relative flex-shrink-0">
                                <Link href={`/product/${product._id}`}>
                                    <Image 
                                      src={product.imageCover} 
                                      alt={product.title} 
                                      fill 
                                      className="object-contain" 
                                    />
                                </Link>
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-2">
                                <div>
                                    <span className="text-xs text-primary-600 font-bold uppercase tracking-wider">{product.category.name}</span>
                                    <h3 className="text-xl font-bold text-gray-900 mt-1 hover:text-primary-600 transition">
                                        <Link href={`/product/${product._id}`}>{product.title}</Link>
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-bold text-gray-900">{product.priceAfterDiscount || product.price} EGP</span>
                                        {product.priceAfterDiscount && (
                                            <span className="text-sm text-gray-400 line-through">{product.price} EGP</span>
                                        )}
                                    </div>
                                    <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <Link
                      href={pageHref(Math.max(1, currentPage - 1))}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-primary-500 hover:text-primary-500 transition ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                    </Link>
                    {[...Array(totalPages)].map((_, i) => (
                      <Link
                        key={i + 1}
                        href={pageHref(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold transition ${
                          currentPage === i + 1
                            ? "bg-primary-600 border-primary-600 text-white"
                            : "border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-500"
                        }`}
                      >
                        {i + 1}
                      </Link>
                    ))}
                    <Link
                      href={pageHref(Math.min(totalPages, currentPage + 1))}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-primary-500 hover:text-primary-500 transition ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      <FontAwesomeIcon icon={faChevronRight} size="sm" />
                    </Link>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-20 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search terms to find what you&apos;re looking for.</p>
              <Link href="/search" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition">
                Clear all filters
              </Link>
            </div>
          )}
        </main>
      </div>

      <RecentlyViewed products={recentlyViewedProducts} />
    </div>
  );
}
