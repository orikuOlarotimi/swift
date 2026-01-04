"use client";
import React from "react";
import SearchChat from "../../components/chatComponents/searchChat";
import RecentChats from "../../components/chatComponents/recentChats"
import SendMessage from "@/components/chatComponents/sendMessage";



const page = () => {

  return (
    <div>
      <div className="h-[224px] bg-[#F2F5FB] flex items-center justify-center w-full px-[80px]">
        <div className="w-full h-[85px]">
          <h1 className="font-inter font-[600] text-[70px] leading-none tracking-normal text-[#000000]">
            Chats
          </h1>
        </div>
      </div>

      <div className="flex justify-between items-start w-full h-[935px] ">
        <div className="h-full flex flex-col w-[420px]">
          <div className="flex items-center justify-center w-full h-[100px]">
            <SearchChat />
          </div>

          <RecentChats/>
        </div>

        <div className="flex-1 h-full">
          <div className="h-[100px] w-full flex justify-start items-center pl-[20px] border border-[#E6E8EC]">
            <div className="w-[255px] h-[60px] flex items-center justify-between">
              <img
                src="https://i.pravatar.cc/100?img=1"
                alt="Profile Pic"
                className="w-[60px] h-[60px] rounded-[50%] object-cover"
              />
              <div className="w-[180px] h-[44px] flex flex-col justify-between items-start">
                <h3 className="font-inter text-[20px] leading-none tracking-normal text-[#020827] font-normal">
                  David Park
                </h3>
                <span className="flex items-center justify-between h-[16px] min-w-[66px]">
                  <p className="text-[#747788] font-inter font-normal text-[16px] leading-none tracking-normal ">
                    Online
                  </p>
                  <span className="w-[8px] h-[8px] rounded-full bg-[#1CDF50] ml-[10px]" />
                </span>
              </div>
            </div>
          </div>
          <div className="h-[750px]  w-full"></div>
          <div >
            <SendMessage/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
