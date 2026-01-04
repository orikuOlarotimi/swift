import React from "react";
import Link from "next/link";
import Image from "next/image";
import Forms from "../../components/profileComponents/profileInfoForm";
import ProfilePasswordForm from "@/components/profileComponents/profilePasswordForm";
import DeleteAccount from "@/components/profileComponents/deleteAccount";

const page = () => {
  return (
    <div>
      <div className="h-[224px] bg-[#F2F5FB] flex items-center justify-center w-full px-[80px]">
        <div className=" h-[85px] w-full">
          <h1 className="font-inter font-[600] text-[70px] leading-none tracking-normal text-[#000000]">
            Profile
          </h1>
        </div>
      </div>

      <div className="h-[1312px] flex items-center justify-center w-full px-[80px]">
        <div className="w-full  h-full flex flex-col items-center justify-around">
          <div className="w-full flex items-center justify-start h-[100px]">
            <div className="w-[288px] h-full flex justify-between items-center">
              <Image
                src="/profile.jpg"
                alt="Picture of the author"
                width={100}
                height={100}
                className="rounded-[50%]"
              />
              <Link
                href="/"
                className="w-[148] h-[27px] font-inter font-normal text-[16px] leading-[170%] tracking-normal underline decoration-solid decoration-[#020827]"
              >
                Upload new picture
              </Link>
            </div>
          </div>

          <div className="w-full h-[277px]">
            <Forms />
          </div>
          <div className="w-full h-[362px] flex flex-col items-start justify-between">
            <div className="w-[203px] h-[102px] flex flex-col items-start justify-between ">
              <h1 className="font-inter font-600 text-[50px] text-[#020827] leading-none tracking-normal">
                Security
              </h1>
              <h3 className="font-inter font-normal text-[#747788] leading-[170%] text-[18px]">
                Change Password
              </h3>
            </div>

            <ProfilePasswordForm />
          </div>
            <DeleteAccount/>
        </div>
      </div>
    </div>
  );
};

export default page;
