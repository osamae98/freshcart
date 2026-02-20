import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BrandCardProps {
  name: string;
  image: string;
  category: string;
  productCount: number;
}

const BrandCard = ({ name, image, category, productCount }: BrandCardProps) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:border-primary-100 hover:shadow-md transition-all duration-200">
      <div className="p-4 sm:p-6 flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4 bg-primary-50 rounded-2xl flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="p-4 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">{category}</p>
        
        <div className="w-full h-px bg-gray-100 mb-4"></div>
        
        <div className="w-full flex items-center justify-between text-xs sm:text-sm">
          <span className="font-medium text-gray-500">{productCount} Products</span>
          <Link 
            href={`/brands/${name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-primary-600 font-bold hover:text-primary-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
