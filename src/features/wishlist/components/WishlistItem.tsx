'use client';

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Ratings from "@/components/ui/Ratings";
import { WishlistProduct } from "../types/Wishlist.types";
import { useCart } from "../../cart/hooks/useCart";
import { useState } from "react";

interface WishlistItemProps {
    item: WishlistProduct;
    onRemove: (id: string) => void;
}

export default function WishlistItem({ item, onRemove }: WishlistItemProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        await addToCart(item._id);
        setIsAdding(false);
    };

    const handleRemove = async () => {
        setIsRemoving(true);
        await onRemove(item._id);
        setIsRemoving(false);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-5 py-5 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 transition-colors -mx-6 sm:-mx-8 px-6 sm:px-8">
            {/* Product Image */}
            <Link
                href={`/product/${item._id}`}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 hover:border-primary-200 transition-colors"
            >
                {item.imageCover ? (
                    <Image
                        src={item.imageCover}
                        alt={item.title || 'Product image'}
                        fill
                        className="object-contain p-2"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No Image</div>
                )}
            </Link>

            {/* Product Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <p className="text-xs text-gray-400 mb-0.5">{item.category?.name || 'Uncategorized'}</p>
                <Link href={`/product/${item._id}`}>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors cursor-pointer">
                        {item.title}
                    </h3>
                </Link>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Ratings rating={item.ratingsAverage || 0} />
                    <span className="text-xs text-gray-400">
                        {item.ratingsAverage || 0} ({item.ratingsQuantity || 0})
                    </span>
                </div>
            </div>

            {/* Price */}
            <div className="text-center sm:text-right flex-shrink-0 sm:min-w-[80px]">
                <div className="text-lg font-bold text-primary-600">
                    ${item.priceAfterDiscount || item.price}
                </div>
                {item.priceAfterDiscount && item.priceAfterDiscount < item.price && (
                    <div className="text-xs text-gray-400 line-through">${item.price}</div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isAdding ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        <FontAwesomeIcon icon={faCartPlus} />
                    )}
                    <span className="hidden sm:inline">Add to Cart</span>
                </button>
                <button
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90 disabled:opacity-50"
                    title="Remove from wishlist"
                >
                    {isRemoving ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        <FontAwesomeIcon icon={faTrash} />
                    )}
                </button>
            </div>
        </div>
    );
}
