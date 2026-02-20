import BrandsScreen from "@/features/brands/screens/BrandsScreen";

export default async function BrandsPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort?: string }> }) {
  const resolvedSearchParams = await searchParams;
  return (
    <BrandsScreen searchParams={resolvedSearchParams} />
  );
}
