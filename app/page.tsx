"use server";
import Welcome from "@/pages/Welcome";
import PageTemplate from "@/templates/PageTemplate";

export default async function Home() {
  return <Welcome></Welcome>;
}
