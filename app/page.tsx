"use client";
import useTranslation from "@/lang/useTranslation";
import PageTemplate from "@/templates/PageTemplate";
import Welcome from "@/pages/Welcome";

export default function Home() {
  const { t } = useTranslation();

  return (
    <PageTemplate>
      <Welcome/>
    </PageTemplate>
  );
}
