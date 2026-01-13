"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/utils/store/Auth";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UpdateProfilePayload {
  username?: string;
  email?: string;
  bio?: string;
}

const updateProfile = async (data: UpdateProfilePayload) => {
  const formData = new FormData();

  if (data.username) formData.append("username", data.username);
  if (data.email) formData.append("email", data.email);
  if (data.bio) formData.append("bio", data.bio);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/update`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (!res.data?.success) {
    throw new Error(res.data?.message || "Profile update failed");
  }

  return res.data;
};

const forms = () => {
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username && !email && !bio) {
      toast.error("Please update at least one field");
      return;
    }

    try {
      setLoading(true);

      const [updateRes, meRes] = await Promise.all([
        updateProfile({
          username: username || undefined,
          email: email || undefined,
          bio: bio || undefined,
        }),

        axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/me`,
          {},
          {
            withCredentials: true
          }
        ),
      ]);

      if (!updateRes?.success) {
        console.log(updateRes)
        throw new Error("Profile update failed");
      }

      if (!meRes.data?.success || !meRes.data?.data) {
        throw new Error("Unable to refresh user session");
      }
      setUser(meRes.data.data);
      toast.success("Profile updated successfully");

      // optional: clear fields
      setUsername("");
      setEmail("");
      setBio("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full h-full justify-around items-end"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between h-[70px] w-full">
        <div className="flex flex-col items-start justify-between h-full w-[610px]">
          <label
            htmlFor="username"
            className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827]"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-[43px] bg-[#F2F5FB] rounded-[6px] font-inter pl-[20px] focus:outline-none placeholder-[#020827]"
            placeholder={user?.username || "Enter your username"}
          />
        </div>

        <div className="flex flex-col items-start justify-between h-full w-[610px]">
          <label
            htmlFor="email"
            className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[43px] bg-[#F2F5FB] rounded-[6px] font-inter pl-[20px] focus:outline-none placeholder-[#020827]"
            placeholder={user?.email || "Enter your email"}
          />
        </div>
      </div>

      <div className="flex flex-col  h-[127px] w-full items-start justify-between w-full">
        <label
          htmlFor="bio"
          className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827]"
        >
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="h-[100px] rounded-[6px] bg-[#F2F5FB] font-inter pl-[20px] pt-[10px] w-full focus:outline-none"
          placeholder={user?.bio || "Tell us a little about yourself..."}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-[200px] h-[44px] rounded-[6px] bg-[#1C5ADF] text-white cursor-pointer font-inter
        ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
      <hr className="w-full bg-[#E5E5E5]"></hr>
    </form>
  );
};

export default forms;
