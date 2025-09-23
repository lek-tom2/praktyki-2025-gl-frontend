"use client";
import React, { ReactNode } from "react";
import NavbarAfterLoginTemplate from "./NavbarAfterLoginTemplate";
import FooterTemplate from "./FooterTemplate";
import useUserContext from "@/gl-context/UserContextProvider";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplateAfterLogin = ({ children }: PageTemplateProps) => {
  const { User } = useUserContext();

  return (
    <div
      className="flex flex-col bg-primary w-[100vw] h-[100vh] overflow-x-hidden overflow-y-auto"
      data-theme={User.theme}
    >
      <NavbarAfterLoginTemplate />
      <main className=" bg-primary flex flex-col h-[calc(100vh-64px-48px)] overflow-y-auto">
        {children}
      </main>
      <FooterTemplate />
    </div>
  );
};

export default PageTemplateAfterLogin;
