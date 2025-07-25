import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [userCart, setUserCart] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userOrders, setUserOrders] = useState(null);
    const { userToken , userID} = useContext(AuthContext);

    async function getCartDetails() {
        if (!userToken) return;

        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/cart`, {
                headers: { token: userToken },
            });
            setUserCart(response.data);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    async function updateCartItem(productId, count) {
        try {
            const response = await axios.put(
                `${API_URL}/cart/${productId}`,
                { count },
                { headers: { token: userToken } }
            );
            setUserCart(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async function addItemToCart(productId) {
        try {
            const response = await axios.post(
                `${API_URL}/cart`,
                { productId },
                { headers: { token: userToken } }
            );
            console.log("addItemToCart response:", response.data);
            await getCartDetails(); // Re-fetch cart to ensure latest state
            console.log("addItemToCart message:", response.data.message);
            return response.data;
        } catch (error) {
            console.error("Error adding item to cart:", error.response?.data);
            throw error;
        }
    }

    async function removeCartItem(productId) {
        try {
            const response = await axios.delete(
                `${API_URL}/cart/${productId}`,
                { headers: { token: userToken } }
            );
            setUserCart(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async function clearCart() {
        try {
            const response = await axios.delete(`${API_URL}/cart`, {
                headers: { token: userToken },
            });
            console.log("Clear Item response:", response); // Debug
            await getCartDetails(); // Re-fetch cart to ensure latest state
        } catch (error) {
            console.error("Error adding item to cart:", error.response?.data);
            throw error;
        }
    }

        async function getUserOrders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`,
                method: "GET",
            };
            const { data } = await axios.request(options);
            setUserOrders(data);
        } catch (error) {}
    }

    useEffect(() => {
        if (userToken) {
            getCartDetails();
        }
    }, [userToken]);

    return (
        <CartContext.Provider
            value={{
                userCart,
                setUserCart,
                updateCartItem,
                addItemToCart,
                isLoading,
                removeCartItem,
                clearCart,
                getUserOrders,
                userOrders,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
