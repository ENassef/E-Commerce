import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../../Context/CartContext'
import { WishContext } from "../../Context/WishContext";
import { toast } from "sonner";

export default function Card({ product }) {
    const { addItemToCart } = useContext(CartContext);
    const { addToWishList } = useContext(WishContext);

    async function handleAddToCart(productId) {
        return toast.promise(
            addItemToCart(productId),
            {
                loading: "Adding to cart...",
                success: "Item added to cart successfully",
                error: (error) => error.response?.data?.message || "Failed to add item to cart",
            }
        );
    }

    async function handleAddToWishList(productId) {
        return toast.promise(
            addToWishList(productId),
            {
                loading: "Adding to wishlist...",
                success: "Item added to wishlist successfully",
                error: (error) => error.response?.data?.message || "Failed to add item to wishlist",
            }
        );
    }

    return (
        <>
            <article
                data-aos="fade-up"
                data-aos-duration="1000"
                className="productCard group flex flex-col gap-3 shadow-md rounded-md overflow-hidden"
            >
                <header className="relative selection:bg-white/0">
                    <img
                        src={product.imageCover}
                        className="w-full selection:bg-white/0"
                        alt={product.title}
                    />

                    <div className="layer -translate-y-1/2 flex justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2">
                        <div
                            onClick={() => handleAddToWishList(product.id)}
                            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-darkPrimary duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        </div>

                        <div
                            onClick={() => handleAddToCart(product.id)}
                            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-darkPrimary duration-700 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                        </div>

                        <Link
                            to={`/ProductDetails/${product._id}`}
                            className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-darkPrimary duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </Link>
                    </div>
                </header>
                <footer className="py-6 px-5">
                    <header>
                        <h2 className="line-clamp-1 text-primary">
                            <Link
                                className="hover:text-orange-500 duration-300"
                                to={`/product/`}
                            >
                                {product.title.split(" ").slice(0, 2).join(" ")}
                            </Link>
                        </h2>

                        <h2 className="line-clamp-1 font-semibold my-1">
                            {product.category.name}
                        </h2>
                        <div className="text-gray-500 text-sm">
                            <span>{product.brand.name}</span>
                            <span className="mx-1">|</span>
                            <span className="text-green-500">{product.quantity > 0 ? `${product.quantity} Available` : ''}</span>
                        </div>
                    </header>
                    <footer className="flex justify-between mt-2 items-center">
                        <span className="text-primary flex font-bold text-lg group-hover:text-green-700 items-center italic">
                            {product.price} EGP
                        </span>
                        <div className="rating flex gap-1 items-center">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 group-hover:stroke-rating-color group-hover:fill-rating-color transition-all"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    />
                                </svg>
                            </span>
                            <span className="group-hover:text-maincolor pt-1">{product.ratingsAverage}</span>
                        </div>
                    </footer>
                </footer>
            </article>
        </>
    );
}