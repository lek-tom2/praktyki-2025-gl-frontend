"use client";

import Languages from "@/gl-const/languages";
import Themes from "@/gl-const/themes";
import { User as UserEntityType } from "@/gl-types/user-types";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

type UserContextProviderProps = {
  children: ReactNode;
};

type UserAction =
  | {
      type: "setUsername";
      value: string | null;
    }
  | {
      type: "setTheme";
      value: string;
    }
  | {
      type: "setProfilePicture";
      value: string | null;
    }
  | {
      type: "setEmail";
      value: string | null;
    }
  | {
      type: "setId";
      value: string | null;
    }
  | {
      type: "setLanguageIso2";
      value: string;
    }
  | {
      type: "setUser";
      value: UserEntityType;
    };

const UserReducer = (
  state: UserEntityType,
  action: UserAction
): UserEntityType => {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.value };
    case "setTheme":
      return { ...state, theme: action.value };
    case "setProfilePicture":
      return { ...state, profilePicture: action.value };
    case "setEmail":
      return { ...state, email: action.value };
    case "setId":
      return { ...state, userId: action.value };
    case "setLanguageIso2":
      return { ...state, languageIso2: action.value };
    case "setUser":
      return { ...action.value };
    default:
      return state;
  }
};

type UserContextType = {
  User: UserEntityType;
  UserDispatch: React.Dispatch<UserAction>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const initialUser: UserEntityType = {
    username: null,
    email: null,
    profilePicture: null,
    theme: Themes.glLight,
    userId: null,
    accountVerified: null,
    passwordLength: null,
    authorities: null,
    accountNonLocked: null,
    token: null,
    languageIso2: Languages.en,
    is_active: false,
    is_staff: false,
    phone_number: null,
    full_name: null,
  };
  const [User, UserDispatch] = useReducer(UserReducer, initialUser);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    UserDispatch({
      type: "setTheme",
      value: prefersDark ? Themes.glDark : Themes.glLight,
    });
  }, []);

  return (
    <UserContext.Provider value={{ User, UserDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("User context musnt be null");
  return context;
}
