"use client"
import React, { useState } from 'react'
import LocalLoadr from "@/components/LocalLoader";

const page = () => {

  const handleSubmit = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const res = await fetch(`${API_BASE_URL}/profile/me`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    console.log(data)

    
  }

  const ready = true
  return (
    <div>
      about
      <button type="button" onClick={handleSubmit}>
        click me
      </button>
      <div className="w-[900px] h-[800px] border border-black relative">
        <LocalLoadr open={ready} />
      </div>
    </div>
  );
}

export default page