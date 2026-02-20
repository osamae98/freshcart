import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface BrandFeaturedCardProps {
  name: string;
  image: string;
  description: string;
  productCount: number;
  tagline: string;
}

const BrandFeaturedCard = ({ name, image, description, productCount, tagline }: BrandFeaturedCardProps) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-white/80 text-sm font-medium">{tagline}</p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 text-[15px] leading-relaxed mb-6 group-hover:text-gray-900 transition-colors">
          {description}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-400">{productCount} Products</span>
          <Link 
            href={`/brands/${name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-primary-600 font-bold text-sm flex items-center gap-2"
          >
            View Products <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};


export default BrandFeaturedCard;
