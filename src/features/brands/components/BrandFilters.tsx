'use client';

import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';

const BrandFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    // Debounce the search to avoid excessive navigations
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set('search', value.trim());
      } else {
        params.delete('search');
      }
      params.delete('page');
      router.push(`/brands?${params.toString()}`);
    }, 400);
  };

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page');
    router.push(`/brands?${params.toString()}`);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      <div className="relative w-full md:max-w-md">
        <input
          type="text"
          placeholder="Search brands..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all"
          defaultValue={searchParams.get('search') ?? ''}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FontAwesomeIcon 
          icon={faSearch} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Sort by:</span>
        <select 
          className="w-full md:w-48 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all text-sm font-medium"
          defaultValue={searchParams.get('sort') ?? 'az'}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="az">Alphabetical: A-Z</option>
          <option value="za">Alphabetical: Z-A</option>
          <option value="newest">Newest First</option>
          <option value="pop">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

export default BrandFilters;
