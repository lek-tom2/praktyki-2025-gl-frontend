import React, { ReactNode } from "react";
import NavbarTemplate from "./NavbarTemplate";
import FooterTemplate from "./FooterTemplate";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className="flex flex-col bg-primary w-[100vw] h-[100vh]">
      <NavbarTemplate />
      <main className="flex-1 bg-primary">{children}</main>
      <FooterTemplate />
    </div>
  );
};

export default PageTemplate;
