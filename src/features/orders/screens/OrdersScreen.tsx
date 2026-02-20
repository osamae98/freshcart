"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import OrderCard from "../components/OrderCard";
import { Order } from "../types/Orders.types";
import Link from "next/link";

const mockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "FC9584",
        status: "Delivered",
        date: "June 15, 2023",
        totalAmount: 32.97,
        deliveredTo: "Home Address",
        items: [
            { id: "p1", name: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&auto=format&fit=crop", quantity: 2, price: 5 },
            { id: "p2", name: "Milk", image: "https://images.unsplash.com/photo-1563636619-e910ef49e99b?w=200&auto=format&fit=crop", quantity: 1, price: 3 },
            { id: "p3", name: "Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop", quantity: 1, price: 4 },
        ]
    },
    {
        id: "2",
        orderNumber: "FC9473",
        status: "Processing",
        date: "June 10, 2023",
        totalAmount: 18.96,
        deliveredTo: "Office Address",
        items: [
            { id: "p4", name: "Salmon", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&auto=format&fit=crop", quantity: 1, price: 12 },
            { id: "p5", name: "Avocado", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&auto=format&fit=crop", quantity: 3, price: 2 },
        ]
    },
    {
        id: "3",
        orderNumber: "FC9352",
        status: "Delivered",
        date: "May 28, 2023",
        totalAmount: 24.95,
        deliveredTo: "Home Address",
        items: [
            { id: "p6", name: "Strawberries", image: "https://images.unsplash.com/photo-1464965211915-188708c3230a?w=200&auto=format&fit=crop", quantity: 2, price: 4 },
            { id: "p7", name: "Eggs", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop", quantity: 1, price: 6 },
            { id: "p8", name: "Bananas", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&auto=format&fit=crop", quantity: 2, price: 3 },
        ]
    },
    {
        id: "4",
        orderNumber: "FC9241",
        status: "Cancelled",
        date: "May 15, 2023",
        totalAmount: 7.57,
        deliveredTo: "Office Address",
        items: [
            { id: "p9", name: "Broccoli", image: "https://images.unsplash.com/photo-1452948491233-ad8a1ed01085?w=200&auto=format&fit=crop", quantity: 2, price: 2 },
            { id: "p10", name: "Pomegranate", image: "https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?w=200&auto=format&fit=crop", quantity: 1, price: 3 },
        ]
    }
];

export default function OrdersScreen() {
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
                            <select className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer">
                                <option>All Orders</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <FontAwesomeIcon icon={faChevronRight} className="w-2.5 rotate-90" />
                            </div>
                        </div>

                        <div className="relative flex-1 sm:w-64">
                            <input 
                                type="text" 
                                placeholder="Search orders..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                            />
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-3.5"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {mockOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900 font-bold">1-4</span> of <span className="text-gray-900 font-bold">12</span> orders
                    </p>
                    
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50">
                            <FontAwesomeIcon icon={faChevronLeft} className="w-3" />
                        </button>
                        {[1, 2, 3].map((page) => (
                            <button 
                                key={page}
                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                    page === 1 
                                    ? "bg-primary-600 text-white shadow-lg shadow-primary-200" 
                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                            <FontAwesomeIcon icon={faChevronRight} className="w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
