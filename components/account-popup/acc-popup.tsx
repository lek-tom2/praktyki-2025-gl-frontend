"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import logout from "@/logout";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

export default function IconWithPopup() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (!target.closest("#popup") && !target.closest("#icon-btn")) {
      setIsOpen(false);
    }
  };

  return (
    <div onClick={handleClickOutside}>

      <div className="flex justify-end mr-[15%] mt-4">
        <button id="icon-btn" onClick={() => setIsOpen(!isOpen)}>
          <img src="/people.png" alt="icon" className="w-8 h-8" />
        </button>
      </div>


      {isOpen && (
        <div
          id="popup"
          className="fixed top-[64px] right-0 mr-[15%] z-50 flex justify-end"
        >
          <div className="bg-secondary bg-opacity-25 shadow-lg text-white w-64 h-auto">
            <ul className="flex flex-col gap-3 p-4">
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded p-1"
                onClick={() => router.push("/account")}
              >
                <img src="/setting.png" alt="account" className="w-5 h-5" />
                <span>Account Management</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded p-1">
                <img src="/change.png" alt="switch" className="w-5 h-5" />
                <span>Switch Accounts</span>
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded p-1"
                onClick={() => router.push("/my-reserved-parking-space")}
              >
                <img src="/booking.png" alt="reservations" className="w-5 h-5" />
                <span>My Reservations</span>
              </li>
            </ul>

            <div className="flex justify-center items-center gap-4 p-4 border-t border-gray-700">
              <ThemeSwitcher />
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  logout();
                  router.push("/login-register");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}