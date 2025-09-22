"use client";
import React, { ReactNode } from "react";
import NavbarTemplate from "./NavbarTemplate";
import FooterTemplate from "./FooterTemplate";
import useUserContext from "@/gl-context/UserContextProvider";
import ClientAuthChecker from "@/ClientAuthChecker";

type PageTemplateProps = {
  children: ReactNode;
  performAuthorization?: boolean;
};

const PageTemplate = ({
  children,
  performAuthorization = true,
}: PageTemplateProps) => {
  const { User } = useUserContext();

  return (
    <div
      className="flex flex-col bg-primary w-[100vw] h-[100vh] overflow-x-hidden overflow-y-hidden"
      data-theme={User.theme}
    >
      <NavbarTemplate />
      <main className=" bg-primary flex flex-col h-[calc(100vh-64px-48px)]">
        <ClientAuthChecker performAuthorization={performAuthorization}>
          {children}
        </ClientAuthChecker>
      </main>
      <FooterTemplate />
    </div>
  );
};

export default PageTemplate;
