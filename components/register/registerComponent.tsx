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
  email: string | null;
  phoneNumber: string | null;
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
    setIsLoading(true);
    const req = JSON.stringify({
      username: getValues().username,
      full_name: getValues().fullName,
      phone_number: getValues().phoneNumber,
      password: getValues().password,
      email: getValues().email,
    });
    console.log(req);
    try {
      const response = await fetch(ApiLinks.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: req,
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
      router.push("/");
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      toast.error("Register failed (exception)");
    }
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormErrorWrap>
        <p className="text-base-content">Username</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="text"
          name="username"
          register={register("username", {
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
        <FormErrorParahraph errorObject={errors.username} />
      </FormErrorWrap>

      <FormErrorWrap>
        <p className="text-base-content">Full name</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="text"
          name="fullName"
          register={register("fullName", {
            pattern: {
              value: /^[\p{L}]([-']?[\p{L}]+)*( [\p{L}]([-']?[\p{L}]+)*)+$/u,
              message:
                "Full name must contain at least first and last name, only letters, apostrophes or hyphens allowed.",
            },
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.fullName} />
      </FormErrorWrap>

      <FormErrorWrap>
        <p className="text-base-content">Email</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="text"
          name="email"
          register={register("email", {
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email must be correct.",
            },
            required: {
              value: true,
              message: "Email is required.",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.email} />
      </FormErrorWrap>

      <FormErrorWrap>
        <p className="text-base-content">Phone Number</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="text"
          name="phoneNumber"
          register={register("phoneNumber", {
            pattern: {
              value: /^\+?[1-9][0-9]{7,14}$/,
              message: "Phone Number must be correct.",
            },
            required: {
              value: true,
              message: "Phone number is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.phoneNumber} />
      </FormErrorWrap>

      <FormErrorWrap>
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
      </FormErrorWrap>

      <FormErrorWrap>
        <p className="text-base-content">Repeat password</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="password"
          name="repPassword"
          register={register("repPassword", {
            validate: (value) =>
              value === getValues().password || "Passwords don't match",
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
        value={isLoading ? "..." : "Register"}
        type="submit"
        customWidth="60%"
        hoverEffect={true}
        disabled={isLoading}
      />
    </form>
  );
};

export default RegisterComponent;
