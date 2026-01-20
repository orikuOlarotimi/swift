"use client";
import React, {useState} from "react";
import { SlMagnifier } from "react-icons/sl";

const SearchChat = () => {
     const [value, setValue] = useState("")
       const handleSearch = () => {
         console.log("none");
       };
         
  return (
    <div className="flex items-center bg-[#F2F5FB] rounded-[6px] w-[380px] h-[45px] pl-[20px] ">
      <button onClick={handleSearch} className="cursor-pointer">
        <SlMagnifier size={18} className="text-[#717680] mr-[10px]" />
      </button>
      <input
        type="text"
        placeholder="Search chats"
        className="text-[16px] text-[#717680] font-inter font-normal tracking-normal leading-none h-full focus:outline-none w-full"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchChat;
