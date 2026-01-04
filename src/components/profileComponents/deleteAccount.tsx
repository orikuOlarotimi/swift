"use client"
import React from 'react'
import { useModal } from "@/app/hooks/useModal";

const deleteAccount = () => {
    const { openModal } = useModal();
    return (
      <div className="border border-[#EF4444] p-[40px] flex flex-col items-start justify-between h-[253px] w-full">
        <h1 className="text-[#EF4444] text-[50px] font-inter leading-none tracking-normal font-[600]">
          Danger Zone
        </h1>
        <p className="font-inter text-[18px] leading-[170%] tracking-normal text-[#747788] ">
          Deleting your account is permanent and cannot be undone. All your data
          will be permanently removed.
        </p>
        <button
          className="bg-[#EF4444] w-[157px] h-[41px] rounded-[6px] font-inter text-[16px] font-normal text-[#FFFFFF] cursor-pointer"
          onClick={() => openModal("delete-account")}
        >
          Delete Account
        </button>
      </div>
    );
}

export default deleteAccount