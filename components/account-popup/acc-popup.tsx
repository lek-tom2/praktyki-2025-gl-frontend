"use client";


import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../logoutButton/LogoutButton";
import Themes from "@/gl-const/themes";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

export default function IconWithPopup() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-1">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-6 rounded-full overflow-hidden"
      >
        <img
          src="/people.png"
          alt="icon"
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 w-64 bg-secondary shadow-lg rounded-lg z-50"
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
