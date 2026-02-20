import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistProduct } from "../types/Wishlist.types";

export type WishlistState = {
    items: WishlistProduct[];
    count: number;
    isLoading: boolean;
    error: string | null;
};

const initialState: WishlistState = {
    items: [],
    count: 0,
    isLoading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: (state, action: PayloadAction<WishlistProduct[]>) => {
            state.items = action.payload;
            state.count = action.payload.length;
        },
        clearWishlist: (state) => {
            state.items = [];
            state.count = 0;
        },
        setWishlistLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setWishlistError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { setWishlist, clearWishlist, setWishlistLoading, setWishlistError } = wishlistSlice.actions;
