"use client";

import React from 'react'
import { useState } from 'react';
import PageTemplate from '../../templates/PageTemplate'

export default function LoginRegister() {
  const [active, setActive] = useState("login");

    return (
          <PageTemplate>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px-80px)]">
        <section className="w-[25%] h-[50%] bg-[#333446] rounded-xl shadow-lg p-6 flex flex-col justify-center">
          <div className="flex justify-center gap-14 mb-6">
            <button
              onClick={() => setActive("login")}
              className={`text-m mb-6 transition ${
                active === "login"
                  ? "text-white font-bold border-b-2 border-white pb-1"
                  : "text-[#7F8CAA] hover:text-[#B8CFCE]"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActive("register")}
              className={`text-m mb-6 transition ${
                active === "register"
                  ? "text-white font-bold border-b-2 border-white pb-1"
                  : "text-[#7F8CAA] hover:text-[#B8CFCE]"
              }`}
            >
              Register
            </button>
          </div>
          <div className="text-left text-[#5D657E] flex flex-col gap-4">
  {active === "login" ? (
    <>
      <div>
        <p>Username</p>
        <input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="text"
        />
      </div>

      <div>
        <p>Password</p>
        <input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="password"
        />
      </div>

      <section className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <input type="checkbox" className='relative -top-0.5'/>
          <p>Remember me</p>
        </div>
        <a href="#" className="hover:underline text-white p-2 transition-transform duration-200 hover:scale-105">
          Forgot your password?
        </a>
      </section>

      <button className="mx-auto rounded-md flex justify-center w-[80%] text-[#ffffff] bg-[#595C8B] hover:text-white p-2 transition-transform duration-200 hover:scale-105">
        Login
      </button>
    </>
  ) : (
    <>
      <div>
        <p>Username</p>
        <input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="text"
        />
      </div>

      <div>
        <p>Full name</p>
        <input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="text"
        />
      </div>

      <div>
        <p>Password</p>
        <input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="password"
        />
      </div>

      <div>
        <p>Repeat password</p>
        <input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="password"
        />
        </div><br />
        <button className="mx-auto rounded-md flex justify-center w-[80%] text-[#ffffff] bg-[#595C8B] hover:text-white p-2 transition-transform duration-200 hover:scale-105">
        Login
      </button>
      </>
    )}
  </div>

        </section>
      </div>
    </PageTemplate>
        
    )

}
