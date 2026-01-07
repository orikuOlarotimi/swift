import React, {useState} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";
import { LuShare } from "react-icons/lu";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const fetchSingleBlog = async (id: string) => {
  const formData = new FormData();
  formData.append("id", id);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/blog`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!res.data?.success) {
    toast.error("unable to get blog info, please refresh the page ")
    throw new Error("Failed to fetch blog");
  }
  return res.data.data; 
};

const page = async ({ params }: PageProps) => {
   const { id } = await params;
  let blog;

  try {
    blog = await fetchSingleBlog(id);
  } catch (error) {
    toast.error("could not get blog info,please refresh the page");
  }

  if (!blog) {
    notFound();
  }

   const formatDate = (isoDate: string) => {
     return new Date(isoDate).toLocaleDateString("en-US", {
       month: "long",
       day: "numeric",
       year: "numeric",
     });
  };
  
  return (
    <section className="">
      <div className="w-full h-[682px] bg-[#F2F5FB] relative flex items-center justify-center">
        <div className="w-[1000px] min-h-[753px]  flex flex-col items-center justify-between absolute top-[119px]">
          <h1 className="font-inter text-[60px] text-[#020827]">
            {blog.heading}
          </h1>
          <p className="font-inter text-[14px] text-[#020827] uppercase  bg-[#FFFFFF] py-[5px] px-[10px]">
            {blog.categories[0]}
          </p>
          <img
            src={blog.image || "/defaultBlog.jpg"}
            alt="User blog Image"
            className="object-cover w-full h-[500px] rounded-[12px]"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-[265px] border border-black w-[800px] min-h-[894px] w-full flex items-center justify-center">
        <div className=" w-[800px] min-h-[894px] border border-red-500">
          <div className="w-full h-[41px] flex items-center justify-between">
            <div className="min-w-[241px] h-full flex items-center justify-between">
              <img
                src={blog.authorImage || "/defaultAvatar.jpg"}
                alt="Author avatar"
                className="object-cover w-[40px] h-[40px] rounded-[50%]"
                loading="lazy"
              />
              <p className="font-inter text-[16px] leading-[170%] text-[#020827] mx-[15px]">
                {blog.authorName}
              </p>
              <button className="font-inter text-[16px] text-[#FFFFFF] rounded-[6px] bg-[#1C5ADF] text-center w-[89px] h-full">
                Follow
              </button>
            </div>
            <div className="min-w-[269px] h-[27px] flex items-center justify-between">
              <p className="text-[16px] font-inter leading-[170%] text-[#020827]">
                {" "}
                Published <span>{formatDate(blog.date)}</span>
              </p>
              <button className="h-[20px] flex items-center justify-center">
                <LuShare size={20} className="text-[#1C5ADF] font-inter" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default page