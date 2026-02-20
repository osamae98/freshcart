"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import sliderImg_1 from "../../../assets/images/home-slider-1.png";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const slides = [
    {
        title: "Fresh Products Delivered to your Door",
        subtitle: "Get 20% off your first order",
    },
    {
        title: "Fresh & Organic Groceries",
        subtitle: "Shop the freshest produce today",
    },
    {
        title: "Save Big on Weekly Deals",
        subtitle: "Up to 50% off on selected items",
    },
];

export default function Slider() {
    return (
        <section className="relative z-0 overflow-hidden">
            <Swiper
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${sliderImg_1.src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            className="relative min-h-[350px] md:min-h-[420px] flex items-center"
                        >
                            {/* Left-to-right green gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600/95 via-green-500/60 to-transparent"></div>
                            
                            {/* Bottom white fade */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>

                            {/* Content */}
                            <div className="relative z-10 container px-8 md:px-16">
                                <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 max-w-md leading-tight">
                                    {slide.title}
                                </h2>
                                <p className="text-white/90 text-lg mb-6">{slide.subtitle}</p>

                                <div className="flex gap-3">
                                    <Link
                                        href="/featured"
                                        className="px-6 py-2.5 rounded-lg bg-white text-green-600 font-semibold hover:bg-green-50 transition-colors"
                                    >
                                        Shop Now
                                    </Link>
                                    <Link
                                        href="/deals"
                                        className="px-6 py-2.5 rounded-lg bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
                                    >
                                        View Deals
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-105">
                <FontAwesomeIcon icon={faChevronLeft} className="text-primary-600 text-sm" />
            </div>

            <div className="custom-next absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-105">
                <FontAwesomeIcon icon={faChevronRight} className="text-primary-600 text-sm" />
            </div>
        </section>
    );
}
