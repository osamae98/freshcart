import { Product } from "../../products/types/Products.types";

export type WishlistProduct = Product;

export interface WishlistResponse {
    status: string;
    count: number;
    data: WishlistProduct[];
}

export interface WishlistToggleResponse {
    status: string;
    message: string;
    data: string[]; // array of product IDs
}
