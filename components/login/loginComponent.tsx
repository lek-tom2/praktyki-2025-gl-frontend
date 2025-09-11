import React, { useState } from "react";
import Input from "../input/input";
import useUserContext from "@/gl-context/UserContextProvider";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApiLinks } from "@/gl-const/api-links";
import { User } from "@/gl-types/user-types";
import toast from "react-hot-toast";
import Button from "../button";
import FormErrorWrap from "../FormError/formErrorWrap";
import FormErrorParahraph from "../FormError/formErrorParagraph";
import useTranslation from "@/lang/useTranslation";

type formProps = {
  login: string | null;
  password: string | null;
};

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<formProps>({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { User, UserDispatch } = useUserContext();
  const router = useRouter();

  const onSubmit: SubmitHandler<formProps> = async (data) => {
    const response = await fetch(ApiLinks.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: getValues().login,
        password: getValues().password,
      }),
      credentials: "include",
    });
    if (!response.ok) {
      const status = response.status;
      if (status == 401) {
        const err = await response.text();
        toast.error(err, { duration: 5000 });
      }

      toast.error(`Login Failed \n Status: ${status}`, { duration: 5000 });
      setIsLoading(false);
      console.log(status);
      return;
    }
    setIsLoading(false);
    const tempUser = (await response.json()) as Omit<User, "languageIso2">;
    const user: User = { ...tempUser, languageIso2: "en" };
    UserDispatch({ type: "setUser", value: user });
    toast.success("Login Successful");
    router.push("/");
    router.refresh();
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormErrorWrap>
        <p>{t("login.username") || "Username"}</p>
        <Input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="text"
          name="login"
          register={register("login", {
            // login validation
            required: {
              value: true,
              message: "Login is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.login} />
      </FormErrorWrap>

      <div>
        <p>{t("login.password") || "Password"}</p>
        <Input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="password"
          name="password"
          register={register("password", {
            // password validation
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.password} />
      </div>

      <section className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="relative -top-0.5" />
          <p>{t("login.rememberMe") || "Remember me"}</p>
        </div>
        <a
          href="#"
          className="hover:underline text-white p-2 transition-transform duration-200 hover:scale-105"
        >
          {t("login.forgotPassword") || "Forgot your password?"}
        </a>
      </section>

      <Button
        value={t("login.login") || "login"}
        type="submit"
        customWidth="60%"
        hoverEffect={true}
      />
    </form>
  );
};

export default LoginComponent;
