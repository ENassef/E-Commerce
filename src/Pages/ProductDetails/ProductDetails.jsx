import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, EffectCards, EffectFade, Parallax } from "swiper/modules";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Helmet } from "react-helmet";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import { CartContext } from "../../Context/CartContext";
import { WishContext } from "../../Context/WishContext";
import { toast } from "sonner";
import BackButton from "../../Components/BackButton/BackButton";

export default function ProductDetails() {
    let { id } = useParams();
    let [details, setDetails] = useState(null);
    let [related, setRelated] = useState([]);
    let [loading, setLoading] = useState(true);
    let [relatedLoading, setRelatedLoading] = useState(false);
    let [error, setError] = useState(null);
    let [mainImage, setMainImage] = useState("");
    let { addItemToCart } = useContext(CartContext);
    let { addToWishList } = useContext(WishContext); 

    async function getProductDetails() {
        try {
            setLoading(true);
            setError(null);
            let { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products/${id}`
            );
            setDetails(data.data);
            setMainImage(data.data.imageCover);
        } catch (error) {
            console.error("Error fetching product details:", error);
            setError("Failed to load product details. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function getRelatedProducts() {
        if (!details?.category) return;
        
        try {
            setRelatedLoading(true);
            setError(null);
            let { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products?category[in]=${details.category._id}`
            );
            setRelated(data.data.filter(product => product._id !== id));
        } catch (error) {
            console.error("Error fetching related products:", error);
            setError("Failed to load related products");
        } finally {
            setRelatedLoading(false);
        }
    }

    const handleAddToCart = () => {
        if (!details) return;
        
        toast.promise(
            addItemToCart(details._id),
            {
                loading: 'Adding to cart...',
                success: () => `${details.title} added to cart!`,
                error: 'Failed to add to cart'
            }
        );
    };

    const handleAddToWishlist = async () => {
        if (!details) return;

        try {
            toast.promise(
                addToWishList(details._id),
                {
                    loading: 'Adding to wishlist...',
                    success: () => `${details.title} added to wishlist!`,
                    error: 'Failed to add to wishlist'
                }
            );
        } finally {
        }
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
    };

    useEffect(() => {
        getProductDetails();
    }, [id]);

    useEffect(() => {
        if (details) {
            getRelatedProducts();
        }
    }, [details]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">Product not found</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{details.title} | Your Store</title>
                <meta name="description" content={details.description} />
                <meta property="og:title" content={details.title} />
                <meta property="og:description" content={details.description} />
                <meta property="og:image" content={mainImage} />
            </Helmet>

            <div className="container mx-auto px-4 py-8 relative">
                <BackButton className="absolute top-4 left-4 z-10" />

                {/* Product Details */}
                <div className="pt-12 pb-8 w-11/12 max-w-6xl flex flex-col lg:flex-row gap-8 mx-auto transition-all">
                    {/* Product Images Section */}
                    <div className="w-full lg:w-4/12 flex flex-col gap-4">
                        <div className="w-full">
                            <img 
                                src={mainImage} 
                                alt={details.title} 
                                className="w-full rounded-lg object-cover max-h-96" 
                                onError={handleImageError}
                            />
                        </div>
                        <div>
                            {details.images?.length > 0 && (
                                <Swiper
                                    modules={[Autoplay, Parallax, EffectFade, EffectCards]}
                                    spaceBetween={5}
                                    slidesPerView={3}
                                    autoplay={{ delay: 3000 }}
                                    parallax
                                    onSlideChange={(swiper) => setMainImage(details.images[swiper.activeIndex])}
                                    breakpoints={{
                                        320: { slidesPerView: 2 },
                                        640: { slidesPerView: 3 },
                                        1024: { slidesPerView: 3 }
                                    }}
                                >
                                    {details.images.map((img, index) => (
                                        <SwiperSlide 
                                            className="border-4 border-light-color rounded-lg cursor-pointer" 
                                            key={index}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`${details.title} ${index + 1}`} 
                                                className="w-full h-20 object-cover rounded-lg"
                                                onClick={() => setMainImage(img)}
                                                onError={handleImageError}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="w-full lg:w-8/12 space-y-4 flex flex-col">
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                                <div className="space-y-1">
                                    <h2 className="font-bold text-2xl sm:text-3xl text-green-700">{details.title}</h2>
                                    <p className="font-semibold text-sm text-green-400">{details.category?.name}</p>
                                    <div className="space-x-1 font-normal text-sm">
                                        <span>{details.brand?.name}</span>
                                        <span>|</span>
                                        <span className="text-maincolor">
                                            {details.quantity > 0 ? 'Available' : 'Out of Stock'}
                                        </span>
                                    </div>
                                    <div className="flex space-x-1 items-center">
                                        <Star className="fill-rating-color stroke-rating-color inline" size={16} />
                                        <span className="text-maincolor text-lg">{details.ratingsAverage}</span>
                                    </div>
                                </div>
                            </div>
                        
                            <p className="text-sm sm:text-base">{details.description}</p>
                            <p className="text-maincolor font-bold text-lg italic">EGP {details.price}</p>
                        
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={handleAddToWishlist}
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 bg-green-500 text-white hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Heart size={20} />
                                </button>
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={details.quantity <= 0}
                                    className="grow bg-green-500 hover:bg-green-400 transition-all duration-300 cursor-pointer rounded-xl flex justify-center items-center text-white py-2 px-4 uppercase group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart className="group-hover:animate-bounce" />
                                    <span className="ml-2 mt-1">Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-8 w-11/12 max-w-7xl mx-auto">
                        <h2 className="text-maincolor text-3xl italic font-bold">Related Products</h2>
                        {relatedLoading ? (
                            <Loading />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-4 gap-8">
                                {related.map((product) => (
                                    <Card product={product} key={product._id}/>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}