'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCart, setLoading, setError } from "../store/cart.slice";
import { 
    getLoggedUserCart, 
    updateProductQuantity as updateQtyAction, 
    removeProductFromCart as removeAction,
    clearUserCart as clearAction,
    addProductToCart as addAction
} from "../server/cart.actions";
import { toast } from "react-toastify";

export function useCart() {
    const dispatch = useAppDispatch();
    const { cart, numOfCartItems, isLoading, error } = useAppSelector((state) => state.cart);

    const fetchCart = async () => {
        dispatch(setLoading(true));
        const result = await getLoggedUserCart();
        if (result.success) {
            dispatch(setCart(result.data.data));
        } else {
            dispatch(setError(result.message));
        }
        dispatch(setLoading(false));
    };

    const addToCart = async (productId: string) => {
        const result = await addAction({ productId });
        if (result.success) {
            await fetchCart();
            toast.success('Product added to cart');
        } else {
            toast.error(result.message);
        }
    };

    const updateQuantity = async (productId: string, count: number) => {
        const result = await updateQtyAction({ productId, count });
        if (result.success) {
            await fetchCart();
            toast.success('Quantity updated');
        } else {
            toast.error(result.message);
        }
    };

    const removeFromCart = async (productId: string) => {
        const result = await removeAction({ productId });
        if (result.success) {
            await fetchCart();
            toast.success('Item removed from cart');
        } else {
            toast.error(result.message);
        }
    };

    const clearCart = async () => {
        const result = await clearAction();
        if (result.success) {
            await fetchCart();
            toast.success('Cart cleared');
        } else {
            toast.error(result.message);
        }
    };

    return {
        cart,
        numOfCartItems,
        isLoading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart
    };
}
