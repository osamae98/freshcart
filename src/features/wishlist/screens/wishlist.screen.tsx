'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faHeart,
    faArrowLeft,
    faCartPlus,
    faTrash,
    faSpinner,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import WishlistItem from '../components/WishlistItem';
import WishlistSidebar from '../components/WishlistSidebar';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../../cart/hooks/useCart';
import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/types/Products.types';

interface WishlistScreenProps {
    recentlyViewed: Product[];
}

const ITEMS_PER_PAGE = 5;

export default function WishlistScreen({ recentlyViewed }: WishlistScreenProps) {
    const { items, count, removeFromWishlist, isLoading, fetchWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddingAll, setIsAddingAll] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleAddAllToCart = async () => {
        if (items.length === 0) return;
        setIsAddingAll(true);
        try {
            for (const item of items) {
                await addToCart(item._id);
            }
        } catch {
            // toasts are handled inside addToCart
        } finally {
            setIsAddingAll(false);
        }
    };

    const handleClearAll = async () => {
        if (items.length === 0) return;
        setIsClearing(true);
        try {
            for (const item of items) {
                await removeFromWishlist(item._id);
            }
        } catch {
            // toasts handled inside removeFromWishlist
        } finally {
            setIsClearing(false);
            await fetchWishlist();
        }
    };

    // Loading state
    if (isLoading && items.length === 0) {
        return (
            <div className="container py-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading your wishlist...</p>
            </div>
        );
    }

    // Empty state
    if (!isLoading && items.length === 0) {
        return (
            <div className="container py-20 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-300 text-4xl">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Start adding items you love to your wishlist. They&apos;ll show up here so you can easily find and purchase them later!
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-95"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="sm" />
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-8 sm:py-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
                <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                <span className="text-gray-900 font-semibold">Wishlist</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                {/* Left Side: Wishlist Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="p-6 sm:p-8 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
                                    <p className="text-gray-500 mt-1">{count} items in your wishlist</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleClearAll}
                                        disabled={isClearing}
                                        className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                                    >
                                        {isClearing ? (
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        ) : (
                                            <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                        )}
                                        Clear All
                                    </button>
                                    <button
                                        onClick={handleAddAllToCart}
                                        disabled={isAddingAll}
                                        className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all active:scale-95 disabled:bg-gray-300"
                                    >
                                        {isAddingAll ? (
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        ) : (
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        )}
                                        Add All to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="px-6 sm:px-8">
                            {paginatedItems.map((item) => (
                                <WishlistItem
                                    key={item._id}
                                    item={item}
                                    onRemove={removeFromWishlist}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-6 sm:p-8 border-t border-gray-100 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                                            currentPage === page
                                                ? 'bg-primary-600 text-white shadow-sm'
                                                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <WishlistSidebar />
                    </div>
                </div>
            </div>

            {/* Recently Viewed Section */}
            {recentlyViewed.length > 0 && (
                <section className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
                        <Link href="/products" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                        {recentlyViewed.map(item => (
                            <ProductCard key={item._id} info={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
