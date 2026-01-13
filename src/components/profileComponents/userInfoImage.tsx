"use client"
import React from 'react'
import Link from "next/link";
import { useAuthStore } from "@/utils/store/Auth";
const userInfoImage = () => {
  const { user, status } = useAuthStore();
  return (
    <div className="w-[288px] h-full flex justify-between items-center">
      <img
        src={user?.image || "./defaultAvatar"}
        alt="Picture of the author"
        className="rounded-[50%] object-cover w-[100px] h-[100px]"
      />
      <Link
        href="/"
        className="w-[148] h-[27px] font-inter font-normal text-[16px] leading-[170%] tracking-normal underline decoration-solid decoration-[#020827]"
      >
        Upload new picture
      </Link>
    </div>
  );
}

export default userInfoImage