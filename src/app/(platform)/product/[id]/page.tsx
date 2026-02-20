import ProductDetailsScreen from "@/features/products/screens/product-details.screen";

type ProductDetailPageProps = {
  params: Promise<{id: string}>
}

export default async function ProductDetailPage({params}: ProductDetailPageProps) {
  const { id } = await params;
  
  return <>
  <ProductDetailsScreen productId={id} />
  </>
}