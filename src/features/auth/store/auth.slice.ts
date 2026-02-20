import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id?:string,
    name: string,
    email: string,
    role: string,
};

export type AuthState = {
    isAuthenticated: boolean;
    userInfo: User | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    userInfo: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthInfo: function (state, action: PayloadAction<AuthState>) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userInfo = action.payload.userInfo;
        },
    },
});

export const authReducer = authSlice.reducer;
export const { setAuthInfo } = authSlice.actions;