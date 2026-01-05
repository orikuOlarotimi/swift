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

  try {
   const blog = await fetchSingleBlog(id);
   
  } catch (error) {
    // notFound();
    console.log(error)
  }

  // if (!blog) {
  //   notFound();
  // }
  return (
    <section>
      <div className="w-full h-[682px] bg-[#F2F5FB]">
        <div>{blog.authorName}</div>
      </div>
    </section>
  );
};

export default page