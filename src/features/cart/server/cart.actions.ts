'use server';

import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../../auth/server/auth.actions';
import { CartResponse, Cart } from '../types/Cart.types';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/cart';

export async function getLoggedUserCart(): Promise<CartResponse> {
    const token = await getToken();
    if (!token) throw new Error('Unauthorized');

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'GET',
            headers: { token },
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}

export async function updateProductQuantity({ productId, count }: { productId: string; count: number }): Promise<CartResponse> {
    const token = await getToken();
    if (!token) throw new Error('Unauthorized');

    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/${productId}`,
            method: 'PUT',
            headers: { token },
            data: { count },
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
}

export async function removeProductFromCart({ productId }: { productId: string }): Promise<CartResponse> {
    const token = await getToken();
    if (!token) throw new Error('Unauthorized');

    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/${productId}`,
            method: 'DELETE',
            headers: { token },
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error;
    }
}

export async function clearUserCart(): Promise<{ status: string; message: string }> {
    const token = await getToken();
    if (!token) throw new Error('Unauthorized');

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'DELETE',
            headers: { token },
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
}

export async function addProductToCart({ productId }: { productId: string }): Promise<CartResponse> {
    const token = await getToken();
    if (!token) throw new Error('Unauthorized');

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'POST',
            headers: { token },
            data: { productId },
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
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
