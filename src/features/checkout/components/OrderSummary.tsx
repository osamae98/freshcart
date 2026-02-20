'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUndo, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { CartItem } from "../../cart/types/Cart.types";

interface OrderSummaryProps {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    onProceed: () => void;
}

export default function OrderSummary({ 
    items, 
    subtotal, 
    shipping, 
    discount, 
    tax,
    onProceed 
}: OrderSummaryProps) {
    const total = subtotal + shipping - discount + tax;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Items List */}
                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                    {items.map((item) => (
                        <div key={item._id} className="flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                                <Image 
                                    src={item.product.imageCover} 
                                    alt={item.product.title}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <div className="flex-grow min-w-0">
                                <h4 className="text-sm font-bold text-gray-900 truncate">{item.product.title}</h4>
                                <p className="text-xs text-gray-500">Qty: {item.count}</p>
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                ${item.price.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Costs */}
                <div className="space-y-4 pt-6 border-t border-gray-50">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Discount</span>
                        <span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Delivery</span>
                        <span className="font-bold text-gray-900">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Tax</span>
                        <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-black text-primary-600">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <button 
                        onClick={onProceed}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                    >
                        Proceed to Payment
                        <FontAwesomeIcon icon={faArrowRight} size="sm" />
                    </button>
                    <Link 
                        href="/cart"
                        className="w-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <FontAwesomeIcon icon={faUndo} size="xs" className="mr-1" />
                        Return to Cart
                    </Link>
                </div>
            </div>

            {/* Secure Checkout */}
            <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                        <FontAwesomeIcon icon={faShieldAlt} size="sm" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Secure Checkout</h4>
                        <p className="text-xs text-gray-500">Your payment information is secure</p>
                    </div>
                </div>
                <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed items-center">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={16} className="h-4 w-auto" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={30} height={20} className="h-5 w-auto" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={60} height={16} className="h-4 w-auto" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" width={20} height={20} className="h-5 w-auto" />
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" width={40} height={16} className="h-4 w-auto" />
                </div>
            </div>
        </div>
    );
}
