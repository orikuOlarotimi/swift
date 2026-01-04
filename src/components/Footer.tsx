"use client"
import React from 'react'
import Link from "next/link";
import { BsArrowUp } from "react-icons/bs";

const Footer = () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0, // Scroll position: The very top of the page
        behavior: "smooth", // Crucial: Makes the scroll animated
      });
    };
  return (
    <div className="w-full flex items-end justify-center bg-[#1C5ADF] h-[546px] px-[80px]">
      <div className="w-full h-[490px] flex flex-col items-center justify-between">
        <div className="h-[105px] flex items-center justify-between w-full">
          <div className="h-full max-w-[162px] flex flex-col items-start justify-between">
            <Link
              href="/about"
              className="font-inter text-[18px] leading-[170%] text-[#FFFFFF] font-normal"
            >
              About
            </Link>
            <Link
              href="/about"
              className="font-inter text-[18px] leading-[170%] text-[#FFFFFF] "
            >
              Terms of service
            </Link>
            <Link
              href="/about"
              className="font-inter text-[18px] leading-[170%] text-[#FFFFFF] "
            >
              Privacy Policy
            </Link>
          </div>
          <button
            className="h-full w-[30px] flex items-start cursor-pointer"
            onClick={scrollToTop}
          >
            <BsArrowUp size={30} className="text-[#FFFFFF] font-[700]" />
          </button>
        </div>

        <div className="h-[330px] w-full"> </div>
      </div>
    </div>
  );
}

export default Footer