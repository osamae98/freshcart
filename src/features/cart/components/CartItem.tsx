'use client';

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Ratings from "@/components/ui/Ratings";
import { CartItem as CartItemType } from "../types/Cart.types";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, count: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const { product, count, price } = item;

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-gray-100 last:border-0 group">
            {/* Product Image */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                {product.imageCover ? (
                    <Image
                        src={product.imageCover}
                        alt={product.title || 'Product image'}
                        fill
                        className="object-contain p-2"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No Image</div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category?.name || 'Uncategorized'}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Ratings rating={product.ratingsAverage || 0} />
                    <span className="text-xs text-gray-400">
                        {product.ratingsAverage || 0}
                        {/* The cart API omits ratingsQuantity, so only show it when present */}
                        {product.ratingsQuantity !== undefined && ` (${product.ratingsQuantity} reviews)`}
                    </span>
                </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                    onClick={() => onUpdateQuantity(product._id, count - 1)}
                    disabled={count <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                >
                    <FontAwesomeIcon icon={faMinus} size="xs" />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{count}</span>
                <button
                    onClick={() => onUpdateQuantity(product._id, count + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                    <FontAwesomeIcon icon={faPlus} size="xs" />
                </button>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-xl font-bold text-primary-600">{(price * count).toFixed(2)} EGP</div>
                    {product.price > price && (
                        <div className="text-sm text-gray-400 line-through">{(product.price * count).toFixed(2)} EGP</div>
                    )}
                </div>
                <button
                    onClick={() => onRemove(product._id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}
