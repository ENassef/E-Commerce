import React, { useEffect, useState } from "react";
import AllProducts from "../../Components/Products/AllProducts";
import { Helmet } from "react-helmet";
import HomeSLider from "../../Components/HomeSlider/HomeSLider";
import home from "../../assets/images/main-home.jpeg";
import home1 from "../../assets/images/home1.jpg";
import home2 from "../../assets/images/home2.jpg";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";




export default function () {
    const [allProducts, setAllProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Function to fetch products from the API with pagination
    function getAllProducts(page = 1) {
        return axios.get(
            `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
        );
    }

    // UseQuery to fetch products based on the current page
    let { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["Products", currentPage],
        queryFn: () => getAllProducts(currentPage),
        staleTime: 60000,
        select: (data) => data.data,
    });

    useEffect(() => {
        async function getAllCategories() {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://ecommerce.routemisr.com/api/v1/categories"
                );
                setCategories(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                throw error;
                setLoading(false);
            }
        }

        getAllCategories();
    }, []);

    return (
        <div className="w-11/12 sm:w-10/12 mx-auto">
            <Helmet>
                <title>E-Commerce</title>
            </Helmet>

            {isLoading || isFetching ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-8 h-[750px]">
                        {/* Main image - full width on mobile, 2 columns on desktop */}
                        <div className="md:col-span-2 h-full md:h-[750px] w-full ">
                            <img
                                src={home}
                                alt="Main banner"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Side images container - full width on mobile, 1 column on desktop */}
                        <div className="grid grid-cols-2 md:grid-cols-1 md:h-[750px] md:grid-rows-2 gap-4 h-full">
                            <div className="w-full h-full ">
                                <img
                                    src={home1}
                                    alt="Secondary banner 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="w-full h-full ">
                                <img
                                    src={home2}
                                    alt="Secondary banner 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <HomeSLider categories={categories} />
                    <AllProducts
                        data={data}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}
