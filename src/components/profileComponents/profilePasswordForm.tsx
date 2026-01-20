"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ProfilePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

    const isFormFilled =
      currentPassword.trim() && newPassword.trim() && confirmNewPassword.trim();
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     // ✅ Frontend validations
     if (!currentPassword || !newPassword || !confirmNewPassword) {
       toast.error("All password fields are required");
       return;
     }

     if (newPassword.length < 6) {
       toast.error("New password must be at least 6 characters");
       return;
     }

     if (newPassword !== confirmNewPassword) {
       toast.error("New passwords do not match");
       return;
     }

     try {
       setLoading(true);

       const formData = new FormData();
       formData.append("OldPassword", currentPassword);
       formData.append("NewPassword", newPassword);
       formData.append("ConfirmPassword", confirmNewPassword);

       const { data } = await axios.post(
         `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/password`,
         formData,
         {
           withCredentials: true,
         }
       );

       if (!data?.success) {
         throw new Error(data?.message || "Password update failed");
       }

       toast.success("Password updated successfully");

       // ✅ Clear form after success
       setCurrentPassword("");
       setNewPassword("");
       setConfirmNewPassword("");
     } catch (err: any) {
       toast.error(err?.response?.data?.message || "Unable to update password");
     } finally {
       setLoading(false);
     }
   };
  return (
    <form
      className="flex flex-col w-full h-[230px] justify-between items-start"
      onSubmit={handleSubmit}
    >
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
      <button
        type="submit"
        disabled={!isFormFilled || loading}
        className={`w-[200px] h-[45px] rounded-[6px] font-inter text-white cursor-pointer
          ${
            !isFormFilled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1C5ADF] hover:opacity-90"
          }
        `}
      >
        {loading ? "Updating..." : "Update Password"}
      </button> 
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
};

export default ProfilePasswordForm;
