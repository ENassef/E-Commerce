import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    "https://ecommerce.routemisr.com/api/v1/brands"
                );

                return response;
            } catch (err) {
                console.error("Error fetching brands:", err);
                throw err;
            }
        },
        select: (response) => response.data.data,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn("Brands data is not iterable or empty:", data);
        return (
            <div className="text-center py-8 text-gray-500">
                No brands available
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>Brands</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <h1 className="text-3xl font-bold mb-8 text-center">
                Shop by Brand
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {data.map((brand) => (
                    <Link
                        to={`/brands/${brand._id}`}
                        key={brand._id}
                        className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div className="p-4">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="w-full h-32 object-contain mb-4 group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    e.target.src = "/placeholder-brand.png";
                                }}
                            />
                            <h3 className="font-semibold text-center group-hover:text-maincolor transition-colors">
                                {brand.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
