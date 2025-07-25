import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import { Helmet } from "react-helmet";

export default function BrandDetails() {
    const { id } = useParams();

    async function getBrandDetails() {
        try {
            // First get brand details
            const brandResponse = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/brands/${id}`
            );

            // Then get products for this brand
            const productsResponse = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
            );

            return {
                brand: brandResponse.data.data,
                products: productsResponse.data.data,
            };
        } catch (error) {
            console.error("Error fetching brand details or products:", error);
            throw new Error(
                error.response?.data?.message || "Failed to fetch brand details"
            );
        }
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["brand", id],
        queryFn: async () => {
            try {
                return await getBrandDetails();
            } catch (err) {
                console.error("Error in queryFn:", err);
                throw err;
            }
        },
    });

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

    if (!data || !data.brand || !Array.isArray(data.products)) {
        console.warn("Brand data or products not valid:", data);
        return (
            <div className="text-center py-8 text-gray-500">
                Brand or products not found
                <Link
                    to="/brands"
                    className="mt-4 inline-block px-6 py-2 bg-maincolor text-white rounded-md hover:bg-maincolor-dark transition"
                >
                    Browse Other Brands
                </Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Brands Products</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                {/* Brand Header */}
                <div className="text-center mb-12 bg-white p-6 rounded-lg">
                    <h1 className="text-3xl font-bold mb-4 capitalize">
                        {data.brand.name}
                    </h1>
                </div>

                {/* Products Section */}
                <div className="mb-8">
                    {data.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {data.products.map((product) => (
                                <Card
                                    key={product._id}
                                    product={{
                                        ...product,
                                        id: product._id,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500 text-lg">
                                No products found for this brand
                            </p>
                            <Link
                                to="/brands"
                                className="mt-4 inline-block px-6 py-2 bg-maincolor text-white rounded-md hover:bg-maincolor-dark transition"
                            >
                                Browse Other Brands
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
