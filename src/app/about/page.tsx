"use client"
import React from 'react'

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

  
  return (
    <div>about
      <button type='button' onClick={handleSubmit}>
        click me
      </button>
    </div>
  )
}

export default page