import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)} // Using navigate instead of history.back
            className="back-icon flex-shrink-0 self-start cursor-pointer size-[35px] rounded-full bg-maincolor flex justify-center items-center duration-300 hover:-translate-x-1 hover:scale-105"
            aria-label="Go back"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="white" 
                className="w-5 h-5"
            >
                <path 
                    fillRule="evenodd" 
                    d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" 
                    clipRule="evenodd" 
                />
            </svg>
        </button>
    );
}