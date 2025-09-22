"use client";
import Languages from "./gl-const/languages";
import Themes from "./gl-const/themes";
import useUserContext from "./gl-context/UserContextProvider";

const logout = () => {
  const { User, UserDispatch } = useUserContext();
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
      vechicles: null,
    },
  });
  localStorage.clear();
};

export default logout;

// czy cos jeszcze trzeba do backendu wysłac? moze ciastka?
