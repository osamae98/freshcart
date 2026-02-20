'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import CouponSection from '../components/CouponSection';
import { useCart } from '../hooks/useCart';
import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/types/Products.types';

interface CartScreenProps {
    relatedProducts: Product[];
}

export default function CartScreen({ relatedProducts }: CartScreenProps) {
    const { cart, numOfCartItems, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();

    if (isLoading && !cart) {
        return (
            <div className="container py-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading your cart...</p>
            </div>
        );
    }

    if (!cart || cart.products.length === 0) {
        return (
            <div className="container py-20 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 text-4xl">
                    <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Looks like you haven&apos;t added anything to your cart yet. Explore our products and find something you love!
                </p>
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-95"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="sm" />
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-8 sm:py-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:text-primary-600">Home</Link>
                <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                <span className="text-gray-900 font-semibold">Shopping Cart</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                {/* Left Side: Cart Items & Coupon */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
                                <p className="text-gray-500 mt-1">{numOfCartItems} items in your cart</p>
                            </div>
                            <button 
                                onClick={() => clearCart()}
                                className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                                Clear Cart
                            </button>
                        </div>
                        
                        <div className="px-6 sm:px-8">
                            {cart.products.map((item) => (
                                <CartItem 
                                    key={item._id} 
                                    item={item} 
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    </div>

                    <CouponSection />
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <CartSummary 
                            subtotal={cart.totalCartPrice}
                            shipping={0} // Example: Free shipping
                            discount={3.25} // Example: Mock discount for FRESH20
                            tax={1.04} // Example: Mock tax
                        />
                    </div>
                </div>
            </div>

            {/* You Might Also Like Section */}
            {relatedProducts.length > 0 && (
                <section className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
                        <Link href="/products" className="text-primary-600 font-semibold hover:text-primary-700">
                            View All
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(item => (
                            <ProductCard key={item._id} info={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
