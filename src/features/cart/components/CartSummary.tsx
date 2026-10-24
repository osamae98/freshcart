'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faShieldAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
}

export default function CartSummary({ subtotal, shipping, discount, tax }: CartSummaryProps) {
    const total = subtotal + shipping - discount + tax;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold text-gray-900">{subtotal.toFixed(2)} EGP</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Shipping</span>
                        <span className={`font-bold ${shipping === 0 ? 'text-green-500' : 'text-gray-900'}`}>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)} EGP`}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Discount</span>
                            <span className="font-bold text-red-500">-{discount.toFixed(2)} EGP</span>
                        </div>
                    )}
                    {tax > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Tax</span>
                            <span className="font-bold text-gray-900">{tax.toFixed(2)} EGP</span>
                        </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-black text-primary-600">{total.toFixed(2)} EGP</span>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <Link 
                        href="/checkout"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                    >
                        Proceed to Checkout
                        <FontAwesomeIcon icon={faArrowRight} size="sm" />
                    </Link>
                    <Link 
                        href="/featured"
                        className="w-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-primary-50/50 rounded-2xl border border-primary-100 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0">
                    <FontAwesomeIcon icon={faTruck} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900">Free Delivery</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Your order qualifies for free delivery. Estimated delivery: 2-3 business days
                    </p>
                </div>
            </div>

            {/* Secure Checkout */}
            <div className="bg-green-50/50 rounded-2xl border border-green-100 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <FontAwesomeIcon icon={faShieldAlt} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900">Secure Checkout</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Your payment information is protected with 256-bit SSL encryption
                    </p>
                </div>
            </div>
        </div>
    );
}
