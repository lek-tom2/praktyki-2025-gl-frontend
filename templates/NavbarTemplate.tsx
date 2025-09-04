import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavbarTemplate = () => {
  // logged user
  if (false) {
    return (
      <nav className="bg-primary h-12 w-full flex flex-row items-center justify-start text-neutral px-6">
        {/* Logo */}
        <div className="relative w-20 h-6 ml-20">
          <Image src={"/logo.png"} fill alt="GlobalPark" />
        </div>

        {/* Center links */}
        <ul className="flex flex-row gap-6 flex-1 justify-center">
          <li>
            <Link href={"#"} className="hover:underline">
              Find Parking
            </Link>
          </li>
          <li>
            <Link href={"#"} className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>

        <div className="rounded-4xl">
          <label className="input flex items-center gap-2 h-8 rounded-4xl">
            <input type="text" placeholder="Search..." className="grow" />
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
    <nav className="bg-primary h-12 w-full flex flex-row items-center justify-start text-neutral px-6">
      {/* Logo */}
      <div className="relative w-20 h-6 ml-30 mr-auto">
        <Image src={"/logo.png"} fill alt="GlobalPark" />
      </div>

      <div className="flex flex-row items-center justify-between w-[10vw] mr-30 ml-auto ">
        <Link
          href="/auth/login"
          className="btn rounded-4xl w-[50%] text-center h-8 bg-accent ml-[-1rem] min-w-6"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="btn rounded-4xl w-[50%] text-center h-8 bg-accent min-w-6 "
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default NavbarTemplate;
