'use server';

import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../../auth/server/auth.actions';
import { WishlistResponse, WishlistToggleResponse, WishlistProduct } from '../types/Wishlist.types';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/wishlist';

type ActionResult<T> = { success: true; data: T } | { success: false; message: string };

export async function getLoggedUserWishlist(): Promise<ActionResult<WishlistResponse>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login to view your wishlist' };

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: 'GET',
            headers: { token },
        };

        const { data } = await axios.request(options);
        return { success: true, data };
    } catch {
        return { success: false, message: 'Failed to fetch wishlist' };
    }
}

export async function addProductToWishlist({ productId }: { productId: string }): Promise<ActionResult<WishlistToggleResponse>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login to add items to wishlist' };

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
        return { success: false, message: 'Failed to add to wishlist' };
    }
}

export async function removeProductFromWishlist({ productId }: { productId: string }): Promise<ActionResult<WishlistToggleResponse>> {
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
        return { success: false, message: 'Failed to remove from wishlist' };
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
