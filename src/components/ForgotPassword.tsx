"use client";

import { useState } from "react";
import { useModal } from "@/app/hooks/useModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import toast from "react-hot-toast";
import { setAuthFlowEmail } from "@/utils/authFlowEmail";

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
export default function ForgotPasswordScreen() {
  const { setView } = useModal();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);


  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const isEmailValid = emailRegex.test(email.trim());

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isEmailValid || isLoading) return;
    const controller = new AbortController();
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      controller.abort();
      setIsLoading(false);
      toast.error("Request timed out. Please try again.");
    }, 15000);

    try {
      const formData = new FormData();
      formData.append("email", email.trim());

      const res = await fetch(`${API_BASE_URL}/auth/request-reset`, {
        method: "POST",
        body: formData,
        credentials: "include",
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send reset code");
        return;
      }

      setAuthFlowEmail(email.trim());
      toast.success("OTP sent to your email 📩");
      setView("reset-password-verification");
      setEmail("");
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
      <div className="h-[317px] w-[395px]">
        <form
          className="flex flex-col justify-between h-full"
          onSubmit={handleSubmit}
        >
          <div className="h-[109px] flex flex-col justify-between items-center">
            <h1 className="text-[34px] font-[600] leading-[120%] tracking-normal text-[rgba(2,8,39,1)] font-inter">
              Reset <span className="text-[rgba(28,90,223,1)]">Password.</span>
            </h1>
            <div className="h-[48px] max-w-[323px] font-inter font-[400] text-[14px] text-[rgba(2,8,39,1)] text-center leading-[170%]">
              <p>Enter your registered email.</p>
              <p> We'll send you a link to reset your password.</p>
            </div>
          </div>

          <div className="h-[168px] flex flex-col justify-between items-center">
            <div className="relative flex flex-col justify-between m-0 h-[70px] w-full">
              <label
                htmlFor="email"
                className="font-normal text-[16px] leading-[1.0] text-[rgba(2,8,39,1)] font-inter"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                required
                className="w-full rounded-[6px] pl-[20px] focus:outline-none text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px] font-inter"
              />
              {touched && !isEmailValid && (
                <span className="absolute -bottom-5 text-xs text-red-500 font-inter">
                  Enter a valid email address
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!isEmailValid || isLoading}
              className={`w-full h-[41px] rounded-[6px] text-[16px] font-inter transition
                ${
                  isEmailValid
                    ? "bg-[#1c5adf] text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Send Reset Code
            </button>

            <button
              type="submit"
              onClick={() => setView("login")}
              className="text-[#1C5ADF] cursor-pointer font-inter text-[14px] font-[400] leading-none tracking-normal"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
