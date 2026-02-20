import SearchResultsScreen from "@/features/products/screens/search-results.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | FreshCart",
  description: "Browse and search for your favorite products on FreshCart.",
};

interface SearchPageProps {
  searchParams: Promise<{
    keyword?: string;
    category?: string;
    brand?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    view?: string;
    rating?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams;
    return <SearchResultsScreen searchParams={resolvedSearchParams} />;
}
