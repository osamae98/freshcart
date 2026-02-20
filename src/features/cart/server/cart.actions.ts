'use server';

import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../../auth/server/auth.actions';
import { CartResponse, Cart } from '../types/Cart.types';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/cart';

type ActionResult<T> = { success: true; data: T } | { success: false; message: string };

export async function getLoggedUserCart(): Promise<ActionResult<CartResponse>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login to view your cart' };

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'GET',
            headers: { token },
        };

        const { data } = await axios.request(options);
        return { success: true, data };
    } catch {
        return { success: false, message: 'Failed to fetch cart' };
    }
}

export async function updateProductQuantity({ productId, count }: { productId: string; count: number }): Promise<ActionResult<CartResponse>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login first' };

    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/${productId}`,
            method: 'PUT',
            headers: { token },
            data: { count },
        };

        const { data } = await axios.request(options);
        return { success: true, data };
    } catch {
        return { success: false, message: 'Failed to update quantity' };
    }
}

export async function removeProductFromCart({ productId }: { productId: string }): Promise<ActionResult<CartResponse>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login first' };

    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/${productId}`,
            method: 'DELETE',
            headers: { token },
        };

        const { data } = await axios.request(options);
        return { success: true, data };
    } catch {
        return { success: false, message: 'Failed to remove item from cart' };
    }
}

export async function clearUserCart(): Promise<ActionResult<{ status: string; message: string }>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login first' };

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'DELETE',
            headers: { token },
        };

        const { data } = await axios.request(options);
        return { success: true, data };
    } catch {
        return { success: false, message: 'Failed to clear cart' };
    }
}

export async function addProductToCart({ productId }: { productId: string }): Promise<ActionResult<CartResponse>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login to add items to cart' };

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'POST',
            headers: { token },
            data: { productId },
        };

        const { data } = await axios.request(options);
        return { success: true, data };
    } catch {
        return { success: false, message: 'Failed to add product to cart' };
    }
}

export async function getInitialCart(): Promise<{ cart: Cart | null, numOfCartItems: number }> {
    const token = await getToken();
    if (!token) {
        return { cart: null, numOfCartItems: 0 };
    }

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'GET',
            headers: { token },
        };
        const { data } = await axios.request(options);
        return {
            cart: data.data,
            numOfCartItems: data.numOfCartItems
        };
    } catch {
        return {
            cart: null,
            numOfCartItems: 0
        };
    }
}
