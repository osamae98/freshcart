'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWishlist, setWishlistLoading, setWishlistError } from "../store/wishlist.slice";
import {
    getLoggedUserWishlist,
    addProductToWishlist as addAction,
    removeProductFromWishlist as removeAction,
} from "../server/wishlist.actions";
import { toast } from "react-toastify";

export function useWishlist() {
    const dispatch = useAppDispatch();
    const { items, count, isLoading, error } = useAppSelector((state) => state.wishlist);

    const fetchWishlist = async () => {
        dispatch(setWishlistLoading(true));
        try {
            const response = await getLoggedUserWishlist();
            dispatch(setWishlist(response.data));
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch wishlist';
            dispatch(setWishlistError(errorMessage));
        } finally {
            dispatch(setWishlistLoading(false));
        }
    };

    const addToWishlist = async (productId: string) => {
        try {
            await addAction({ productId });
            await fetchWishlist();
            toast.success('Added to wishlist');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to add to wishlist';
            toast.error(errorMessage);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        try {
            await removeAction({ productId });
            await fetchWishlist();
            toast.success('Removed from wishlist');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to remove from wishlist';
            toast.error(errorMessage);
        }
    };

    const isInWishlist = (productId: string) => {
        return items.some(item => item._id === productId);
    };

    return {
        items,
        count,
        isLoading,
        error,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
        isInWishlist,
    };
}
