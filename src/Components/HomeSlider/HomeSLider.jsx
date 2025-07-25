import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";

export default function HomeSlider({categories}) {


    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Shop by Categories</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {categories?.map((category) => (
                    <SwiperSlide key={category._id}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
