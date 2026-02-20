'use server';

import axios, {AxiosRequestConfig} from "axios";
import { BrandsResponse } from "../types/Brands.types";

export async function getAllBrands(page: number = 1, limit: number = 12): Promise<BrandsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/brands?page=${page}&limit=${limit}`,
            method: "GET",
        };
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}
