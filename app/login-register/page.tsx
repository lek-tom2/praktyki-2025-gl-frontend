"use client";

import React from "react";
import { useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import LoginComponent from "@/components/login/loginComponent";
import RegisterComponent from "@/components/register/registerComponent";
import useTranslation from "@/lang/useTranslation";

export default function LoginRegister() {
  const [active, setActive] = useState<"login" | "register">("login");
  const { t } = useTranslation();

  return (
    <PageTemplate>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px-80px)]">
        <section className="w-[25%] h-[50%] bg-[#333446] rounded-xl shadow-lg p-6 flex flex-col justify-center">
          <div className="flex justify-center gap-14 mb-6">
            <button
              onClick={() => setActive("login")}
              className={`text-m mb-6 transition ${
                active === "login"
                  ? "text-white font-bold border-b-2 border-white pb-1"
                  : "text-[#7F8CAA] hover:text-[#B8CFCE]"
              }`}
            >
              {t("login.login")}
            </button>
            <button
              onClick={() => setActive("register")}
              className={`text-m mb-6 transition ${
                active === "register"
                  ? "text-white font-bold border-b-2 border-white pb-1"
                  : "text-[#7F8CAA] hover:text-[#B8CFCE]"
              }`}
            >
              {t("register.register")}
            </button>
          </div>
          <div className="text-left text-[#5D657E] flex flex-col gap-4">
            {active === "login" ? <LoginComponent /> : <RegisterComponent />}
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}
