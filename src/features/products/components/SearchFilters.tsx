"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { ProductCategory, Brand } from "../types/Products.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

interface SearchFiltersProps {
  categories: ProductCategory[];
  brands: Brand[];
}

export default function SearchFilters({ categories, brands }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "5");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "75");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(`${pathname}?${createQueryString(name, value)}`);
  };

  const handleApplyPrice = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", minPrice);
    params.set("maxPrice", maxPrice);
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category._id} className="flex items-center">
              <input
                type="checkbox"
                id={category._id}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                checked={searchParams.get("category") === category._id}
                onChange={(e) => handleFilterChange("category", e.target.checked ? category._id : "")}
              />
              <label htmlFor={category._id} className="ml-2 text-sm text-gray-600 cursor-pointer">
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
             <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
             />
          </div>
          <span className="text-gray-400">to</span>
          <div className="relative flex-1">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
             <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
             />
          </div>
        </div>
        <input 
            type="range" 
            min="0" 
            max="1000" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full mt-4 accent-primary-600"
        />
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Brands</h3>
        <ul className="space-y-2">
          {brands.slice(0, 10).map((brand) => (
            <li key={brand._id} className="flex items-center">
              <input
                type="checkbox"
                id={brand._id}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                checked={searchParams.get("brand") === brand._id}
                onChange={(e) => handleFilterChange("brand", e.target.checked ? brand._id : "")}
              />
              <label htmlFor={brand._id} className="ml-2 text-sm text-gray-600 cursor-pointer">
                {brand.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Ratings</h3>
        <ul className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <li key={rating} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                checked={searchParams.get("rating") === rating.toString()}
                onChange={(e) => handleFilterChange("rating", e.target.checked ? rating.toString() : "")}
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center cursor-pointer">
                <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={i < rating ? faStarSolid : faStarRegular} />
                    ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">({rating} & up)</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleApplyPrice}
          className="flex-1 bg-primary-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-100 text-gray-600 text-sm font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
