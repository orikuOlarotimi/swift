"use client";

import { useState, ReactNode } from "react";
import { ModalContext, ModalView } from "./ModalContext";

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ModalView>("none");

  const openModal = (newView: ModalView) => {
    setView(newView);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setView("none");
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        view,
        openModal,
        closeModal,
        setView,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
