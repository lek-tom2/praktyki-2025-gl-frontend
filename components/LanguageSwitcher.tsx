"use client";
import useUserContext from "@/gl-context/UserContextProvider";
import Image from "next/image";

export default function LanguageSwitcher() {
  const { User, UserDispatch } = useUserContext();

  const handleChange = (lang: string) => {
    UserDispatch({ type: "setLanguageIso2", value: lang });
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => handleChange("pl")} aria-label="Polski">
        <Image src="/pl.png" alt="Polski" width={32} height={24} />
      </button>
      <button onClick={() => handleChange("en")} aria-label="English">
        <Image src="/en.png" alt="English" width={32} height={24} />
      </button>
    </div>
  );
}