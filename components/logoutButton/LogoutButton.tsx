import React from "react";
import useUserContext from "@/gl-context/UserContextProvider";
import Themes from "@/gl-const/themes";
import { useRouter } from "next/navigation";
import Button from "../button";
import Languages from "@/gl-const/languages";

const LogoutButton = () => {
  const { User, UserDispatch } = useUserContext();
  const router = useRouter();

  const logout = () => {
    UserDispatch({
      type: "setUser",
      value: {
        username: null,
        profilePicture: null,
        theme: Themes.glLight,
        userId: null,
        email: null,
        accountVerified: null,
        passwordLength: null,
        authorities: null,
        accountNonLocked: null,
        token: null,
        languageIso2: Languages.en,
      },
    });
    localStorage.clear();
  };
  return (
    <Button
      type="button"
      name="logout"
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      onClick={() => {
        logout();
        router.push("/login-register");
      }}
      value="Logout"
    />
  );
};

export default LogoutButton;
