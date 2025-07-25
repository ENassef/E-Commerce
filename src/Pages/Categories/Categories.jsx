import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });

    async function getAllCategories() {
        try {
            const response = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/categories"
            );
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="text-center py-8 text-red-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>Categories</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <h1 className="text-3xl font-bold mb-8 text-center">Shop by Category</h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {data?.data?.map((category) => (
                    <Link 
                        to={`/categories/${category._id}`}
                        key={category._id}
                        className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div className="p-4">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-32 object-contain mb-4 group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    e.target.src = "/placeholder-category.png";
                                }}
                            />
                            <h3 className="font-semibold text-center group-hover:text-maincolor transition-colors">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}