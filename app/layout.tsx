import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/gl-context/UserContextProvider";
import { Toaster } from "react-hot-toast";
import ClientAuthChecker from "@/ClientAuthChecker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GlobalPark",
  description: "Easily manage your parking in GlobalLogic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${publicSans.variable} antialiased`}
      >
        <UserContextProvider>
          <ClientAuthChecker>{children}</ClientAuthChecker>
          <Toaster position="top-center" />
        </UserContextProvider>
      </body>
    </html>
  );
}
