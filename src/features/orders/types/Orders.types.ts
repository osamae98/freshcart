export type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

export interface OrderItem {
    id: string;
    productId?: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    date: string;
    totalAmount: number;
    deliveredTo: string;
    paymentMethod?: string;
    isPaid?: boolean;
    items: OrderItem[];
}

// Order as returned by the Route API
export interface ApiOrder {
    _id: string;
    id: number;
    shippingAddress?: {
        details: string;
        phone: string;
        city: string;
    };
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: 'cash' | 'card';
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    cartItems: {
        _id: string;
        count: number;
        price: number;
        product?: {
            _id: string;
            title: string;
            imageCover: string;
        };
    }[];
}
