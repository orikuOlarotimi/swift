// components/LoginForm.tsx
"use client";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { useModal } from "@/app/hooks/useModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import toast from "react-hot-toast";
import {
  getAuthFlowEmail,
  getResetToken,
  clearAuthFlowEmail,
  clearResetToken,
} from "../utils/authFlowEmail";

const TIMEOUT_MS = 15000;

const NewPassword = () => {
  const { setView } = useModal();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const isPasswordValid = newPassword.length >= 6 && newPassword.length <= 20;

  const passwordsMatch = newPassword === confirmPassword;

  const confirmError =
    touchedConfirm && !passwordsMatch ? "Passwords do not match" : null;
  
  const canSubmit = isPasswordValid && passwordsMatch && !isLoading;
  
  
  
   const handleSubmit = async(e: React.FormEvent) => {
     e.preventDefault();
      setTouchedConfirm(true);

      if (!canSubmit) return;

      const email = getAuthFlowEmail();
      const resetToken = getResetToken();

      if (!email || !resetToken) {
        toast.error("Session expired. Please restart the process.");
        clearAuthFlowEmail()
        clearResetToken()
        setView("forgot-password");
        return;
     }
     
      const timeoutId = setTimeout(() => {
        controller.abort();
        setIsLoading(false);
        toast.error("Request timed out. Please try again.");
      }, TIMEOUT_MS);

      setIsLoading(true);
     const controller = new AbortController();
     
     try {
       const formData = new FormData();
       formData.append("Email", email);
       formData.append("ResetToken", resetToken);
       formData.append("NewPassword", newPassword);
       formData.append("ConfirmPassword", confirmPassword);

       const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
         method: "POST",
         body: formData,
         credentials: "include",
         signal: controller.signal,
       });

       const data = await res.json();

       if (!res.ok) {
         toast.error(data.message || "Failed to reset password");
         return;
       }

       toast.success("Password reset successfully 🎉");
       clearAuthFlowEmail();
       clearResetToken();
       setNewPassword("");
       setConfirmPassword("");
       setView("password-reset-success");
     } catch (err: any) {
       if (err.name !== "AbortError") {
         toast.error("Network error. Please try again.");
       }
     } finally {
       clearTimeout(timeoutId);
       setIsLoading(false);
     }
   };

  return (
    <>
      <LoadingOverlay open={isLoading} />
      <div className="h-[302px] w-[395px]">
        <form
          className="flex flex-col  justify-between h-full w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[32px] leading-none text-center font-[600] text-[#020827] font-inter">
            Create a New <span className="text-[#1C5ADF]">Password.</span>
          </h2>

          <div className="h-[221px] flex flex-col justify-between">
            {/* NEW PASSWORD FIELD */}
            <div className="flex flex-col justify-between m-0 h-[70px]">
              <label
                htmlFor="newPassword"
                className="font-[400] text-[16px] leading-[1.0] text-[#020827] font-inter"
              >
                New Password
              </label>

              <div className="flex items-center justify-between bg-[#F2F5FB] rounded-[6px]">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  required
                  minLength={6}
                  maxLength={20}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-[350px] rounded-[6px] pl-[20px] focus:outline-none text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px] font-normal font-inter"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="text-gray-500 hover:text-[#1C5ADF] cursor-pointer h-full w-[45px] flex justify-center items-center"
                >
                  {showNewPassword ? (
                    <RxEyeClosed size={20} />
                  ) : (
                    <RxEyeOpen size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM NEW PASSWORD FIELD */}
            <div className="relative flex flex-col justify-between m-0 h-[70px]">
              <label
                htmlFor="confirmPassword"
                className="font-normal text-[16px] leading-[1.0] text-[#020827] font-inter"
              >
                Confirm New Password
              </label>

              <div className="flex items-center justify-between bg-[#F2F5FB] rounded-[6px]">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onBlur={() => setTouchedConfirm(true)}
                  required
                  minLength={6}
                  maxLength={20}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-[350px] rounded-[6px] pl-[20px] focus:outline-none text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px] font-normal font-inter"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-gray-500 hover:text-[#1C5ADF] cursor-pointer h-full w-[45px] flex justify-center items-center"
                >
                  {showConfirmPassword ? (
                    <RxEyeClosed size={20} />
                  ) : (
                    <RxEyeOpen size={20} />
                  )}
                </button>
              </div>
              {confirmError && (
                <span className="absolute -bottom-5 text-[12px] text-red-500 font-inter">
                  {confirmError}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full h-[41px] rounded-[6px] text-[16px] font-inter transition
                ${
                  canSubmit
                    ? "bg-[#1C5ADF] text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPassword;
