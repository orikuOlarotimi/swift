"use client"
import React from 'react'
import { ImWarning } from "react-icons/im";
import { useModal } from "@/app/hooks/useModal";


const DeleteAccount = () => {
    const { closeModal } = useModal();
    return (
      <div className="w-[416px] h-[332px] flex flex-col items-center justify-between">
        <ImWarning className="w-[92px] h-[80px] text-[#EF4444]" />
        <h1 className="font-inter font-[600] text-[34px] leading-none tracking-normal text-[#020827]">
          Are you sure you want <br /> to{" "}
          <span className="text-[#EF4444]">delete</span> your account?
        </h1>
        <p className="font-inter text-[14px] leading-[170%] tracking-normal text-[#020827]">
          This action is permanent and cannot be undone.
          <br />
          All your posts and data will be permanently removed.
        </p>
        <div className="flex items-center justify-between w-[270px] h-[61px]">
          <button
            className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827] h-[41px] w-[93px] rounded-[6px] bg-[#F0F0F0] cursor-pointer"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#FFFFFF] h-[41px] w-[157px] rounded-[6px] bg-[#EF4444] cursor-pointer">
            Delete Account
          </button>
        </div>
      </div>
    );
}

export default DeleteAccount