import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";

export const WishContext = createContext();

export default function WishContextProvider({ children }) {
    const { userToken } = useContext(AuthContext);

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["wishlist", userToken], // Include userToken in queryKey
        queryFn: getWishList,
        select: (data) => data.data,
        enabled: !!userToken,
        retry: 2, // Retry failed requests up to 2 times
    });

    async function getWishList() {
        try {
            const response = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { headers: { token: userToken } }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to fetch wishlist:", error); // Log full error for debugging
            throw new Error(
                error.response?.data?.message || "Failed to fetch wishlist"
            );
        }
    }

    async function addToWishList(productId) {
        try {
            await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId },
                { headers: { token: userToken } }
            );
            refetch();
        } catch (error) {
            throw error
        }
    }

    async function removeFromWishList(productId) {
        try {
            await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers: { token: userToken } }
            );
            refetch();
        } catch (error) {
            throw error
        }
    }

    return (
        <WishContext.Provider
            value={{
                wishList: data || [], // Use data directly
                isLoading,
                isError,
                error,
                addToWishList,
                removeFromWishList,
                isWishlistEmpty: data?.length,
            }}
        >
            {children}
        </WishContext.Provider>
    );
}