"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../types/Products.types";
import Link from "next/link";

interface RecentlyViewedProps {
  products: Product[];
}

export default function RecentlyViewed({ products }: RecentlyViewedProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
        <button className="text-primary-600 font-semibold hover:text-primary-700">
          View All <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((item) => (
          <Link key={item._id} href={`/product/${item._id}`} className="group">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-3 transition-transform group-hover:-translate-y-1">
              <Image
                src={item.imageCover}
                alt={item.title}
                fill
                className="p-4 object-contain"
              />
              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FontAwesomeIcon icon={faChevronRight} size="xs" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center mt-1">
                <span className="text-sm font-bold text-gray-900">{item.priceAfterDiscount || item.price} EGP</span>
                {item.priceAfterDiscount && (
                    <span className="text-xs text-gray-400 line-through ml-2">{item.price} EGP</span>
                )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
