"use server";
import PageTemplate from "@/templates/PageTemplate";
import Welcome from "@/pages/Welcome";
import ThemeSwitcher from "@/components/themeSwitcher/ThemeSwitcher";

export default async function Home() {
  return (
    <PageTemplate>
      <ThemeSwitcher />
    </PageTemplate>
  );
}
