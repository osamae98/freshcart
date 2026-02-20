'use server';

import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../../auth/server/auth.actions';
import { WishlistResponse, WishlistToggleResponse, WishlistProduct } from '../types/Wishlist.types';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/wishlist';

export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
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
        console.error('Error fetching wishlist:', error);
        throw error;
    }
}

export async function addProductToWishlist({ productId }: { productId: string }): Promise<WishlistToggleResponse> {
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
        console.error('Error adding to wishlist:', error);
        throw error;
    }
}

export async function removeProductFromWishlist({ productId }: { productId: string }): Promise<WishlistToggleResponse> {
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
        console.error('Error removing from wishlist:', error);
        throw error;
    }
}

export async function getInitialWishlist(): Promise<{ items: WishlistProduct[], count: number }> {
    const token = await getToken();
    if (!token) {
        return { items: [], count: 0 };
    }

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'GET',
            headers: { token },
        };
        const { data } = await axios.request(options);
        return {
            items: data.data,
            count: data.count,
        };
    } catch {
        return {
            items: [],
            count: 0,
        };
    }
}
