import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../types/Cart.types";

export type CartState = {
    cart: Cart | null;
    numOfCartItems: number;
    isLoading: boolean;
    error: string | null;
};

const initialState: CartState = {
    cart: null,
    numOfCartItems: 0,
    isLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
            state.numOfCartItems = action.payload.products.length;
        },
        clearCart: (state) => {
            state.cart = null;
            state.numOfCartItems = 0;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const { setCart, clearCart, setLoading, setError } = cartSlice.actions;
