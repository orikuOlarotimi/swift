"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import axois from "axios";
import { SlMagnifier } from "react-icons/sl";

const categories = [
  "Technology",
  "Business",
  "AI",
  "Crypto",
  "Design",
  "Health",
  "Finance",
  "Movies",
  "Sports",
];

const SelectCategory = () => {
  const [open, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, Setselected] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axois;
  }, []);

  // 🔹 Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Close when pressing ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="w-full max-w-[180px] relative h-full " ref={wrapperRef}>
      <button
        className=" border border-[#E5E5E5] rounded-[6px] w-full h-full px-4 flex justify-between items-center font-inter text-[16px] leading-none tracking-normal text-[#000000] w-[147px] cursor-pointer transition-all"
        onClick={() => {
          setIsOpen(!open);
        }}
      >
        {selected || " Select Category"}
        <IoIosArrowDown
          size={20}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`
    absolute left-0 w-full bg-white border border-[#E5E5E5] rounded-[6px] 
    shadow-lg mt-2 max-h-40 overflow-y-auto z-50 origin-top 
    transition-all duration-200 
    ${
      open
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-95 pointer-events-none"
    }
  `}
      >
        <div className="sticky top-0 bg-white border border-[#E5E5E5] flex items-center justify-center w-full">
          <SlMagnifier size={16} className="mx-[5px]" />
          <input
            type="text"
            className=" text-[16px] focus:outline-none placeholder:text-[#000000] font-inter p-[0]  w-[135px]"
            placeholder="Search Category"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />
        </div>
        {categories.map((cat) => (
          <div
            key={cat}
            className={`px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${
              cat.toLowerCase().startsWith(value.toLowerCase())
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (cat.toLowerCase().toLowerCase() !== selected.toLowerCase()) {
                Setselected(cat);
                setValue(""); // ← clear search input
                setIsOpen(false); // ← optional: close dropdown
              }
            }}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
