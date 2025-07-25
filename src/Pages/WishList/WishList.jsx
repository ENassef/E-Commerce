import { Heart, HeartOff } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { toast } from "sonner";
import { WishContext } from "../../Context/WishContext";
import { Helmet } from "react-helmet";

export default function WishList() {
    const { 
        wishList = [], 
        isLoading, 
        isError, 
        error, 
        removeFromWishList,
        isWishlistEmpty 
    } = useContext(WishContext);

    // Debug the wishlist data structure
    console.log("Current wishlist:", wishList);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="text-center py-8 text-red-500">
                Error: {error.message || "Failed to load wishlist"}
            </div>
        );
    }

    if (isWishlistEmpty <= 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <HeartOff className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                    Your wishlist is empty
                </h2>
                <p className="text-gray-500 mb-6">
                    Start adding items to see them here
                </p>
                <Link
                    to="/products"
                    className="px-6 py-2 bg-maincolor text-white rounded-md hover:bg-maincolor-dark transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
                        <Helmet>
                <title>Wish List</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <div className="text-center mb-12">
                <h1 className="flex items-center justify-center text-3xl font-bold gap-x-3 text-mainbg-maincolor">
                    <Heart className="w-8 h-8" />
                    <span>My Wishlist</span>
                </h1>
                <p className="text-gray-500 mt-2">
                    {wishList.length} {wishList.length === 1 ? "item" : "items"} in your wishlist
                </p>
            </div>

            <div className="space-y-4">
                {wishList.map((product) => (
                    <div
                        key={product._id}
                        className="flex flex-col md:flex-row items-center p-4 border-b border-gray-200 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg"
                    >
                        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
                            <img
                                src={product.imageCover}
                                alt={product.title}
                                className="w-full h-32 object-contain rounded-md"
                                onError={(e) => {
                                    e.target.src = '/placeholder-product.png';
                                }}
                            />
                        </div>

                        <div className="w-full md:w-3/4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg line-clamp-2 text-gray-800">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {product.brand?.name || "No Brand"}
                                    </p>
                                    <p className="text-sm text-green-500">
                                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                                    </p>
                                    <p className="text-mainbg-maincolor text-sm font-bold">
                                        Price: {product.price.toLocaleString()} EGP
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromWishList(product._id)}
                                    className="text-red-400 hover:text-red-600 text-2xl font-bold transition-colors rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                    aria-label={`Remove ${product.title} from wishlist`}
                                    title="Remove from wishlist"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <Link
                                    to={`/ProductDetails/${product._id}`}
                                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    View Details
                                </Link>
                                <button 
                                    className="px-4 py-2 text-sm bg-maincolor text-white rounded-md hover:bg-green-500 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toast.success("Added to cart!");
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
