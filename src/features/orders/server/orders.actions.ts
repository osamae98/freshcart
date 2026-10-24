'use server';

import axios, { AxiosRequestConfig } from 'axios';
import { getToken, verifyToken } from '../../auth/server/auth.actions';
import { ApiOrder, Order } from '../types/Orders.types';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/orders';

type ActionResult<T> = { success: true; data: T } | { success: false; message: string };

export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
}

function getErrorMessage(error: unknown, fallback: string) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
        return error.response.data.message as string;
    }
    return fallback;
}

function toOrder(apiOrder: ApiOrder): Order {
    return {
        id: apiOrder._id,
        orderNumber: apiOrder.id.toString(),
        status: apiOrder.isDelivered ? 'Delivered' : 'Processing',
        date: new Date(apiOrder.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        totalAmount: apiOrder.totalOrderPrice,
        deliveredTo: apiOrder.shippingAddress?.city || 'N/A',
        paymentMethod: apiOrder.paymentMethodType === 'card' ? 'Card' : 'Cash on Delivery',
        isPaid: apiOrder.isPaid,
        items: apiOrder.cartItems.map((item) => ({
            id: item._id,
            productId: item.product?._id,
            name: item.product?.title || 'Product',
            image: item.product?.imageCover || '',
            quantity: item.count,
            price: item.price,
        })),
    };
}

export async function getUserOrders(): Promise<ActionResult<Order[]>> {
    const { isAuthenticated, userInfo } = await verifyToken();
    if (!isAuthenticated || !userInfo) return { success: false, message: 'Please login to view your orders' };

    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/user/${userInfo.id}`,
            method: 'GET',
        };

        const { data } = await axios.request<ApiOrder[]>(options);
        const orders = data
            .map(toOrder)
            // Newest first
            .sort((a, b) => Number(b.orderNumber) - Number(a.orderNumber));
        return { success: true, data: orders };
    } catch (error) {
        return { success: false, message: getErrorMessage(error, 'Failed to load your orders') };
    }
}

export async function createCashOrder({ cartId, shippingAddress }: { cartId: string; shippingAddress: ShippingAddress }): Promise<ActionResult<{ status: string }>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login to place an order' };

    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/${cartId}`,
            method: 'POST',
            headers: { token },
            data: { shippingAddress },
        };

        const { data } = await axios.request(options);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: getErrorMessage(error, 'Failed to place your order') };
    }
}

export async function createCheckoutSession({ cartId, shippingAddress, returnUrl }: { cartId: string; shippingAddress: ShippingAddress; returnUrl: string }): Promise<ActionResult<{ url: string }>> {
    const token = await getToken();
    if (!token) return { success: false, message: 'Please login to place an order' };

    try {
        // After payment, Stripe redirects to `${returnUrl}/allorders`
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
            method: 'POST',
            headers: { token },
            data: { shippingAddress },
        };

        const { data } = await axios.request(options);
        return { success: true, data: { url: data.session.url } };
    } catch (error) {
        return { success: false, message: getErrorMessage(error, 'Failed to start online payment') };
    }
}
