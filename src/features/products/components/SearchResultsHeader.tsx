"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SearchResultsHeaderProps {
  totalResults: number;
  keyword: string;
}

export default function SearchResultsHeader({ totalResults, keyword }: SearchResultsHeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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

    const handleSortChange = (value: string) => {
        router.push(`${pathname}?${createQueryString("sort", value)}`);
    };

    const isGrid = searchParams.get("view") !== "list";

    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <nav className="text-sm text-gray-500 mb-4">
                        <ol className="flex list-none p-0">
                            <li className="flex items-center">
                                <Link href="/" className="hover:text-primary-600">Home</Link>
                                <span className="mx-2">›</span>
                            </li>
                            <li className="text-gray-900 font-medium text-xs">Search Results</li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Search Results for &quot;{keyword || "All Products"}&quot;
                    </h1>
                    <p className="text-gray-500">We found <span className="font-bold text-gray-900">{totalResults}</span> products for you</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                        <button 
                            onClick={() => router.push(`${pathname}?${createQueryString("view", "grid")}`)}
                            className={`p-2 rounded-md transition ${isGrid ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <FontAwesomeIcon icon={faGrip} size="sm" />
                        </button>
                        <button 
                            onClick={() => router.push(`${pathname}?${createQueryString("view", "list")}`)}
                            className={`p-2 rounded-md transition ${!isGrid ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <FontAwesomeIcon icon={faListUl} size="sm" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
                        <select 
                            value={searchParams.get("sort") || "relevance"}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="bg-white border border-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="-createdAt">Newest Items</option>
                            <option value="price">Price: Low to High</option>
                            <option value="-price">Price: High to Low</option>
                            <option value="-ratingsAverage">Average Rating</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
