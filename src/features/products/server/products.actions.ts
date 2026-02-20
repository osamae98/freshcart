'use server';

import axios, {AxiosRequestConfig} from 'axios';
import { ProductsResponse, SingleProductResponse } from '../types/Products.types';

export async function getProducts(params?: {
    keyword?: string;
    category?: string;
    brand?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}): Promise<ProductsResponse> {
    try {
        const queryParams = new URLSearchParams();
        if (params?.keyword) queryParams.append('keyword', params.keyword);
        if (params?.category) queryParams.append('category[in]', params.category);
        if (params?.brand) queryParams.append('brand[in]', params.brand);
        if (params?.sort) queryParams.append('sort', params.sort);
        if (params?.minPrice) queryParams.append('price[gte]', params.minPrice.toString());
        if (params?.maxPrice) queryParams.append('price[lte]', params.maxPrice.toString());
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const queryString = queryParams.toString();
        const url = `https://ecommerce.routemisr.com/api/v1/products${queryString ? `?${queryString}` : ''}`;

        const options: AxiosRequestConfig = {
            url,
            method: 'GET',
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}


export async function getProductById({ id }: { id: string }): Promise<SingleProductResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: 'GET',
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}
