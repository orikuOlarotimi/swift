
"use client";

import { createContext } from "react";

export type ModalView =
  | "login"
  | "signup"
  | "forgot-password"
  | "none"
  | "otp-verification"
  | "new-password"
  | "password-reset-success"
  | "delete-account"
  | "reset-password-verification";

interface ModalContextType {
  isOpen: boolean;
  view: ModalView;
  openModal: (view: ModalView) => void;
  closeModal: () => void;
  setView: (view: ModalView) => void;
}

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  view: "none",
  openModal: () => {},
  closeModal: () => {},
  setView: () => {},
});
