import { LuShare } from "react-icons/lu";
import CommentsSection from "../../components/blogComponents/CommentsSection";

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const BlogView = ({ blog }: { blog: any }) => {
  return (
    <section>
      {/* HERO */}
      <div className="w-full h-[682px] bg-[#F2F5FB] relative flex items-center justify-center">
        <div className="w-[1000px] min-h-[753px] flex flex-col items-center justify-between absolute top-[119px]">
          <h1 className="font-inter text-[60px] text-[#020827]">
            {blog.heading}
          </h1>

          <p className="font-inter text-[14px] text-[#020827] uppercase bg-white py-[5px] px-[10px]">
            {blog.categories?.[0]}
          </p>

          <img
            src={blog.image || "/defaultBlog.jpg"}
            alt="User blog"
            className="object-cover w-full h-[500px] rounded-[12px]"
          />
        </div>
      </div>

      {/* BODY */}
      <div className="mt-[265px] w-full flex justify-center">
        <div className="w-[800px] min-h-[250px] flex flex-col gap-[80px] items-start justify-between border border-red-400">
          {/* AUTHOR */}
          <div className="w-full h-[41px] flex items-center justify-between ">
            <div className="min-w-[241px] h-full flex items-center justify-between">
              <img
                src={blog.authorImage || "/defaultAvatar.jpg"}
                className="w-[40px] h-[40px] rounded-full object-cover"
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

          {/* CONTENT */}
          <div className=" w-full">
            <p className="font-inter text-[18px] leading-[170%] text-[#747788]">
              {blog.body}
            </p>

            <div className="mt-10">
              <h2 className="text-[30px] font-[600]">Key Takeaways</h2>

              {blog.keyTakeaways?.length ? (
                <ul className="list-disc pl-5">
                  {blog.keyTakeaways.map((item: string, i: number) => (
                    <li key={i} className="text-[#747788] text-[18px]">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No key takeaways provided.
                </p>
              )}
            </div>
          </div>

          {/* COMMENTS (CLIENT) */}
          <CommentsSection blog={blog} />
        </div>
      </div>
    </section>
  );
};

export default BlogView;
