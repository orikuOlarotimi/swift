"use client";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { useModal } from "@/app/hooks/useModal";
// import { setTokens } from "../lib/authTokens";
import LoadingOverlay from "@/components/LoadingOverlay";
import toast from "react-hot-toast";
import { setAuthFlowEmail } from "@/utils/authFlowEmail";


const usernameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export default function SignupForm() {
  const { setView } = useModal();
  // const { setStatus } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    agree: false,
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const isUsernameValid =
    trimmedUsername.length >= 4 &&
    trimmedUsername.length <= 20 &&
    usernameRegex.test(trimmedUsername);

  const isEmailValid = emailRegex.test(trimmedEmail);

  const isPasswordValid = password.length >= 6 && password.length <= 20;

  // ---- Validation ----
  const usernameError =
    trimmedUsername.length === 0
      ? "Username is required"
      : trimmedUsername.length < 4
      ? "Username must be at least 4 characters"
      : !usernameRegex.test(trimmedUsername)
      ? "Only letters, numbers, and underscores allowed"
      : null;

  const emailError =
    trimmedEmail.length === 0
      ? "Email is required"
      : !emailRegex.test(trimmedEmail)
      ? "Enter a valid email address"
      : null;

  const passwordError =
    password.length === 0
      ? "Password is required"
      : password.length < 6
      ? "Password must be at least 6 characters"
      : null;

  const agreeError = !agree ? "You must accept the terms" : null;

  const isFormValid =
    isUsernameValid && isEmailValid && isPasswordValid && agree;
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const controller = new AbortController();

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      controller.abort();
      setIsLoading(false);
      toast.error("Request timed out. Please try again.");
    }, 15000);
     if (isLoading) return;
    
     setTouched({
       username: true,
       email: true,
       password: true,
       agree: true,
     });
    if (!isFormValid) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", trimmedUsername);
    formData.append("email", trimmedEmail);
    formData.append("password", password);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        body: formData,
        credentials: "include",
        signal: controller.signal,
      });
      const data = await res.json();

      if (!res.ok || data.success !== true) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success(
        "Account created successfully 🎉 an OTP was sent to your email",
        {
          className: "font-inter text-[14px] text-[#020827] font-normal",
        }
      );
      setAuthFlowEmail(trimmedEmail)
      setView("otp-verification");
      setUsername("");
      setEmail("");
      setPassword("");
      setAgree(false);
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay open={isLoading} />
      <div className="flex flex-col space-y-4  h-[555px]  w-[395px] justify-between">
        <form
          className="flex flex-col space-y-4 justify-between h-[429px]  m-[0]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[34px] leading-[1.0] font-semibold text-center mb-[30px] font-inter">
            Join <span className="text-blue-500">Swift.</span>
          </h2>

          <div className="relative h-[70px] flex flex-col justify-between m-0">
            <h2 className="font-normal text-[16px] leading-[1.0] text-[#020827] not-italic font-inter">
              Username
            </h2>
            <input
              type="text"
              placeholder="e.g., janedoe"
              value={username}
              required
              minLength={4}
              maxLength={20}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched({ ...touched, username: true })}
              onFocus={() => setTouched({ ...touched, username: false })}
              className="w-full rounded-[6px] pl-[20px] focus:outline-none text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px] font-inter"
            />
            {touched.username && usernameError && (
              <span className="absolute -bottom-5 text-xs text-red-500 z-[50]">
                {usernameError}
              </span>
            )}
          </div>

          <div className="relative h-[70px] flex flex-col justify-between m-[0]">
            <h2
              style={{ fontFamily: "var(--font-inter)" }}
              className="font-normal text-[16px] leading-[1.0] text-[#020827] non-italic"
            >
              {" "}
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
              className="w-full  rounded-[6px] pl-[20px] focus:outline-none  text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px]"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            {touched.email && emailError && (
              <span className="absolute -bottom-5 text-[12px] font-inter text-red-500 z-[50]">
                {emailError}
              </span>
            )}
          </div>

          <div className="relative h-[70px] flex flex-col justify-between m-[0]">
            <h2 className="font-normal text-[16px] leading-[1.0] text-[#020827] font-inter">
              Password
            </h2>
            <div className="flex items-center justify-between bg-[#F2F5FB] rounded-[6px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="8+ characters required"
                value={password}
                required
                minLength={6}
                maxLength={20}
                onBlur={() => setTouched({ ...touched, password: true })}
                onFocus={() => setTouched({ ...touched, password: false })}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  rounded-[6px] pl-[20px] focus:outline-none  text-[#717680] text-[16px] bg-[#f2f5fb] h-[43px] font-inter font-normal"
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
            {touched.password && passwordError && (
              <span className="absolute -bottom-5 text-[12px] text-red-500 z-[50] font-inter">
                {passwordError}
              </span>
            )}
          </div>

          <div className="relative flex items-center space-x-2 text-[14px]  h-[17px] justify-start text-[#020827] m-[0] font-inter">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onBlur={() => setTouched({ ...touched, agree: true })}
              onChange={() => setAgree(!agree)}
              className="h-[17px] w-[17px] accent-[#1c5adf] bg-[#F2F5FB] border border-gray-400"
            />
            <label htmlFor="terms" className="text-[#020827] font-inter">
              I agree to the{" "}
              <span className="text-[#1C5ADF] cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#1C5ADF] cursor-pointer">
                Privacy Policy
              </span>
            </label>
            {touched.agree && agreeError && (
              <span className="absolute -bottom-5 left-0 text-[12px] text-red-500 z-[50] font-inter">
                {agreeError}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full h-[41px] text-[16px] rounded-[6px] transition font-inter
    ${
      isFormValid
        ? "bg-[#1c5adf] text-white hover:bg-blue-700 cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }

  `}
          >
            Create Account
          </button>
        </form>

        <div className="h-[113px] flex flex-col justify-between">
          <div className="flex items-center m-[0]">
            <div className="flex-grow border-t border-[#e5e5e5]"></div>
            <span
              className="px-2 text-[#717680] text-[14px] not-italic"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              or
            </span>
            <div className="flex-grow border-t border-[#e5e5e5]"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-[#e5e5e5] rounded-[6px]  cursor-pointer hover:bg-gray-100 h-[41px] text-[#000000]  text-[16px] font-normal font-inter">
            <BsGoogle size={16} />
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[14px] font-inter">
            <span className="text-[#717680] font-normal">
              Already have an account?{" "}
            </span>
            <button
              type="button"
              className="text-[#1C5ADF] cursor-pointer"
              onClick={() => setView("login")}
              // onClick={onSwitchToLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
