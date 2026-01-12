import SelectCategory from "../components/SelectCategory"
import Search from "@/components/homeComponents/search";
import BlogMain from "@/components/blogComponents/blogMain";

export default function Home() {
  

  return (
    <div className="min-h-[700px] ">
      <div className="bg-[#F2F5FB] h-[490px] flex justify-center items-center w-full px-[80px]">
        <div className="h-[233px] flex justify-start items-center w-full">
          <div className=" h-[220px] flex flex-col justify-between">
            <div className="h-[142px] flex flex-col justify-between">
              <h1
                className="text-[70px] leading-none tracking-normal font-semibold text-[#000000]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Ideas Worth <span className="text-[#1C5ADF]">Sharing.</span>
              </h1>
              <p
                style={{ fontFamily: "var(--font-inter)" }}
                className="font-normal text-[18px] text-[#020827] leading-none tracking-normal"
              >
                Your distraction-free space to read, write, and connect
              </p>
            </div>

            <button
              className="
                w-[206px] h-[41px] 
                opacity-100 
                font-normal text-[16px] 
                leading-[100%] tracking-[0%] 
                text-[#FFFFFF]
                cursor-pointer
                bg-[#1C5ADF]
                rounded-[6px]
                hover:bg-[#1548b2] 
                flex items-center justify-center
            "
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Join the Conversation
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-[600px] flex flex-col  items-center justify-around w-full px-[80px] pb-[100px]">
        <div className="w-full h-[61px] flex justify-between items-center my-[80px]">
          <h1 className="font-inter text-[50px] font-[600] tracking-normal leading-none text-[#020827]">
            Articles
          </h1>
          <div className="w-full max-w-[512px] h-full flex justify-between items-center">
            <Search />
            <SelectCategory />
          </div>
        </div> 
          <BlogMain/>
      </div>
    </div>
  );
}
