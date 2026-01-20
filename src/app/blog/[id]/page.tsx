import { notFound } from "next/navigation";
import axios from "axios";
import BlogView from "../../../components/blogComponents/blogview";

interface PageProps {
  params: Promise<{ id: string }>;
}

const fetchSingleBlog = async (id: string) => {
  const formData = new FormData();
  formData.append("id", id);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/blog`,
    formData,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (!res.data?.success) {
    throw new Error("Failed to fetch blog");
  }

  return res.data.data;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  let blog;
  try {
    blog = await fetchSingleBlog(id);
  } catch {
    notFound();
  }

  if (!blog) notFound();

  return <BlogView blog={blog} />;
};

export default Page;
