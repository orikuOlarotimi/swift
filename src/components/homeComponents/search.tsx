"use client"
import React, { useState } from 'react'
import { SlMagnifier } from "react-icons/sl";

const search = () => {
    const [value, setValue] = useState("");

    const handleSearch = () => {
      console.log("none");
    };
  return (
    <div className="flex items-center bg-[#F2F5FB] rounded-[6px] w-full max-w-[320px] h-full pl-[20px]">
      <button onClick={handleSearch} className="cursor-pointer">
        <SlMagnifier size={18} className="text-[#717680] mr-[10px]" />
      </button>
      <input
        type="text"
        placeholder="Search"
        className="text-[16px] text-[#717680] font-inter font-normal tracking-normal leading-none h-full focus:outline-none flex-1"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default search