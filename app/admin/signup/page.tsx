"use client";

import React from "react";
import { useState } from "react";
import AdminNavbarTemplate from "@/templates/AdminNavbarTemplate";
import Input from "@/components/input/input";
import Button from "@/components/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApiLinks } from "@/gl-const/api-links";
import toast from "react-hot-toast";
import useUserContext from "@/gl-context/UserContextProvider";
import { useRouter } from "next/navigation";
import { User } from "@/gl-types/user-types";
import LoginComponent from "@/components/login/loginComponent";

export default function AdminLogin() {
  return (
    <div className="flex flex-col bg-primary w-[100vw] h-[100vh]" data-theme="gl-dark">
      <AdminNavbarTemplate />
      <main className="flex-1 bg-primary flex items-center justify-center">
        <section className="w-[25%] h-[50%] bg-base-200 rounded-xl shadow-lg p-6 flex flex-col justify-center">
          <p className="text-center mb-8 mt-4 text-3xl font-bold">
            Sign in to your admin account
          </p>
          <div className="text-left text-[#5D657E] flex flex-col gap-4">
            <LoginComponent adminMode />
          </div>
        </section>
      </main>
    </div>
  );
}

