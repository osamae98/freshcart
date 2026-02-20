import WishlistScreen from "@/features/wishlist/screens/wishlist.screen";
import { getProducts } from "@/features/products/server/products.actions";
import { Product } from "@/features/products/types/Products.types";

export default async function WishlistPage() {
  let recentlyViewed: Product[] = [];
  try {
    const allProductsResponse = await getProducts({ limit: 5 });
    recentlyViewed = allProductsResponse.data.slice(0, 5);
  } catch {
    // API temporarily unavailable
  }

  return (
    <WishlistScreen recentlyViewed={recentlyViewed} />
  );
}