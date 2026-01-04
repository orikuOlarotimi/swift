"use client"
import React, {useState} from 'react'

const forms = () => {
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [bio, setBio] = useState("");
  return (
    <form className="flex flex-col w-full h-full justify-around">
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
            className="w-full h-[43px] bg-[#F2F5FB] rounded-[6px] font-inter pl-[20px] focus:outline-none"
            placeholder="Enter your username"
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
            className="w-full h-[43px] bg-[#F2F5FB] rounded-[6px] font-inter pl-[20px] focus:outline-none"
            placeholder="Enter your email"
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
          placeholder="Tell us a little about yourself..."
        ></textarea>
      </div>

      {/* Submit Button */}
      {/* <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-md 
                   hover:bg-blue-700 transition-all"
      >
        Submit
      </button> */}
      <hr className="w-full bg-[#E5E5E5]"></hr>
    </form>
  );
}

export default forms