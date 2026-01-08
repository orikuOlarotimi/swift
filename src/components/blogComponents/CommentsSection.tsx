"use client";

import { useAuthStore } from "@/utils/store/Auth";

const CommentsSection = ({ blog }: { blog: any }) => {
  const { status } = useAuthStore();

  return (
    <div>
      <h1 className="font-inter font-[600] text-[50px] text-[#020827]">
        Comments ({blog.comments?.length || 0})
      </h1>

      {status === "authenticated" ? (
        <p>Authenticated user UI here</p>
      ) : status === "unauthenticated" ? (
        <p>Please log in to comment.</p>
      ) : (
        <p className="text-gray-400 text-sm mt-2">Checking login status...</p>
      )}
    </div>
  );
};

export default CommentsSection;
