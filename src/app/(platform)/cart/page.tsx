import CartScreen from "@/features/cart/screens/cart.screen";
import { getProducts } from "@/features/products/server/products.actions";
import { Product } from "@/features/products/types/Products.types";

export default async function CartPage() {
  let relatedProducts: Product[] = [];
  try {
    const allProductsResponse = await getProducts();
    relatedProducts = allProductsResponse.data.slice(0, 4);
  } catch {
    // API temporarily unavailable
  }

  return (
    <CartScreen relatedProducts={relatedProducts} />
  );
}