"use client";

import { useState } from "react";
import { Category } from "../types/Category.types";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const categoryTags: string[][] = [
    ["Organic", "Fresh", "Local"],
    ["Organic", "Farm Fresh"],
    ["Artisan", "Fresh Baked"],
    ["Premium", "Fresh", "Wild Caught"],
    ["Organic", "Natural"],
    ["Eco-Friendly", "Natural"],
];

function CategoryCard({ category, index }: { category: Category; index: number }) {
    const tags = categoryTags[index % categoryTags.length];
    // Deterministic item count based on name
    const itemCount = (category.name.length * 7 + index * 13) % 80 + 20;

    return (
        <Link
            href={`/search?category=${category._id}`}
            className="group relative rounded-2xl overflow-hidden h-52 block"
        >
            <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-0.5">{category.name}</h3>
                <span className="text-white/70 text-sm">{itemCount} items</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex gap-1.5 mt-8">
                    {tags.map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary-600 transition-colors mt-8">
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </div>
            </div>
        </Link>
    );
}

export default function CategoryList({ initialCategories }: { initialCategories: Category[] }) {
    const [sortBy, setSortBy] = useState("Featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Calculate item counts for sorting (using the same logic as CategoryCard)
    const getItemCount = (name: string, index: number) => (name.length * 7 + index * 13) % 80 + 20;

    const sortedCategories = [...initialCategories].sort((a, b) => {
        const indexA = initialCategories.indexOf(a);
        const indexB = initialCategories.indexOf(b);
        
        switch (sortBy) {
            case "Name A-Z":
                return a.name.localeCompare(b.name);
            case "Name Z-A":
                return b.name.localeCompare(a.name);
            case "Most Items":
                return getItemCount(b.name, indexB) - getItemCount(a.name, indexA);
            default: // Featured
                return 0; // Keep original order
        }
    });

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Categories</h1>
                    <p className="text-gray-500">Browse our wide selection of fresh products by category</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="flex items-center gap-2 mr-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary-500 bg-white"
                        >
                            <option>Featured</option>
                            <option>Name A-Z</option>
                            <option>Name Z-A</option>
                            <option>Most Items</option>
                        </select>
                    </div>
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button 
                            onClick={() => setViewMode("grid")}
                            className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-primary-600 text-white" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="0" y="0" width="7" height="7" rx="1"/><rect x="9" y="0" width="7" height="7" rx="1"/><rect x="0" y="9" width="7" height="7" rx="1"/><rect x="9" y="9" width="7" height="7" rx="1"/></svg>
                        </button>
                        <button 
                            onClick={() => setViewMode("list")}
                            className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-primary-600 text-white" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="3" rx="1"/><rect x="0" y="6.5" width="16" height="3" rx="1"/><rect x="0" y="13" width="16" height="3" rx="1"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16" 
                : "flex flex-col gap-4 mb-16"
            }>
                {sortedCategories.map((category) => {
                    const originalIndex = initialCategories.indexOf(category);
                    const itemCount = getItemCount(category.name, originalIndex);
                    
                    if (viewMode === "list") {
                        return (
                            <Link
                                key={category._id}
                                href={`/search?category=${category._id}`}
                                className="group flex flex-col sm:flex-row items-center gap-6 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl hover:border-primary-100 transition-all duration-300"
                            >
                                <div className="w-full sm:w-32 h-32 relative rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="flex-1 w-full text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{category.name}</h3>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold self-center sm:self-auto">
                                            {itemCount} products available
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-1 sm:line-clamp-2">Browse our high-quality selection of fresh {category.name.toLowerCase()} products, sourced directly with quality assurance.</p>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                        <div className="flex gap-1.5">
                                            {categoryTags[originalIndex % categoryTags.length].map((tag, i) => (
                                                <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="hidden sm:flex items-center gap-2 text-primary-600 text-sm font-bold ml-auto opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            View Category <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <CategoryCard 
                            key={category._id} 
                            category={category} 
                            index={originalIndex} 
                        />
                    );
                })}
            </div>
        </>
    );
}
