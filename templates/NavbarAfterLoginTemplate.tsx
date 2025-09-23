import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconWithPopup from "@/components/account-popup/acc-popup";
import useUserContext from "@/gl-context/UserContextProvider";

const NavbarAfterLoginTemplate = () => {
  const { User } = useUserContext();
  const userName = User?.username || User?.email || "User";

  return (
  <nav className="bg-secondary h-16 w-full flex flex-row items-center justify-between text-neutral px-6">
  <div className="relative w-24 h-8 ml-16">
        <Image src={"/logo.png"} fill alt="GlobalPark" />
      </div>

  <ul className="flex flex-row gap-8 flex-1 justify-center">
        <li>
          <Link href="/parking-spaces" className="hover:underline font-semibold text-lg">
            Find Parking
          </Link>
        </li>
        <li>
          <span className="font-semibold text-lg cursor-pointer opacity-70">Contact</span>
        </li>
      </ul>

      <div className="flex flex-row items-center gap-4 mr-16 mb-3
      ">
        <div style={{ display: 'flex', alignItems: 'flex-start', height: '40px', marginTop: '-10px' }}>
          <IconWithPopup />
        </div>
        <span className="text-base mt-4 font-semibold">Hello, {userName}</span>
      </div>
    </nav>
  );
};

export default NavbarAfterLoginTemplate;
