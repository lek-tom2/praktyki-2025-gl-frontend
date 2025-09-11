"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import useTranslation from "@/lang/useTranslation";

const NavbarTemplate = () => {
  const { t } = useTranslation();

  // logged user
  if (false) {
    return (
      <nav className="bg-secondary h-16 w-full flex flex-row items-center justify-start text-neutral px-6">
        {/* Logo */}
        <div className="relative w-20 h-6 ml-20">
          <Image src={"/logo.png"} fill alt="GlobalPark" />
        </div>

        {/* Center links */}
        <ul className="flex flex-row gap-6 flex-1 justify-center">
          <li>
            <Link href={"#"} className="hover:underline">
              {t("loggedNavbar.findParking")}
            </Link>
          </li>
          <li>
            <Link href={"#"} className="hover:underline">
              {t("loggedNavbar.contact")}
            </Link>
          </li>
        </ul>

        <div className="rounded-4xl">
          <label className="input flex items-center gap-2 h-8 rounded-4xl">
            {/*future searchbox*/}
            <input
              type="text"
              placeholder={t("loggedNavbar.search")}
              className="grow"
            />
          </label>
        </div>
        <div className="mr-20">
          <div className="avatar relative w-8 h-8 bg-gray-300 rounded-full ml-6">
            <Image src={"/defaultUser.png"} fill={true} alt={"G"}></Image>
          </div>
        </div>
      </nav>
    );
  }

  // unlogged user
  return (
    <nav className="bg-secondary h-16 w-full flex flex-row items-center justify-start text-neutral px-6">
      {/* Logo */}
      <div className="relative w-20 h-6 ml-30 mr-auto">
        <Image src={"/logo.png"} fill alt="GlobalPark" />
      </div>

      <div className="flex flex-row items-center justify-between w-[12vw] mr-30 ml-auto text-[12px] ">
        <Link
          href="login-register"
          className="flex items-center font-semibold justify-center rounded-4xl mr-5 w-[120px] text-center h-8 bg-base-300 ml-[-1rem] min-w-6 hover:scale-105 duration-300"
        >
          {t("unloggedNavbar.login")}
        </Link>
        <Link
          href="login-register"
          className="flex items-center font-semibold justify-center rounded-4xl w-[120px] text-center h-8 bg-base-300 min-w-6 hover:scale-105 duration-300"
        >
          {t("unloggedNavbar.signUp")}
        </Link>
      </div>
      <LanguageSwitcher />
    </nav>
  );
};

export default NavbarTemplate;
