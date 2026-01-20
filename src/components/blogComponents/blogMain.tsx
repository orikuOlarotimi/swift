"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Blog } from "../../utils/types/blog";
import toast from "react-hot-toast";
import { BsArrowDown } from "react-icons/bs";
import Link from "next/link";
import LocalLoader from "@/components/LocalLoader";
import api from "@/utils/api";

export const fetchAllBlogs = async (): Promise<{
  blogs: Blog[];
  nextCursor?: string;
}> => {
  const res = await api.post("/blog/all-blogs", {});
  if (!res.data?.success) {
    throw new Error("Failed to fetch blogs");
  }

  return {
    blogs: res.data.data,
    nextCursor: res.data.nextCursor,
  };
};

export const fetchMoreBlogs = async (
  cursor: string,
): Promise<{
  blogs: Blog[];
  nextCursor?: string;
}> => {
  const formData = new FormData();
  formData.append("cursor", cursor);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/all-blogs`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!res.data?.success) {
    throw new Error("Failed to fetch more blogs");
  }

  return {
    blogs: res.data.data,
    nextCursor: res.data.nextCursor,
  };
};

const BlogMain = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetchAllBlogs();
        setBlogs(res.blogs);
        setNextCursor(res.nextCursor ?? null);
      } catch (err) {
        toast.error("Unable to load blogs,please refresh");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const loadMoreBlogs = async () => {
    if (!nextCursor) return;
    setLoadingMore(true);

    try {
      const res = await fetchMoreBlogs(nextCursor);
      setBlogs((prev) => [...prev, ...res.blogs]);
      setNextCursor(res.nextCursor ?? null);
    } catch (err) {
      toast.error("Unable to load more articles");
    } finally {
      setLoadingMore(false);
    }
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full min-h-[100px] flex flex-col items-center justify-between relative">
      <LocalLoader open={loading} />
      <section className="w-full flex items-center justify-center min-h-[100px]">
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-y-[60px] gap-x-[40px]
          w-full
        "
        >
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="
              bg-white
              hover:shadow-md
              transition-shadow
              w-full
              max-h-[474px]
            "
            >
              <div className="w-full max-h-[404px]">
                <img
                  src={blog.image || "/defaultBlog.jpg"}
                  alt="User blog Image"
                  className="object-cover w-full h-[220px] rounded-[12px]"
                  loading="lazy"
                />
                <div className="bg-[#F2F5FB] min-w-[40px] min-h-[27px] inline-flex items-center justify-center  pl-[10px]  pr-[10px] mb-[25px] mt-[20px]">
                  <h2 className="font-inter text-[14px] text-[#020827] uppercase">
                    {blog.categories[0]}
                  </h2>
                </div>
                <div className="flex flex-col items-start justify-between max-h-[147px] w-full">
                  <h3 className="text-[22px] font-[400] leading-[130%] text-[#020827] font-inter mb-[8px]">
                    {blog.heading}
                  </h3>

                  <p className="line-clamp-3 font-inter text-[16px] leading-[170%] text-[#747788]">
                    {blog.body}
                  </p>
                </div>
              </div>

              <div className="w-full h-[40px]  flex items-center justify-between mt-[30px]">
                <div className="min-w-[134px] h-full flex  items-center justify-between">
                  <img
                    src={blog.authorImage || "/defaultAvatar.jpg"}
                    alt="Author avatar"
                    className="object-cover w-[40px] h-full rounded-[6px]"
                    loading="lazy"
                  />
                  <h2 className="font-inter font-normal text-[16px] leading-[170%] text-[#020827]">
                    {blog.authorName}
                  </h2>
                </div>
                <p className="font-inter text-[16px] leading-[170%] text-[#020827]">
                  {formatDate(blog.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {nextCursor && (
        <button
          onClick={loadMoreBlogs}
          disabled={loadingMore}
          className={`bg-[#1C5ADF] rounded-[6px] w-[202px] h-[41px] mt-[80px]
      flex items-center justify-center
      ${loadingMore ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loadingMore ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <p className="text-white font-inter text-[16px] flex items-center">
              Load more articles
              <BsArrowDown size={13} className="ml-[10px]" />
            </p>
          )}
        </button>
      )}
    </div>
  );
};

export default BlogMain;
