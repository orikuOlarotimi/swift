// components/LoginForm.tsx
"use client";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { useModal } from "@/app/hooks/useModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import toast from "react-hot-toast";
import { useAuthStore } from "../utils/store/Auth";


export default function LoginForm() {
  const { setView, closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const { setUser, clearUser} = useAuthStore();
  

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
   const isEmailValid = emailRegex.test(email.trim());
   const isPasswordValid = password.length >= 6 && password.length <= 20;
   const isFormValid = isEmailValid && isPasswordValid;


const handleSubmit = async(e: React.FormEvent) => {
  e.preventDefault();
  setTouched({ email: true, password: true });
  if (!isFormValid || isLoading) return;

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
    formData.append("password", password);

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: formData,
      credentials: "include",
      signal: controller.signal,
    });

    const data = await res.json();
    
    if (!res.ok || data.success !== true) {
      toast.error(data.message || "Login failed");
      return;
    }

    const meRes = await fetch(`${API_BASE_URL}/profile/me`, {
      method: "POST",
      credentials: "include",
      signal: controller.signal,
      
    });

    if (meRes.status === 401) {
        toast.error("An error occured, please try again later");
        clearUser();
        return;
    }
    
      const meData = await meRes.json();

      if (!meData.success || !meData.data) {
        toast.error("Unable to retrieve user data. Please login again.");
        clearUser();
        return;
    }
     setUser(meData.data);
     toast.success("Login successful 🎉");
     closeModal()
     setEmail("");
     setPassword("");

  } catch (err: any) {
    if (err.name === "AbortError") {
      toast.error("Network error. Please try again.");
    }
    else {
       toast.error("An error occured, Please try again.");
    }
  } finally {
    clearTimeout(timeoutId);
    setIsLoading(false);
  }
};

  return (
    <>
      <LoadingOverlay open={isLoading} />
      <div className="flex flex-col space-y-4  h-[429px] w-[395px] justify-between">
        <form
          className="flex flex-col space-y-4 justify-between h-[339px] m-[0]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[34px] leading-[1.0] font-semibold text-center mb-[30px] font-inter">
            Welcome back to <span className="text-blue-500">Swift.</span>
          </h2>

          <div className="relative flex flex-col justify-between m-[0] h-[70px]">
            <h2 className="font-normal text-[16px] leading-[1.0] text-[#020827] font-inter">
              Email
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
              onFocus={() => setTouched({ ...touched, email: false })}
              className="w-full rounded-[6px] pl-[20px] focus:outline-none text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px] font-normal font-inter"
            />
            {touched.email && !isEmailValid && (
              <span className="absolute -bottom-5 text-xs text-red-500 font-inter">
                Enter a valid email
              </span>
            )}
          </div>

          <div className=" relative flex flex-col justify-between m-[0] h-[70px]">
            <h2 className="font-normal text-[16px] leading-[1.0] text-[#020827] font-inter">
              Password
            </h2>

            <div className="flex items-center justify-between bg-[#F2F5FB] rounded-[6px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                required
                minLength={6}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
                onFocus={() => setTouched({ ...touched, password: false })}
                className="w-[350px] rounded-[6px] pl-[20px]  focus:outline-none text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px] font-normal font-inter"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-500 hover:text-[#1C5ADF] cursor-pointer  h-full w-[45px] flex justify-center items-center "
              >
                {showPassword ? (
                  <RxEyeClosed size={20} />
                ) : (
                  <RxEyeOpen size={20} />
                )}
              </button>
            </div>
            {touched.password && !isPasswordValid && (
              <span className="absolute -bottom-5 text-xs text-red-500 font-inter">
                Password must be 6-20 characters
              </span>
            )}
          </div>

          <div className="m-0 h-[17px] flex justify-end items-center">
            <button
              type="button"
              onClick={() => setView("forgot-password")}
              className="text-[rgba(28,90,223,1)] text-[14px] cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full h-[41px] text-[16px] rounded-[6px] transition font-inter ${
              isFormValid
                ? "bg-[#1c5adf] text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Sign In
          </button>
        </form>

        <div className="h-[113px] flex flex-col justify-between">
          <div className="flex items-center m-[0]">
            <div className="flex-grow border-t border-[#e5e5e5]"></div>
            <span
              className="px-2 text-[#717680] text-[14px] not-italic font-inter"
            >
              or
            </span>
            <div className="flex-grow border-t border-[#e5e5e5]"></div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-3 border border-[#e5e5e5] rounded-[6px]  cursor-pointer hover:bg-gray-100 h-[41px] text-[#000000]  text-[16px] font-normal"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <BsGoogle size={16} />
            <span>Continue with Google</span>
          </button>

          <div
            className="flex items-center justify-center gap-2 text-[14px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span className="text-[#717680] font-normal">
              Don&apos;t have an account?
            </span>
            <button
              type="button"
              onClick={() => setView("signup")}
              className="text-[#1C5ADF] cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
