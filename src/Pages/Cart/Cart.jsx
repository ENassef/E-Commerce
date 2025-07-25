import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { ShoppingBag } from "lucide-react";
import Loading from "../../Components/Loading/Loading";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
    const { userCart, updateCartItem, isLoading, removeCartItem, clearCart } =
        useContext(CartContext);
    const { userToken } = useContext(AuthContext);

    let navigate = useNavigate();

    let cartID = userCart?.cartId;
    const [pay, setPay] = useState("cash");

    // Validation schema for Formik
    const validationSchema = Yup.object({
        details: Yup.string().required("Details are required"),
        phone: Yup.string()
            .matches(
                /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
                "Phone must be a valid Egyptian phone number"
            )
            .required("Phone number is required"),
        city: Yup.string().required("City is required"),
    });

    const handlePayment = (paymentMethod) => {
        setPay(paymentMethod);
        formik.submitForm();
    };

    async function cashPayment(values) {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
                values,
                { headers: { token: userToken } }
            );
            navigate("/allorders");
            return data;
        } catch (error) {
            console.error("Payment error:", error);
            throw error;
        }
    }

    async function onlinePayment(values) {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173/`,
                values,
                { headers: { token: userToken } }
            );
            window.location.href = data.session.url;
            return data;
        } catch (error) {
            console.error("Payment error:", error);
            throw error;
        }
    }

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            const paymentPromise =
                pay === "cash" ? cashPayment(values) : onlinePayment(values);

            toast.promise(
                paymentPromise.finally(() => setSubmitting(false)),
                {
                    loading: "Processing your payment...",
                    success: () => {
                        return pay === "cash"
                            ? "Order placed successfully!"
                            : "Redirecting to payment...";
                    },
                    error: (error) => {
                        const message =
                            error.response?.data?.message || "Payment failed";
                        return message;
                    },
                }
            );
        },
    });

    async function updateQuantity(itemID, count, availableQuantity) {
        if (count < 1 || count > availableQuantity) {
            toast.error(`Quantity must be between 1 and ${availableQuantity}`);
            return;
        }

        try {
            toast.loading("Updating cart...");
            await updateCartItem(itemID, count);
            toast.success("Cart updated successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update quantity"
            );
        }
    }

    async function removeItem(itemID) {
        try {
            toast.loading("Removing item...");
            await removeCartItem(itemID);
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to remove item"
            );
        }
    }

    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>Cart</title>
                </Helmet>
                <Loading />
            </>
        );
    }

    if (!userCart || !userCart.data?.products?.length) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <h1 className="text-4xl text-maincolor font-bold flex items-center mb-4">
                    <ShoppingBag className="size-10 mr-2" /> My Cart
                </h1>
                <p className="text-gray-500">Your cart is empty</p>
                <Helmet>
                    <title>Cart</title>
                </Helmet>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl text-maincolor font-bold flex justify-center items-center mb-8">
                <ShoppingBag className="size-10 mr-2" /> My Cart (
                {userCart?.numOfCartItems} items)
            </h1>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {userCart?.data.products.map((product) => (
                            <div
                                className="flex items-center p-4 border-b border-gray-200"
                                key={product._id}
                            >
                                <div className="w-1/4 mr-2">
                                    <img
                                        src={
                                            product.product.imageCover ||
                                            "fallback-image-url"
                                        }
                                        alt={product.product.title}
                                        className="w-full object-contain"
                                    />
                                </div>

                                <div className="w-3/4 pl-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">
                                                {product.product.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm">
                                                {product?.product.brand?.name ||
                                                    "No Brand"}
                                            </p>
                                            <p className="text-sm text-green-500">
                                                {product.product.quantity > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </p>
                                            <p className="text-maincolor text-sm font-bold">
                                                Price: {product.price} EGP
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeItem(product.product.id)
                                            }
                                            className="text-red-400 cursor-pointer text-2xl font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center border border-gray-300 rounded-full min-w-32 justify-center">
                                            <button
                                                className="px-3 py-1 text-maincolor disabled:opacity-50 cursor-pointer"
                                                onClick={() =>
                                                    updateQuantity(
                                                        product.product.id,
                                                        product.count - 1,
                                                        product.product.quantity
                                                    )
                                                }
                                                disabled={product.count <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-3 cursor-default">
                                                {product.count}
                                            </span>
                                            <button
                                                className="px-3 py-1 text-maincolor cursor-pointer"
                                                onClick={() =>
                                                    updateQuantity(
                                                        product.product.id,
                                                        product.count + 1,
                                                        product.product.quantity
                                                    )
                                                }
                                                disabled={
                                                    product.count >=
                                                    product.product.quantity
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="font-bold min-w-32 text-end">
                                            {product.price * product.count} EGP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>
                                Subtotal ({userCart?.numOfCartItems} items)
                            </span>
                            <span>{userCart?.data.totalCartPrice} EGP</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{userCart?.data.totalCartPrice} EGP</span>
                        </div>
                    </div>

                    {/* Delivery Address Form */}
                    <div className="border-t border-gray-200 pt-4 mt-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Delivery Address
                        </h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="details"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Details
                                    </label>
                                    <input
                                        id="details"
                                        name="details"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.details}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-maincolor focus:border-maincolor"
                                    />
                                    {formik.touched.details &&
                                    formik.errors.details ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.details}
                                        </div>
                                    ) : null}
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-maincolor focus:border-maincolor"
                                    />
                                    {formik.touched.phone &&
                                    formik.errors.phone ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.phone}
                                        </div>
                                    ) : null}
                                </div>

                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-maincolor focus:border-maincolor"
                                    />
                                    {formik.touched.city &&
                                    formik.errors.city ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.city}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="button"
                                        className="w-full bg-maincolor text-white py-3 rounded-lg font-bold hover:bg-maincolor-dark cursor-pointer transition"
                                        onClick={() => handlePayment("cash")}
                                    >
                                        Pay with Cash
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full bg-maincolor text-white py-3 rounded-lg font-bold hover:bg-maincolor-dark cursor-pointer transition"
                                        onClick={() => handlePayment("online")}
                                    >
                                        Pay Online
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <button
                                    type="button"
                                    className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 cursor-pointer transition"
                                    onClick={() => clearCart()}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
