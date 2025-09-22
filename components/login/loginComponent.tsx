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

type formProps = {
  login: string | null;
  password: string | null;
  remember: boolean;
};

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const response = await fetch(ApiLinks.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: getValues().login,
          password: getValues().password,
        }),
      });
      console.log(response);
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
      const data = await response.json();
      console.log("Login Data: ");
      console.log(data);
      const tempUser = data.details.user as Omit<User, "languageIso2">;
      const access = data.details.access;
      const refresh = data.details.refresh;
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
      getValues().remember
        ? localStorage.setItem("rememember", "true")
        : localStorage.setItem("rememember", "false");

      console.log(tempUser);
      const user: User = { ...tempUser, languageIso2: "en" };
      UserDispatch({ type: "setUser", value: user });
      toast.success("Login Successful");
      router.push("/");
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      toast.error("Login failed (exception)");
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormErrorWrap>
        <p className="text-base-content">Username</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="text"
          name="login"
          register={register("login", {
            required: {
              value: true,
              message: "Login is required",
            },
            minLength: {
              value: 6,
              message: "Username must be at least 6 characters long.",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Login can only contain letters, numbers and underscores",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.login} />
      </FormErrorWrap>

      <div>
        <p className="text-base-content">Password</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="password"
          name="password"
          register={register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Password must contain at least one uppercase letter and one number",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.password} />
      </div>

      <section className="flex flex-row items-center justify-between">
        <div className="flex items-center flex-row  gap-2">
          <input
            type="checkbox"
            className="bg-primary"
            {...register("remember")}
          />
          <p className="text-base-content">Remember me</p>
        </div>
        <a
          href="#"
          className="hover:underline text-base-content p-2 transition-transform duration-200 hover:scale-105"
        >
          Forgot your password?
        </a>
      </section>

      <Button
        value={isLoading ? "..." : "Login"}
        type="submit"
        customWidth="60%"
        hoverEffect={true}
        disabled={isLoading}
      />
    </form>
  );
};

export default LoginComponent;
