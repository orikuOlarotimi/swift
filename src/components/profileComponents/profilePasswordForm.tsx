"use client"
import React, { useState } from 'react'

const profilePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    return (
      <form className="flex flex-col w-full h-[220px] justify-between items-start">
        <div className="flex w-full h-[180px] justify-between items-start">
          <div className="flex flex-col items-start justify-between h-[70px] w-[610px]">
            <label
              htmlFor="currentPassword"
              className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827]"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-[43px] bg-[#F2F5FB] rounded-[6px] font-inter pl-[20px] focus:outline-none"
              placeholder="Enter current password"
            />
          </div>

          <div className="flex flex-col items-start justify-between w-[610px] h-[180px]">
            <div className="flex flex-col items-start justify-between h-[70px] w-full">
              <label
                htmlFor="newPassword"
                className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827]"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-[43px] bg-[#F2F5FB] rounded-[6px] font-inter pl-[20px] focus:outline-none"
                placeholder="Enter new password"
              />
            </div>

            <div className="flex flex-col items-start justify-between h-[70px] w-full">
              <label
                htmlFor="confirmNewPassword"
                className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827] "
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full h-[43px] bg-[#F2F5FB] rounded-[6px] font-inter pl-[20px] focus:outline-none"
                placeholder="Re-enter new password"
              />
            </div>
          </div>
        </div>
        <hr className="w-full bg-[#E5E5E5]"></hr>
        {/* <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md 
                   hover:bg-blue-700 transition-all"
        >
          Update Password
        </button> */}
      </form>
    );
}

export default profilePasswordForm