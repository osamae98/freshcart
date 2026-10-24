"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronRight, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import OrderCard from "../components/OrderCard";
import { Order, OrderStatus } from "../types/Orders.types";
import Link from "next/link";
import { useMemo, useState } from "react";

interface OrdersScreenProps {
    orders: Order[];
    error?: string | null;
}

export default function OrdersScreen({ orders, error }: OrdersScreenProps) {
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
    const [search, setSearch] = useState("");

    const filteredOrders = useMemo(() => {
        const query = search.trim().toLowerCase();
        return orders.filter((order) => {
            if (statusFilter !== "All" && order.status !== statusFilter) return false;
            if (!query) return true;
            return (
                order.orderNumber.includes(query) ||
                order.items.some((item) => item.name.toLowerCase().includes(query))
            );
        });
    }, [orders, statusFilter, search]);

    return (
        <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
                <span className="text-gray-300">
                    <FontAwesomeIcon icon={faChevronRight} className="w-2" />
                </span>
                <Link href="/profile" className="hover:text-primary-600 transition-colors">My Account</Link>
                <span className="text-gray-300">
                    <FontAwesomeIcon icon={faChevronRight} className="w-2" />
                </span>
                <span className="text-primary-600 font-semibold tracking-tight">Orders</span>
            </nav>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "All")}
                                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
                            >
                                <option value="All">All Orders</option>
                                <option value="Processing">Processing</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <FontAwesomeIcon icon={faChevronRight} className="w-2.5 rotate-90" />
                            </div>
                        </div>

                        <div className="relative flex-1 sm:w-64">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by order # or product..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-3.5"
                            />
                        </div>
                    </div>
                </div>

                {error ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 mb-6">{error}</p>
                        <Link href="/login" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                            Sign In
                        </Link>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">When you place an order, it will show up here.</p>
                        <Link href="/" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                            {filteredOrders.length === 0 && (
                                <p className="text-center text-gray-500 py-10">No orders match your filters.</p>
                            )}
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <p className="text-sm text-gray-500 font-medium">
                                Showing <span className="text-gray-900 font-bold">{filteredOrders.length}</span> of <span className="text-gray-900 font-bold">{orders.length}</span> orders
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
