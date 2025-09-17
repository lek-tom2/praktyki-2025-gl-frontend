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
      const empRes = await fetch(`/api/employees/?email=${encodeURIComponent(getValues().login || "")}`);
      if (!empRes.ok) {
        toast.error("No employee found with this email", { duration: 5000 });
        setIsLoading(false);
        return;
      }
      const empArr = await empRes.json();
      if (!Array.isArray(empArr) || empArr.length === 0) {
        toast.error("No employee found with this email", { duration: 5000 });
        setIsLoading(false);
        return;
      }
      const emp = empArr[0];
      const userRes = await fetch(`/api/users/?employee=${emp.id}`);
      if (!userRes.ok) {
        toast.error("No user found for this employee", { duration: 5000 });
        setIsLoading(false);
        return;
      }
      const userArr = await userRes.json();
      if (!Array.isArray(userArr) || userArr.length === 0) {
        toast.error("No user found for this employee", { duration: 5000 });
        setIsLoading(false);
        return;
      }
      const user = userArr[0];
      if (user.password !== getValues().password) {
        toast.error("Invalid password", { duration: 5000 });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      UserDispatch({ type: "setUser", value: { ...user, languageIso2: "en" } });
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
                message: "Login can only contain letters, numbers and underscores",
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
                  message: "Password must contain at least one uppercase letter and one number",
                },
          })}
        />
        <FormErrorParahraph errorObject={errors.password} />
      </div>

      <section className="flex flex-row items-center justify-between">
        <div className="flex items-center flex-row  gap-2">
          <input type="checkbox" className="bg-primary" />
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
        value="login"
        type="submit"
        customWidth="60%"
        hoverEffect={true}
      />
    </form>
  );
};

export default LoginComponent;
