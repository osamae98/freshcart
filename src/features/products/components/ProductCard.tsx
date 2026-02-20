'use client';

import { faArrowsRotate, faEye, faHeart, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../types/Products.types";
import Ratings from "@/components/ui/Ratings";
import Image from "next/image";
import { useCart } from "../../cart/hooks/useCart";
import { useWishlist } from "../../wishlist/hooks/useWishlist";
import { useState } from "react";


export default function ProductCard({info}: {info:Product}){
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [isAdding, setIsAdding] = useState(false);
    const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

    const {
        category,
        title,
        imageCover,
        ratingAverage,
        ratingQuantity,
        price,
        priceAfterDiscount,
        _id
    } = info;

    const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
    const discountPercentage = priceAfterDiscount 
        ? Math.round(((price - priceAfterDiscount) / price) * 100)
        : 0;

    const inWishlist = isInWishlist(_id);

    const handleAddToCart = async () => {
        setIsAdding(true);
        await addToCart(_id);
        setIsAdding(false);
    }

    const handleToggleWishlist = async () => {
        setIsTogglingWishlist(true);
        if (inWishlist) {
            await removeFromWishlist(_id);
        } else {
            await addToWishlist(_id);
        }
        setIsTogglingWishlist(false);
    }


    return (
    <>
    <div 
       id="product-card"
       className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
       >
        <div className="relative">
            <Image 
               className="w-full h-60 object-contain bg-white"
               src={imageCover}
               alt={title}
               width={300}
               height={240}
               />
            <div className="absolute top-3 left-3">
                {onSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{discountPercentage}%
                    </span>
                )}
            </div>
            <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <button
                    onClick={handleToggleWishlist}
                    disabled={isTogglingWishlist}
                    className={`bg-white h-8 w-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                        inWishlist 
                            ? 'text-red-500 hover:text-red-600' 
                            : 'text-gray-600 hover:text-red-500'
                    } disabled:opacity-50`}
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {isTogglingWishlist ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="text-sm" />
                    ) : (
                        <FontAwesomeIcon icon={inWishlist ? faHeart : faHeartOutline} />
                    )}
                </button>
                <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm">
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </button>
                <Link
                    href={`/product/${_id}`}
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm">
                        <FontAwesomeIcon icon={faEye} />
                    </Link>
            </div>
        </div>
        <div className="p-4">
            <div className="text-xs text-gray-500 mb-1"> {category.name}</div>
            <h3 className="font-medium mb-1 cursor-pointer">
                <Link className="line-clamp-2" href={`/product/${_id}`}>
                {title}
                </Link>
            </h3>
            <div className="flex items-center">
                <div className="flex text-amber-400 mr-2">
                    {/*RATINGS*/}
                    <Ratings rating={ratingAverage} />
                </div>
                <span className="text-xs text-gray-500">
                    {ratingAverage} ({ratingQuantity} reviews)
                </span>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-lg font-bold text-primary-600">
                        {priceAfterDiscount || price} EGP
                    </span>
                    {onSale && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                            {price} EGP
                        </span>
                    )}
                </div>
                <button 
                  disabled={isAdding}
                  onClick={handleAddToCart}
                  className="bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-700 transition disabled:bg-gray-400">
                    {isAdding ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPlus} />}
                </button>
            </div>
        </div>
       </div>
    </>
)
}