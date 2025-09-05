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
          {/* Zakładki */}
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
          <div className="text-center text-[#5D657E] text-left">
            {active === "login" ? (
              <><p>username</p><input className='rounded-md bg-[#374151]' type='text'></input><br /><br /><p>password</p><input className='rounded-md bg-[#374151]' type='text'></input></>
            ) : (
              <p>reg</p>
            )}
          </div>
        </section>
      </div>
    </PageTemplate>
        
    )

}
