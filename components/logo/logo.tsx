import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/home"}
      className="flex flex-row items-center justify-center h-12 text-2xl"
    >
      <div className="text-white">Global</div>
      <div className="text-[#f37037]">Park</div>
    </Link>
  );
};

export default Logo;
