"use client";

import React, { useState } from "react";

export default function IconWithPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    // jeśli kliknięcie nie jest na popupie ani na ikonce, zamknij popup
    if (!target.closest("#popup") && !target.closest("#icon-btn")) {
      setIsOpen(false);
    }
  };

  return (
    <div onClick={handleClickOutside}>
      {/* Ikonka */}
      <div className="flex justify-end mr-[15%] mt-4">
        <button id="icon-btn" onClick={() => setIsOpen(!isOpen)}>
          <img src="/people.png" alt="icon" className="w-8 h-8" />
        </button>
      </div>

      {/* Popup */}
      {isOpen && (
        <div
          id="popup"
          className="fixed top-[64px] right-0 mr-[15%] z-50 flex justify-end"
        >
          <div className="bg-secondary bg-opacity-25 shadow-lg text-white w-64 h-auto">
            <ul className="flex flex-col gap-3 p-4">
              <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded p-1">
                <img src="/setting.png" alt="account" className="w-5 h-5" />
                <span>Account Management</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded p-1">
                <img src="/change.png" alt="switch" className="w-5 h-5" />
                <span>Switch Accounts</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded p-1">
                <img src="/night-mode.png" alt="theme" className="w-5 h-5" />
                <span>Change Theme</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded p-1">
                <img src="/booking.png" alt="reservations" className="w-5 h-5" />
                <span>My Reservations</span>
              </li>
            </ul>

            <div className="flex justify-center p-4 border-t border-gray-700">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

