"use client";

import { useModal } from "../app/hooks/useModal";
import { useEffect } from "react";
import LoginScreen from "./LoginForm";
import SignupScreen from "./SignupForm";
import ForgotPasswordScreen from "./ForgotPassword";
import Otp from "./Otp";
import NewPassword from "./NewPassword"
import PasswordResetSuccess from "./PasswordResetSuccess";
import DeleteAccount from "./deleteAccount";
import ResetPasswordVerification from "./ResetPasswordVerification"
import { RxCross1 } from "react-icons/rx";

export default function AppModal() {
  const { isOpen, closeModal, view } = useModal();

   useEffect(() => {
     if (isOpen) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "auto";
     }

     // cleanup on unmount
     return () => {
       document.body.style.overflow = "auto";
     };
   }, [isOpen]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  if (!isOpen) return null; // Modal is closed

  // Handler to pick which component to show
  const renderContent = () => {
    switch (view) {
      case "login":
        return <LoginScreen />;
      case "signup":
        return <SignupScreen />;
      case "forgot-password":
        return <ForgotPasswordScreen />;
      case "otp-verification":
        return <Otp />;
      case "reset-password-verification":
        return <ResetPasswordVerification />;
      case "new-password":
        return <NewPassword />;
      case "password-reset-success":
        return <PasswordResetSuccess />;
      case "delete-account":
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={closeModal} />
      <div
        className="
        relative 
        bg-white 
        rounded-[6px] 
        w-[90%] 
        max-w-[680px] 
        transition-all 
        duration-300 
        ease-in-out
        flex
        flex-col
        justify-center
        items-center
        py-[50px]
      "
      >
        <button
          onClick={closeModal}
          className="absolute top-[20px] right-[20px] text-[#020827] hover:text-gray-700 h-[14px] w-[14px] cursor-pointer"
        >
          <RxCross1 size={22} />
        </button>
        {renderContent()}
      </div>
    </div>
  );
}
