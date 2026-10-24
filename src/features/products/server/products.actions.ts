'use server';

import axios, {AxiosRequestConfig} from 'axios';
import { Product, ProductsResponse, SingleProductResponse } from '../types/Products.types';

const PRODUCTS_URL = 'https://ecommerce.routemisr.com/api/v1/products';
// The API caps page size at 50
const MAX_API_LIMIT = 50;

async function fetchProductsPage(queryParams: URLSearchParams): Promise<ProductsResponse> {
    const queryString = queryParams.toString();
    const options: AxiosRequestConfig = {
        url: `${PRODUCTS_URL}${queryString ? `?${queryString}` : ''}`,
        method: 'GET',
    };

    const { data } = await axios.request(options);
    return data;
}

function matchesKeyword(product: Product, keyword: string) {
    const fields = [product.title, product.description, product.category?.name, product.brand?.name];
    return fields.some((field) => field?.toLowerCase().includes(keyword));
}

export async function getProducts(params?: {
    keyword?: string;
    category?: string;
    brand?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    page?: number;
    limit?: number;
}): Promise<ProductsResponse> {
    try {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append('category[in]', params.category);
        if (params?.brand) queryParams.append('brand[in]', params.brand);
        if (params?.sort) queryParams.append('sort', params.sort);
        if (params?.minPrice) queryParams.append('price[gte]', params.minPrice.toString());
        if (params?.maxPrice) queryParams.append('price[lte]', params.maxPrice.toString());
        if (params?.rating) queryParams.append('ratingsAverage[gte]', params.rating.toString());

        const keyword = params?.keyword?.trim().toLowerCase();

        if (!keyword) {
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            return await fetchProductsPage(queryParams);
        }

        // The API ignores `keyword`, so fetch every product matching the other filters and search locally
        queryParams.set('limit', MAX_API_LIMIT.toString());
        queryParams.set('page', '1');
        const firstPage = await fetchProductsPage(queryParams);
        const totalApiPages = firstPage.metadata?.numberOfPages || 1;

        const remainingPages = await Promise.all(
            Array.from({ length: totalApiPages - 1 }, (_, i) => {
                const pageParams = new URLSearchParams(queryParams);
                pageParams.set('page', (i + 2).toString());
                return fetchProductsPage(pageParams);
            })
        );

        const matches = [firstPage, ...remainingPages]
            .flatMap((page) => page.data)
            .filter((product) => matchesKeyword(product, keyword));

        const limit = params?.limit || MAX_API_LIMIT;
        const numberOfPages = Math.ceil(matches.length / limit);
        const currentPage = Math.min(Math.max(params?.page || 1, 1), Math.max(numberOfPages, 1));

        return {
            results: matches.length,
            metadata: {
                currentPage,
                numberOfPages,
                limit,
                ...(currentPage < numberOfPages && { nextPage: currentPage + 1 }),
            },
            data: matches.slice((currentPage - 1) * limit, currentPage * limit),
        };
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
