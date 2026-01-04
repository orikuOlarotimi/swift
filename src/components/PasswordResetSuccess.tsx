import React from 'react'
import { useModal } from '@/app/hooks/useModal';

const PasswordResetSuccess = () => {
  const { setView } = useModal();
    return (
      <div className="h-[266px] w-[395px] flex flex-col items-center justify-between">
        <div className="h-[85px] w-full flex flex-col items-center justify-between">
          <h1 className="font-inter font-[600] text-[34px] leading-none tracking-normal text-center text-[#020827]">
            Password <span className="text-[#1C5ADF]"> Reset!</span>
          </h1>

          <p className="font-inter font-[400] text-[14px] leading-[170%] text-[#020827]">
            You can now sign in with your new password.
          </p>
        </div>

        <div className="h-[141px]  w-full flex flex-col items-center justify-between ">
          <img
            src="./tick.gif"
            alt="Loading animation"
            className="w-[60px] h-[60px]"
          />
          <button
            type="submit"
            onClick={() => {
              setView("login");
            }}
            className="bg-[#1C5ADF] rounded-[6px] w-full h-[41px] cursor-pointer font-inter text-[#FFFFFF] text-[16px] font-[400] hover:bg-[#174bb9] transition-all duration-200"
          >
            Sign in
          </button>
        </div>
      </div>
    );
}

export default PasswordResetSuccess