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
        const result = await getLoggedUserWishlist();
        if (result.success) {
            dispatch(setWishlist(result.data.data));
        } else {
            dispatch(setWishlistError(result.message));
        }
        dispatch(setWishlistLoading(false));
    };

    const addToWishlist = async (productId: string) => {
        const result = await addAction({ productId });
        if (result.success) {
            await fetchWishlist();
            toast.success('Added to wishlist');
        } else {
            toast.error(result.message);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        const result = await removeAction({ productId });
        if (result.success) {
            await fetchWishlist();
            toast.success('Removed from wishlist');
        } else {
            toast.error(result.message);
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
