"use client";

import Themes from "@/gl-const/themes";
import useUserContext from "@/gl-context/UserContextProvider";
import Image from "next/image";

const ThemeSwitcher = () => {
  const { User, UserDispatch } = useUserContext();

  const changeTheme = () => {
    console.log(User);
    console.log(User.theme);
    if (User.theme === Themes.glDark)
      UserDispatch({
        type: "setTheme",
        value: Themes.glLight,
      });
    else if (User.theme === Themes.glLight)
      UserDispatch({ type: "setTheme", value: Themes.glDark });

    console.log("clik");
  };

  return (
    <div
      className={`rounded-2xl w-22 h-10 cursor-pointer transition-colors duration-500 bg-primary flex items-center relative`}
      onClick={changeTheme}
    >
      <div
        className={`absolute transform transition-transform duration-500 ${
          User.theme === Themes.glDark
            ? "translate-x-1"
            : "translate-x-[2.5rem]"
        }`}
      >
        <Image
          src={User.theme === Themes.glDark ? "/moon.png" : "/sun.png"}
          alt="theme"
          width={32}
          height={32}
          className="mr-1 ml-1"
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
