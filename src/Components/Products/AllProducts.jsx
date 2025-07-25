import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';

export default function AllProducts({data , currentPage , setCurrentPage}) {



  // console.log(data);
  

  const products = data?.data || [];
  const metadata = data?.metadata || {};
  
  const { currentPage: apiCurrentPage, numberOfPages, limit } = metadata;

  return (
    <>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {products.map((product) => {
              return <Card product={product} key={product._id} />
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-maincolor text-white rounded disabled:opacity-50 hover:bg-green-500 transition cursor-pointer"
            >
              Prev
            </button>

            {/* Render page numbers */}
            {Array.from({ length: numberOfPages || 1 }, (_ , i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === i + 1 ? 'bg-green-400 text-white' : 'bg-gray-200 hover:bg-green-200'
                } transition cursor-pointer`}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))}
              disabled={currentPage === numberOfPages}
              className="px-3 py-1 mx-1 bg-maincolor text-white rounded disabled:opacity-50 hover:bg-green-500 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      
    </>
  );
}