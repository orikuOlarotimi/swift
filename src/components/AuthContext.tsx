"use client";
import { createContext, useContext, useState } from "react";

type AuthStatus = "unauthenticated" | "otp_pending" | "authenticated";

type AuthContextType = {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("unauthenticated");

  return (
    <AuthContext.Provider value={{ status, setStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
