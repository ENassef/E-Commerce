import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Card from "../../Components/Card/Card";
import BackButton from "../../Components/BackButton/BackButton";
import { ProductContext } from "../../Context/ProductContext";

const formatMoney = (value) => new Intl.NumberFormat('en-US', { 
  style: 'currency', 
  currency: 'EGP' 
}).format(value);

const noProductFoundImg = "https://via.placeholder.com/300x200?text=No+Products+Found";

export default function Products() {
  const location = useLocation();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const context = useContext(ProductContext);

  if (!context) {
    console.error("ProductContext is undefined");
    return <div>Error: Products must be used within a ProductProvider</div>;
  }

  const {
    tempFilters,
    setTempFilters,
    currentPage,
    setCurrentPage,
    products,
    metadata,
    isLoading,
    isError,
    error,
  } = context;

  const closeFilter = () => {
    if (showFilterModal) setShowFilterModal(false);
  };

  // Debug logs
  console.log("Current products:", products);
  console.log("Current filters:", tempFilters);

  return (
    <div className="container mx-auto px-4 py-8" onClick={closeFilter}>
      <Helmet key={location.pathname}>
        <meta charSet="utf-8" />
        <title>Products</title>
        <meta
          name="description"
          content="Browse our wide selection of products"
        />
      </Helmet>

      {/* Navigation Bar */}
      <nav className="relative bg-white px-4 py-3 rounded-xl flex items-center justify-between mb-6">
        <BackButton />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowFilterModal(!showFilterModal);
          }}
          className="size-8 cursor-pointer"
          aria-label="Filter products"
        >
          <svg
            className="size-full text-maincolor active:scale-90 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </nav>

      {/* Filter Modal */}
      {showFilterModal && (
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            showFilterModal ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 h-full overflow-y-auto">
            <header className="flex items-center justify-between border-b border-maincolor pb-2 mb-4">
              <h2 className="text-xl font-bold text-maincolor">Filters</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="size-8 p-1 hover:bg-maincolor hover:text-white rounded-full transition"
                aria-label="Close filters"
              >
                ×
              </button>
            </header>

            {/* Price Sorting */}
            <section className="mb-6">
              <h3 className="font-semibold text-maincolor mb-2">Sort By Price</h3>
              <div className="space-y-2">
                <div
                  className={`flex items-center p-2 rounded cursor-pointer ${
                    tempFilters.priceSort === "+" ? "bg-maincolor/10" : ""
                  }`}
                  onClick={() => setTempFilters({ ...tempFilters, priceSort: "+" })}
                >
                  <span className={`inline-block w-4 h-4 border rounded-full mr-2 ${
                    tempFilters.priceSort === "+" ? "border-maincolor bg-maincolor" : "border-gray-400"
                  }`}></span>
                  Low to High
                </div>
                <div
                  className={`flex items-center p-2 rounded cursor-pointer ${
                    tempFilters.priceSort === "-" ? "bg-maincolor/10" : ""
                  }`}
                  onClick={() => setTempFilters({ ...tempFilters, priceSort: "-" })}
                >
                  <span className={`inline-block w-4 h-4 border rounded-full mr-2 ${
                    tempFilters.priceSort === "-" ? "border-maincolor bg-maincolor" : "border-gray-400"
                  }`}></span>
                  High to Low
                </div>
              </div>
            </section>

            {/* Price Range */}
            <section className="mb-6">
              <h3 className="font-semibold text-maincolor mb-2">Price Range</h3>
              <input
                type="range"
                min="0"
                max="50000"
                value={tempFilters.range}
                onChange={(e) => setTempFilters({ ...tempFilters, range: Number(e.target.value) })}
                className="w-full accent-maincolor mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>0 EGP</span>
                <span>{formatMoney(tempFilters.range)}</span>
              </div>
            </section>

            {/* Categories */}
            <section className="mb-6">
              <h3 className="font-semibold text-maincolor mb-2">Categories</h3>
              <ul className="space-y-2">
                {[
                  { id: "6439d58a0049ad0b52b9003f", name: "Women's Fashion", key: "woman" },
                  { id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", key: "man" },
                  { id: "6439d2d167d9aa4ca970649f", name: "Electronics", key: "electronics" },
                ].map((category) => (
                  <li
                    key={category.id}
                    className="flex items-center p-2 rounded cursor-pointer hover:bg-maincolor/10"
                    onClick={() =>
                      setTempFilters({
                        ...tempFilters,
                        categories: {
                          ...tempFilters.categories,
                          [category.key]: tempFilters.categories[category.key] ? "" : category.id,
                        },
                      })
                    }
                  >
                    <span
                      className={`inline-block w-4 h-4 border rounded mr-2 ${
                        tempFilters.categories[category.key] ? "bg-maincolor border-maincolor" : "border-gray-400"
                      }`}
                    ></span>
                    {category.name}
                  </li>
                ))}
              </ul>
            </section>

            {/* Brands */}
            <section>
              <h3 className="font-semibold text-maincolor mb-2">Brands</h3>
              <ul className="space-y-2">
                {[
                  { id: "64089fe824b25627a25315d1", name: "Canon", key: "canon" },
                  { id: "64089faf24b25627a25315cd", name: "Dell", key: "dell" },
                  { id: "64089bbe24b25627a253158b", name: "Defacto", key: "defacto" },
                  { id: "64089d5c24b25627a253159f", name: "Puma", key: "puma" },
                ].map((brand) => (
                  <li
                    key={brand.id}
                    className="flex items-center p-2 rounded cursor-pointer hover:bg-maincolor/10"
                    onClick={() =>
                      setTempFilters({
                        ...tempFilters,
                        brands: {
                          ...tempFilters.brands,
                          [brand.key]: tempFilters.brands[brand.key] ? "" : brand.id,
                        },
                      })
                    }
                  >
                    <span
                      className={`inline-block w-4 h-4 border rounded mr-2 ${
                        tempFilters.brands[brand.key] ? "bg-maincolor border-maincolor" : "border-gray-400"
                      }`}
                    ></span>
                    {brand.name}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </aside>
      )}

      {/* Main Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-maincolor"></div>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          Error loading products: {error.message}
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <img 
                  src={noProductFoundImg} 
                  alt="No products found" 
                  className="w-64 mb-4"
                />
                <p className="text-gray-500 text-lg">No products found matching your filters</p>
                <button
                  onClick={() => setTempFilters({
                    priceSort: "",
                    range: 50000,
                    categories: { woman: "", man: "", electronics: "" },
                    brands: { canon: "", dell: "", defacto: "", puma: "" },
                  })}
                  className="mt-4 px-4 py-2 bg-maincolor text-white rounded hover:bg-maincolor-dark transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {products.length > 0 && metadata.numberOfPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-maincolor text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: metadata.numberOfPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 ? 'bg-maincolor text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, metadata.numberOfPages))}
                disabled={currentPage === metadata.numberOfPages}
                className="px-4 py-2 bg-maincolor text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}