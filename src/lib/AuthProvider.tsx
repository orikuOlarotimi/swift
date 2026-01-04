"use client";
import { useEffect } from "react";
import { useAuthStore } from "../utils/store/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingOverlay from "@/components/LoadingOverlay";


export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setUser, clearUser, setStatus, status} = useAuthStore();

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000);

    const fetchUser = async () => {
      setStatus("loading");
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/me`,
          {},
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );

        if (data?.success && data?.data) {
          setUser(data.data);
        } else {
          clearUser();
        }
      } catch (error: any) {
        clearUser();
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchUser();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [setUser, clearUser, setStatus]);

  return (
    <>
      <LoadingOverlay open={status === "loading"} />
      {children}
    </>
  );
};
