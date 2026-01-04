import { create } from "zustand";

export type AuthStatus =
   "loading"
  | "authenticated"
  | "unauthenticated"

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  image: string;
  bio: string;
}

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;

  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",

  setUser: (user) =>
    set({
      user,
      status: "authenticated",
    }),

  clearUser: () =>
    set({
      user: null,
      status: "unauthenticated",
    }),

  setStatus: (status) =>
    set({
      status,
    }),
}));
