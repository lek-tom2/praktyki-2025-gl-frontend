import React from "react";
import useTranslation from "@/lang/useTranslation";

const FooterTemplate = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-info text-neutral h-12 flex items-center justify-center mt-auto w-full">
      <p>
        ©{new Date().getFullYear()} GlobalPark. {t("footer.copyright")}
      </p>
    </footer>
  );
};

export default FooterTemplate;
