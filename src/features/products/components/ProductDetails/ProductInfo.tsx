'use client';

import React, { useState } from 'react';
import Ratings from '@/components/ui/Ratings';
import { Product } from '../../types/Products.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faCartPlus, faShareAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faTruck, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/features/cart/hooks/useCart';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();

  const weights = ['250g', '500g', '1kg'];

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  const onAddToCart = async () => {
    await addToCart(product._id);
  };

  const discountPercentage = product.priceAfterDiscount 
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full mb-3">
            In Stock
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <div className="flex items-center gap-3">
            <Ratings rating={product.ratingsAverage} />
            <span className="text-sm text-gray-500">
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </span>
          </div>
        </div>
        <div className="flex gap-2 text-gray-400">
          <button className="p-2 hover:text-primary-500 transition-colors">
            <FontAwesomeIcon icon={faShareAlt} />
          </button>
          <button 
            onClick={() => setIsWishlist(!isWishlist)}
            className={`p-2 transition-colors ${isWishlist ? 'text-red-500' : 'hover:text-red-500'}`}
          >
            <FontAwesomeIcon icon={isWishlist ? faHeart : faHeartRegular} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold text-primary-600">
          {product.priceAfterDiscount || product.price} EGP
        </span>
        {product.priceAfterDiscount && (
          <>
            <span className="text-xl text-gray-400 line-through">{product.price} EGP</span>
            <span className="px-2 py-0.5 text-xs font-bold text-red-500 bg-red-50 rounded">
              Save {discountPercentage}%
            </span>
          </>
        )}
      </div>

      <p className="text-gray-600 leading-relaxed border-t border-b border-gray-100 py-6">
        {product.description}
      </p>

      <div className="space-y-4">
        <div>
          <span className="block text-sm font-semibold text-gray-900 mb-3">Weight:</span>
          <div className="flex gap-3">
            {weights.map((weight) => (
              <button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedWeight === weight
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-gray-200 text-gray-600 hover:border-primary-500'
                }`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="space-y-2">
            <span className="block text-sm font-semibold text-gray-900">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={handleDecrease}
                className="px-4 py-2 hover:bg-gray-50 text-gray-600 border-r border-gray-200 transition-colors"
                disabled={quantity <= 1}
              >
                <FontAwesomeIcon icon={faMinus} size="sm" />
              </button>
              <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-4 py-2 hover:bg-gray-50 text-gray-600 border-l border-gray-200 transition-colors"
                disabled={quantity >= product.quantity}
              >
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </button>
            </div>
          </div>
          <div className="self-end pb-3 text-sm text-gray-500">
            Only <span className="font-bold text-red-500">{product.quantity}</span> items left in stock
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button 
          onClick={onAddToCart}
          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 active:scale-95"
        >
          <FontAwesomeIcon icon={faCartPlus} />
          Add To Cart
        </button>
        <button className="flex-1 border-2 border-gray-100 hover:border-gray-200 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all active:scale-95">
          Buy Now
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div>
            <span className="block text-sm font-bold text-gray-900">Free Delivery</span>
            <span className="block text-xs text-gray-500">Free shipping on orders over 500 EGP</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <FontAwesomeIcon icon={faRotateLeft} />
          </div>
          <div>
            <span className="block text-sm font-bold text-gray-900">30 Days Return</span>
            <span className="block text-xs text-gray-500">Satisfaction guaranteed or money back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
