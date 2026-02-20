export type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

export interface OrderItem {
    id: string;
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
    items: OrderItem[];
}
