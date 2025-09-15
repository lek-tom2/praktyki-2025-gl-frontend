"use client";
import React, { ReactNode } from "react";
import NavbarTemplate from "./NavbarTemplate";
import FooterTemplate from "./FooterTemplate";
import useUserContext from "@/gl-context/UserContextProvider";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  const { User } = useUserContext();

  return (
    <div
      className="flex flex-col bg-primary w-[100vw] h-[100vh]"
      data-theme={User.theme}
    >
      <NavbarTemplate />
      <main className="flex-1 bg-primary">{children}</main>
      <FooterTemplate />
    </div>
  );
};

export default PageTemplate;
