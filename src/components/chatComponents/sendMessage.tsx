"use client"
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";

const SendMessage = () => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
      if (!message.trim()) return;
    //   onSend(message);
      setMessage("");
    };
  return (
    <div className="h-[85px] border border-[#E6E8EC] w-full flex justify-between items-center p-[20px] focus:outline-none">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        placeholder="Type a message..."
        className=" flex-1 border border-[#D9DCE1] rounded-[6px] h-[45px] focus:outline-none pl-[20px] font-inter text-[16px] font-normal leading-none tracking-normal text-[#747788]"
      />

      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`w-[45px] h-[45px] rounded-[6px] ml-[20px] flex items-center justify-center 
          transition ${
            message.trim()
              ? "bg-[#1C5ADF] hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <IoSend size={30} />
      </button>
    </div>
  );
}

export default SendMessage