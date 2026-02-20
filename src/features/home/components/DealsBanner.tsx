'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";


export default function DealsBanner() {
    return (
        <section className="py-10">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                    {/*Deals of the day*/}
                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 p-6">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-x-12 translate-y-12 blur-3xl"> </div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-x-5 translate-y-5 blur-3xl"> </div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium text-white">
                                <FontAwesomeIcon icon={faClock} className="text-xs" />
                                <span>Deal of the Day</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                Fresh Organic Fruits
                            </h3>
                            <p className="text-white/80 mb-4">
                                Get up to 40% off on selected organic fruits
                                </p>

                            {/* Countdown Timer Placeholder */}
                            <div className="flex gap-3 m-6">
                                {[
                                    {value: "12", label: "Hours"},
                                    {value: "45", label: "Mins"},
                                    {value: "30", label: "Secs"},
                                ].map((item, index) => (
                                    <div
                                       key={index}
                                       className= "bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                                        <div className="text-xl font-bold">{item.value}</div>
                                        <div className="text-xs text-white/70">{item.label}</div>
                                    </div>
                                ))}
                            </div>

                            <Link 
                                href="/deals"
                                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-2 rounded-lg">
                                    Shop Now
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                        </div>
                    </div>

                    {/* New Arrivals */}
                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 p-6">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-x-12 translate-y-12 blur-3xl"> </div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-x-5 translate-y-5 blur-3xl"> </div>
                        
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium text-white">
                                <FontAwesomeIcon icon={faClock} className="text-xs" />
                                <span>New Arrivals</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                Exotic Vegetables
                            </h3>
                            <p className="text-white/80 mb-4">
                                Discover our latest collection of premium vegetables
                                </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-3xl font-bold">25% OFF</div>
                                <div className="text-sm text-white/70">
                                Use code: <span className="font-bold text-white">FRESH25</span></div>
                            </div>

                            <Link 
                                href="/products?sort=newest"
                                className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-2 rounded-lg">
                                    Explore Now
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}