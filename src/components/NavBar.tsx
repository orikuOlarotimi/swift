"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useModal } from "@/app/hooks/useModal";
import { useAuthStore } from "@/utils/store/Auth";



export default function NavBar() {
  const { user, status } = useAuthStore();
  const { openModal } = useModal();
  return (
    <>
      <div className="h-[121px] flex justify-center items-center bg-[#F2F5FB] w-full px-[80px]">
        <nav className="flex justify-between items-center h-[61px] w-full bg-[#FFFFFF] rounded-[6px] pt-[10px] pb-[10px] pl-[15px] pr-[10px]">
          {/* Logo */}
          <Link href="/" className="flex items-center ml-[5px]">
            <Image
              src="/Logo.png"
              alt="Swift Logo"
              width={115}
              height={36}
              priority
            />
          </Link>

          {status !== "authenticated" || !user ? (
            <div className="flex items-center justify-between w-[186px] h-[41px]">
              <button
                className="text-black hover:text-blue-600 text-[16px] cursor-pointer"
                onClick={() => openModal("login")}
              >
                Login
              </button>

              <button
                className="rounded-[6px] bg-[#1c5adf] text-white text-[16px] hover:bg-blue-700 h-full w-[100px] cursor-pointer"
                onClick={() => openModal("signup")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center w-[352px] h-[41px] justify-between">
              <Link
                href="/"
                className="text-[16px] text-black hover:text-blue-600 font-inter font-normal"
              >
                Home
              </Link>

              <Link
                href="/chat"
                className="text-[16px] text-black hover:text-blue-600 font-inter"
              >
                Chats
              </Link>

              <Link
                href="/posts/create"
                className="text-[16px] text-black hover:text-blue-600 font-inter"
              >
                Create Post
              </Link>

              {/* Avatar Button */}
              <Link
                href="/profile"
                className="w-[41px] h-[41px] rounded-[6px] overflow-hidden"
              >
                <Image
                  src={user.image || "/defaultAvatar.jpg"}
                  alt="User avatar"
                  width={41}
                  height={41}
                  className="object-cover w-full h-full"
                />
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
