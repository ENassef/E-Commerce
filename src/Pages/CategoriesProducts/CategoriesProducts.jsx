import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import { Helmet } from "react-helmet";

export default function CategoryProducts() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["category", id],
        queryFn: getCategoryDetails,
    });

    async function getCategoryDetails() {
        try {
            // First get category details
            const categoryResponse = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories/${id}`
            );

            // Then get products for this category
            const productsResponse = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
            );

            return {
                category: categoryResponse.data.data,
                products: productsResponse.data.data,
            };
        } catch (error) {
            throw new Error(
                error.response?.data?.message ||
                    "Failed to fetch category details"
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
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-maincolor text-white rounded-md"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>CategoriesProducts</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            {/* Category Header */}
            <div className="text-center mb-12 bg-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-4 capitalize">
                    {data?.category?.name}
                </h1>
            </div>

            {/* Products Section */}
            <div className="mb-8">
                {data?.products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.products.map((product) => (
                            <Card
                                key={product._id}
                                product={{
                                    ...product,
                                    id: product._id, // Ensure compatibility with your Card component
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">
                            No products found in this category
                        </p>
                        <Link
                            to="/categories"
                            className="mt-4 inline-block px-6 py-2 bg-maincolor text-white rounded-md hover:bg-maincolor-dark transition"
                        >
                            Browse Other Categories
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
