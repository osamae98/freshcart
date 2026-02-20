import React from 'react';
import BrandHero from '../components/BrandHero';
import BrandCard from '../components/BrandCard';
import BrandFeaturedCard from '../components/BrandFeaturedCard';
import BrandFilters from '../components/BrandFilters';
import BrandCTA from '../components/BrandCTA';
import { getAllBrands } from '../server/brands.actions';
import { Brand } from '../types/Brands.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface BrandsScreenProps {
    searchParams: { page?: string; search?: string; sort?: string };
}

export default async function BrandsScreen({ searchParams }: BrandsScreenProps) {
    const page = Number(searchParams.page) || 1;
    const searchQuery = searchParams.search?.toLowerCase() || '';
    const sortOrder = searchParams.sort || 'az';

    let allBrands: Brand[] = [];
    let totalPages = 1;

    try {
        if (searchQuery) {
            // When searching, fetch all brands and filter client-side
            // (API doesn't support search for brands)
            const allPagesResponse = await getAllBrands(1, 100);
            const filtered = allPagesResponse.data.filter(brand =>
                brand.name.toLowerCase().includes(searchQuery)
            );

            // Sort
            filtered.sort((a, b) => {
                switch (sortOrder) {
                    case 'za': return b.name.localeCompare(a.name);
                    case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    default: return a.name.localeCompare(b.name);
                }
            });

            // Paginate the filtered results
            const perPage = 12;
            totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
            const startIndex = (page - 1) * perPage;
            allBrands = filtered.slice(startIndex, startIndex + perPage);
        } else {
            const response = await getAllBrands(page, 12);
            allBrands = response.data;
            totalPages = response.metadata?.numberOfPages || 1;

            // Sort if needed
            if (sortOrder !== 'az') {
                allBrands.sort((a, b) => {
                    switch (sortOrder) {
                        case 'za': return b.name.localeCompare(a.name);
                        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        default: return a.name.localeCompare(b.name);
                    }
                });
            }
        }
    } catch {
        // API temporarily unavailable
    }

    // Build search params string for pagination links (preserve search & sort)
    const buildPageUrl = (p: number) => {
        const params = new URLSearchParams();
        params.set('page', p.toString());
        if (searchQuery) params.set('search', searchParams.search!);
        if (sortOrder !== 'az') params.set('sort', sortOrder);
        return `/brands?${params.toString()}`;
    };

    // Mock featured brands
    const featuredBrands = [
        {
            name: "Nature's Harvest",
            tagline: "Premium Organic Produce",
            description: "Bringing the freshest organic fruits and vegetables from farm to table since 1995.",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
            productCount: 124
        },
        {
            name: "Pure Dairy",
            tagline: "Farm Fresh Dairy Products",
            description: "Ethically sourced dairy products from family-owned farms with no artificial additives.",
            image: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=800",
            productCount: 87
        },
        {
            name: "Hearth & Grain",
            tagline: "Artisan Bakery Products",
            description: "Handcrafted breads and pastries made with traditional methods and organic ingredients.",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
            productCount: 62
        }
    ];

    return (
        <div className="pb-20">
            <BrandHero />

            <div className="container mt-12">
                {/* Featured Brands Section */}
                {!searchQuery && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Brands</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredBrands.map((brand, index) => (
                                <BrandFeaturedCard 
                                    key={index}
                                    {...brand}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Brands Section */}
                <section>
                    <BrandFilters />

                    {/* Search results header */}
                    {searchQuery && (
                        <div className="mb-6">
                            <p className="text-gray-500">
                                {allBrands.length > 0 ? (
                                    <>Showing results for <span className="font-semibold text-gray-900">&quot;{searchParams.search}&quot;</span></>
                                ) : (
                                    <>No brands found for <span className="font-semibold text-gray-900">&quot;{searchParams.search}&quot;</span></>
                                )}
                            </p>
                        </div>
                    )}

                    {allBrands.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {allBrands.map((brand) => (
                                <BrandCard
                                    key={brand._id}
                                    name={brand.name}
                                    image={brand.image}
                                    category="Global Partner"
                                    productCount={brand.name.length * 5}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 mb-12">
                            <p className="text-gray-400 text-lg">No brands to display</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            <Link 
                                href={buildPageUrl(page - 1)}
                                className={`w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                            </Link>
                            
                            {[...Array(totalPages)].map((_, i) => {
                                const p = i + 1;
                                return (
                                    <Link
                                        key={i}
                                        href={buildPageUrl(p)}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all ${
                                            page === p 
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                                            : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-500'
                                        }`}
                                    >
                                        {p}
                                    </Link>
                                );
                            }).slice(0, 5)}

                            {totalPages > 5 && <span className="text-gray-400">...</span>}
                            {totalPages > 5 && (
                                <Link 
                                    href={buildPageUrl(totalPages)}
                                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 font-semibold hover:border-primary-500 hover:text-primary-500"
                                >
                                    {totalPages}
                                </Link>
                            )}

                            <Link 
                                href={buildPageUrl(page + 1)}
                                className={`w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                <FontAwesomeIcon icon={faChevronRight} size="sm" />
                            </Link>
                        </div>
                    )}
                </section>

                <BrandCTA />
            </div>
        </div>
    );
}
