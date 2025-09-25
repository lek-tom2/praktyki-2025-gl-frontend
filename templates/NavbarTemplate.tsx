"use client";

import IconWithPopup from "@/components/account-popup/acc-popup";
import Logo from "@/components/logo/logo";
import useUserContext from "@/gl-context/UserContextProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeSwitcher from "@/components/themeSwitcher/ThemeSwitcher";

const NavbarTemplate = () => {
  // logged user
  const { User } = useUserContext();

  if (User.userId !== null) {
    return (
      <nav className="bg-secondary h-16 w-full flex flex-row items-center justify-start text-neutral px-6">
        {/* Logo */}
        {/* <div className="relative w-20 h-6 ml-20">
          <Image src={"/logo.png"} fill alt="GlobalPark" />
        </div> */}

        <div className="ml-30 flex items-center justify-center">
          <Logo />
        </div>
        {/* Center links */}
        <ul className="flex flex-row gap-6 flex-1 justify-center">
          <li>
            <Link href={"/home"} className="hover:underline">
              Find Parking
            </Link>
          </li>
          <li>
            <Link href={"/my-reservations"} className="hover:underline">
              My Reservations
            </Link>
          </li>
        </ul>

        <div className="rounded-4xl">
          {/* <label className="input flex items-center gap-2 h-8 rounded-4xl"> */}
          {/*future searchbox*/}
          {/* <input type="text" placeholder="Search..." className="grow" /> */}
          {/* </label> */}
        </div>
        <div className="mr-20 flex flex-row gap-4 items-center ml-10 pl-6 pr-6 pt-2 pb-2 bg-primary rounded-4xl">
          <ThemeSwitcher />
          {User.username}
          {/* <div className="avatar relative w-8 h-8 bg-primary rounded-full ml-6">
            <Image src={"/defaultUser.png"} fill={true} alt={"G"}></Image>
          </div> */}
          <IconWithPopup />
        </div>
      </nav>
    );
  }

  // unlogged user
  return (
    <nav className="bg-secondary h-16 w-full flex flex-row items-center justify-start text-neutral px-6">
      {/* Logo */}
      {/* <div className="relative w-20 h-6 ml-30 mr-auto">
        <Image src={"/logo.png"} fill alt="GlobalPark" />
      </div> */}
      <div className="ml-30 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex flex-row items-center justify-between min-w-30 w-[9vw] mr-30 ml-auto text-[12px] ">
        <Link
          href="login-register"
          className="flex items-center font-semibold justify-center rounded-4xl w-[50%] text-accent-content  h-8 bg-accent ml-[-1rem] min-w-6 hover:scale-105 duration-300"
        >
          Login
        </Link>
        <Link
          href="login-register"
          className="flex items-center font-semibold justify-center rounded-4xl w-[50%] text-center text-accent-content h-8 bg-accent min-w-6 hover:scale-105 duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default NavbarTemplate;
