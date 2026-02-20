import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "../features/auth/store/auth.slice";
import { cartReducer, CartState } from "../features/cart/store/cart.slice";
import { wishlistReducer, WishlistState } from "../features/wishlist/store/wishlist.slice";

export type PreloadedState = {
    auth: AuthState;
    cart: CartState;
    wishlist: WishlistState;
}

export function createStore(preloadedState?: PreloadedState){
    const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    },

    preloadedState
    });

    return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;