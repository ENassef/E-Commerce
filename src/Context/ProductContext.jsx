import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Create context
export const ProductContext = createContext();

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function ProductProvider({ children }) {

  const [allProductData,setAllProductsData] = useState(null)
  // Temporary filter state (immediate UI updates)
  const [tempFilters, setTempFilters] = useState({
    priceSort: "",
    range: 50000,
    categories: {
      woman: "",
      man: "",
      electronics: "",
    },
    brands: {
      canon: "",
      dell: "",
      defacto: "",
      puma: "",
    },
  });

  // Current page
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced filters (used for API queries)
  const filters = useDebounce(tempFilters, 500);

  // Build API query string
  const buildQuery = () => {
    let query = `https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${currentPage}`;
    if (filters.priceSort) query += `&sort=${filters.priceSort === "+" ? "price" : "-price"}`;
    if (filters.range < 50000) query += `&price[lte]=${filters.range}`;
    if (filters.categories.woman) query += `&category[in]=${filters.categories.woman}`;
    if (filters.categories.man) query += `&category[in]=${filters.categories.man}`;
    if (filters.categories.electronics) query += `&category[in]=${filters.categories.electronics}`;
    if (filters.brands.canon) query += `&brand=${filters.brands.canon}`;
    if (filters.brands.dell) query += `&brand=${filters.brands.dell}`;
    if (filters.brands.defacto) query += `&brand=${filters.brands.defacto}`;
    if (filters.brands.puma) query += `&brand=${filters.brands.puma}`;
    return query;
  };

  // Fetch products using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", filters, currentPage],
    queryFn: async () => {
      const response = await axios.get(buildQuery());
      return response.data;
    },
    keepPreviousData: true,
  });

  // Extract products and metadata
  const products = data?.data || [];
  const metadata = data?.metadata || { currentPage: 1, numberOfPages: 0, limit: 20 };


  return (
    <ProductContext.Provider
      value={{
        tempFilters,
        setTempFilters,
        filters,
        currentPage,
        setCurrentPage,
        products,
        metadata,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}