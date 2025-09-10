import React, { useState } from "react";
import Input from "../input/input";
import Button from "../button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ApiLinks } from "@/gl-const/api-links";
import toast from "react-hot-toast";
import FormErrorWrap from "../FormError/formErrorWrap";
import FormErrorParahraph from "../FormError/formErrorParagraph";

type formProps = {
  username: string | null;
  fullName: string | null;
  password: string | null;
  repPassword: string | null;
};

const RegisterComponent = () => {
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

  const router = useRouter();

  const onSubmit: SubmitHandler<formProps> = async (data) => {
    const response = await fetch(ApiLinks.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: getValues().username,
        fullName: getValues().fullName,
        password: getValues().password,
      }),
      credentials: "include",
    });
    if (!response.ok) {
      const status = response.status;
      toast.error(`Register failed \n Status: ${status}`, { duration: 5000 });
      setIsLoading(false);
      console.log(status);
      return;
    }
    setIsLoading(false);
    toast.success("Register Successful");
    router.push("/login-register");
    router.refresh();
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormErrorWrap>
        <p>Username</p>
        <Input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="text"
          name="username"
          register={register("username", {
            // username validation
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.username} />
      </FormErrorWrap>

      <FormErrorWrap>
        <p>Full name</p>
        <Input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="text"
          name="fullName"
          register={register("fullName", {
            // full name validation
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.fullName} />
      </FormErrorWrap>

      <FormErrorWrap>
        <p>Password</p>
        <Input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="password"
          name="password"
          register={register("password", {
            //password validation
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.password} />
      </FormErrorWrap>

      <FormErrorWrap>
        <p>Repeat password</p>
        <Input
          className="rounded-md bg-[#374151] w-full p-2 text-white"
          type="password"
          name="repPassword"
          register={register("repPassword", {
            //repPassword validation
            required: {
              value: true,
              message: "Password repetition is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.repPassword} />
      </FormErrorWrap>
      <br />
      <Button
        value="Register"
        type="submit"
        customWidth="60%"
        hoverEffect={true}
      />
    </form>
  );
};

export default RegisterComponent;
