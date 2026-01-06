import React, {useState} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";

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
  return (
    <section className='flex items-center '>
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

      <div className="mt-[265px] border border-black w-[800px] min-h-[894px] "></div>
    </section>
  );
};

export default page