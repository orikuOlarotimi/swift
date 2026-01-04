"use client"
import React, { useState, useRef, useEffect } from "react";
import { useModal } from "@/app/hooks/useModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import toast from "react-hot-toast";
import { getAuthFlowEmail, clearAuthFlowEmail } from "@/utils/authFlowEmail";
import { useAuthStore } from "../utils/store/Auth";


const Otp = () => {
  const length = 6;
  const RESEND_TIME = 60;
  const TIMEOUT_MS = 15000;

  const [timeLeft, setTimeLeft] = useState(RESEND_TIME);
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const { setView, closeModal } = useModal();
  const { setUser, clearUser } = useAuthStore();

   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
   const isOtpComplete = otp.every((digit) => digit !== "");

   /*Countdown logic*/
   useEffect(() => {
     if (timeLeft <= 0) {
       setCanResend(true);
       return;
     }

     const timer = setInterval(() => {
       setTimeLeft((prev) => prev - 1);
     }, 1000);

     return () => clearInterval(timer);
   }, [timeLeft]);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpComplete || isVerifying) return;
    setIsVerifying(true);

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
      setIsVerifying(false);
      toast.error("Request timed out. Please try again.");
    }, TIMEOUT_MS);


    try {
      const formData = new FormData();
      formData.append("Code", otp.join(""));

      const res = await fetch(`${API_BASE_URL}/auth/confirm`, {
        method: "POST",
        body: formData,
        credentials: "include",
        signal: controller.signal,
      });
      const data = await res.json();

      if (!res.ok || data.success !== true) {
        toast.error(data.message || "Invalid verification code");
        setOtp(Array(length).fill(""));
        return;
      }
      const meRes = await fetch(`${API_BASE_URL}/profile/me`, {
        method: "POST",
        credentials: "include",
        signal: controller.signal,
      });

      if (meRes.status === 401) {
        toast.error("Session error. Please try again.");
        clearUser();
        return;
      }

      const meData = await meRes.json();

      if (!meData.success || !meData.data) {
        toast.error("Unable to retrieve user data.");
        clearUser();
        return;
      }

      setUser(meData.data);
      toast.success("Account verified successfully 🎉");
      closeModal();
      clearAuthFlowEmail();

    } catch (err: any) {
      console.log(err)
      if (err.name === "AbortError") {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsVerifying(false);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move to next
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

   const handleResend = async () => {
     if (!canResend) return;

     try {
       const email = getAuthFlowEmail();
       if (!email) {
         toast.error("Session expired. Please restart the process.");
         setView("signup");
         return;
       }

       setCanResend(false);
       setTimeLeft(RESEND_TIME);
       setOtp(Array(length).fill(""));
       inputsRef.current[0]?.focus();

       const formData = new FormData();
       formData.append("Email", email);

       const res = await fetch(`${API_BASE_URL}/auth/resend-register-otp`, {
         method: "POST",
         body: formData,
         credentials: "include",
       });

       const data = await res.json();
       if (!res.ok) {
         toast.error(data.message || "Failed to resend OTP");
         return;
       }
       toast.success("A new OTP has been sent");
     } catch (error) {
       toast.error("Network error. Please try again.");
     }
   };


  return (
    <>
      <LoadingOverlay open={isVerifying} />
      <div className="w-[395px] h-[266px] flex flex-col justify-between items-center font-inter">
        <div className="h-[85px] w-full flex flex-col justify-between items-center">
          <h1 className="text-[34px] text-[rgba(2,8,39,1)] font-[600] font-semibold leading-none tracking-normal m-[0] p-[0] font-inter">
            Check Your <span className="text-[rgba(28,90,223,1)] ">Email.</span>
          </h1>
          <p className="text-[14px] font-[400] leading-[170%] text-[rgba(2,8,39,1)] font-inter">
            We sent a 6-digit verification code to your email
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full h-[141px] flex flex-col justify-between items-center"
        >
          <div className="w-[358px] h-[43px] flex items-center justify-between">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="
            w-[43px]
            h-[43px]
            text-center
            text-[19px]
            font-[500]
            rounded-lg
            outline-none
            bg-[rgba(217,217,217,1)]
            font-inter
          "
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={!isOtpComplete || isVerifying}
            className={`w-full h-[41px]  text-center rounded-[6px] text-[16px] font-inter cursor-pointer transition  ${
              isOtpComplete
                ? "bg-[#1C5ADF] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            // onClick={handleSubmit}
          >
            Verify
          </button>

          <h3 className="text-[14px] font-normal text-[rgba(2,8,39,1)] text-center">
            Didn't get a code?
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`ml-1
              ${
                canResend
                  ? "text-[#1C5ADF] cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              {canResend ? "Resend" : `Resend in ${timeLeft}s`}
            </button>
          </h3>
        </form>
      </div>
    </>
  );
};

export default Otp;
