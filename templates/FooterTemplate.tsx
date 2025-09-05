import React, { ReactNode } from "react";

const FooterTemplate = () => {
  return (
    <footer className="footer bg-info text-neutral h-12 flex items-center justify-center mt-auto w-full">
      <p>©{new Date().getFullYear()} GlobalPark. All rights reserved.</p>
    </footer>
  );
};

export default FooterTemplate;
