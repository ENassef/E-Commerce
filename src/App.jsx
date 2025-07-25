import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Pages/Register/Register";
import Error from "./Pages/Error/Error";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import Login from "./Pages/Login/Login";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/Protected/ProtectedRoute";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import CartContextProvider from "./Context/CartContext";
import Cart from "./Pages/Cart/Cart";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishList from "./Pages/WishList/WishList";
import WishContextProvider from "./Context/WishContext";
import Categories from "./Pages/Categories/Categories";
import CategoriesProducts from "./Pages/CategoriesProducts/CategoriesProducts";
import Brands from "./Pages/Brands/Brands";
import BrandProducts from "./Pages/BrandsProducts/BrandsProducts";
import Products from "./Pages/Products/Products";
import ProductProvider from "./Context/ProductContext";
import AllOrders from "./Pages/AllOrders/AllOdrers";
import { Analytics } from "@vercel/analytics/next"

let query = new QueryClient();

function App() {
    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "cart",
                    element: (
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "products",
                    element: (
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "ProductDetails/:id",
                    element: (
                        <ProtectedRoute>
                            <ProductDetails />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "categories",
                    element: (
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "categories/:id",
                    element: (
                        <ProtectedRoute>
                            <CategoriesProducts />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "brands",
                    element: (
                        <ProtectedRoute>
                            <Brands />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "brands/:id",
                    element: (
                        <ProtectedRoute>
                            <BrandProducts />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "register",
                    element: (
                        <ProtectedRoute>
                            <Register />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "login",
                    element: (
                        <ProtectedRoute>
                            <Login />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "resetPassword",
                    element: (
                        <ProtectedRoute>
                            <ForgetPassword />
                        </ProtectedRoute>
                    ),
                },
                { path: "*", element: <Error /> },
                {
                    path: "myWishList",
                    element: (
                        <ProtectedRoute>
                            <WishList />
                        </ProtectedRoute>
                    ),
                },
                { path: 'allorders', element: <AllOrders /> }
            ],
        },
    ]);

    return (
        <>
            <QueryClientProvider client={query}>
                <AuthContextProvider>
                    <CartContextProvider>
                        <WishContextProvider>
                            <ProductProvider>
                                <RouterProvider router={router} />
                                <ReactQueryDevtools />
                                <Analytics/>
                            </ProductProvider>
                        </WishContextProvider>
                    </CartContextProvider>
                </AuthContextProvider>
            </QueryClientProvider>

            <Toaster
                position="top-center"
                closeButton={true}
                richColors={true}
            />
        </>
    );
}

export default App;
