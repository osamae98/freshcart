"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBillWave, faSync } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { Order } from "../types/Orders.types";

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-700';
            case 'Processing':
                return 'bg-blue-100 text-blue-700';
            case 'Cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const firstProductId = order.items.find((item) => item.productId)?.productId;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 transition-shadow hover:shadow-md">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">Order #{order.orderNumber}</h3>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                {order.paymentMethod && (
                    <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-2 text-gray-600 font-semibold">
                            <FontAwesomeIcon icon={order.paymentMethod === 'Card' ? faCreditCard : faMoneyBillWave} className="w-4" />
                            {order.paymentMethod}
                        </span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {order.isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2">
                    <div className="flex items-center -space-x-3 overflow-hidden">
                        {order.items.slice(0, 3).map((item, index) => (
                            <div
                                key={item.id}
                                className="relative w-16 h-16 rounded-xl border-2 border-white bg-gray-50 overflow-hidden shadow-sm"
                                style={{ zIndex: 10 - index }}
                                title={item.name}
                            >
                                {item.image && (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="64px"
                                        className="object-contain"
                                    />
                                )}
                                <div className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg">
                                    {item.quantity}
                                </div>
                            </div>
                        ))}
                        {order.items.length > 3 && (
                            <div className="w-16 h-16 rounded-xl border-2 border-white bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-bold shadow-sm z-0">
                                +{order.items.length - 3}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Items</p>
                    <p className="text-sm font-bold text-gray-900">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Amount</p>
                    <p className="text-sm font-bold text-gray-900">{order.totalAmount.toFixed(2)} EGP</p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        {order.status === 'Cancelled' ? 'Cancelled on' : 'Delivered to'}
                    </p>
                    <p className="text-sm font-bold text-gray-900 truncate">{order.deliveredTo}</p>
                </div>

                {firstProductId && (
                    <div className="md:col-span-4 lg:col-span-1 flex lg:flex-col gap-3">
                        <Link
                            href={`/product/${firstProductId}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faSync} className="w-3" />
                            Buy Again
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
