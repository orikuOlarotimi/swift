"use client";
import { useState } from "react";
import { useModal } from "@/app/hooks/useModal";
import { useAuthStore } from "@/utils/store/Auth";


const CommentsSection = ({ blog }: { blog: any }) => {
    const { status } = useAuthStore();
    const [comment, setComment] = useState("")
    const { openModal } = useModal();

  return (
    <div className="min-h-[194px] w-full flex flex-col items-start justify-between">
      <h1 className="font-inter font-[600] text-[50px] text-[#020827]">
        Comments ({blog.comments?.length || 0})
      </h1>

      {status === "authenticated" ? (
        <div className="flex flex-col items-start justify-between min-h-[200px] w-full mt-[60px]">
          <div className="h-[115px] w-full flex flex-col items-start justify-between">
            <div className="flex items-center justify-between gap-[15px]">
              <img
                src={blog.authorImage || "/defaultAvatar.jpg"}
                className="w-[40px] h-[40px] rounded-[6px] object-cover"
              />
              <p className="text-[#020827] text-[16px] font-inter">
                {blog.authorName}
              </p>
            </div>
            <textarea
              id="bio"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-[60px] rounded-[6px] bg-[#F2F5FB] font-inter pl-[20px] pt-[12px] w-full focus:outline-none text-[#717680] text-[16px]"
              placeholder="Write your thoughts..."
            ></textarea>
          </div>
        </div>
      ) : status === "unauthenticated" ? (
        <div className="flex flex-col justify-between items-start w-full h-[100px] mt-[60px]">
          <p className="text-[18px] font-inter text-[#020827]">
            Want to share your thoughts?
          </p>
          <button
            className="rounded-[6px] bg-[#1C5ADF] text-center text-[16px] font-inter text-[#FFFFFF] h-[41px] w-[100px]"
            onClick={() => openModal("signup")}
          >
            Signup
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-sm mt-2">Checking login status...</p>
      )}
    </div>
  );
};

export default CommentsSection;
