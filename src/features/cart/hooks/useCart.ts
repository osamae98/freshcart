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
        try {
            const response = await getLoggedUserCart();
            dispatch(setCart(response.data));
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch cart';
            dispatch(setError(errorMessage));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const addToCart = async (productId: string) => {
        try {
            await addAction({ productId });
            await fetchCart();
            toast.success('Product added to cart');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to add product to cart';
            toast.error(errorMessage);
        }
    };

    const updateQuantity = async (productId: string, count: number) => {
        try {
            await updateQtyAction({ productId, count });
            await fetchCart();
            toast.success('Quantity updated');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update quantity';
            toast.error(errorMessage);
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            await removeAction({ productId });
            await fetchCart();
            toast.success('Item removed from cart');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to remove item';
            toast.error(errorMessage);
        }
    };

    const clearCart = async () => {
        try {
            await clearAction();
            fetchCart();
            toast.success('Cart cleared');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to clear cart';
            toast.error(errorMessage);
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
