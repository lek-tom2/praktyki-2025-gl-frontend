"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import PageTemplate from "@/templates/PageTemplateAfterLogin";
import Input from "@/components/input/input";
import Button from "@/components/button";
import FormErrorWrap from "@/components/FormError/formErrorWrap";
import FormErrorParagraph from "@/components/FormError/formErrorParagraph";
import PageTemplateAfterLogin from "@/templates/PageTemplateAfterLogin";

type CarFormProps = {
  brand: string;
  model: string;
  year: number;
  color: string;
  registration_number: string;
};

export default function AddCar() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CarFormProps>({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<CarFormProps> = async (data) => {
    const token = localStorage.getItem("access");
    try {
      const res = await fetch("http://localhost:8000/api/vehicles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.log("Backend errors:", errData);

        Object.entries(errData).forEach(([field, message]) => {
          if (field in data) {
            let msg = Array.isArray(message) ? message[0] : String(message);

            if (msg === "This field must be unique.") {
              msg =
                field === "registration_number"
                  ? "This registration plate already exists"
                  : "This value already exists";
            }

            setError(field as keyof CarFormProps, {
              type: "server",
              message: msg,
            });
          }
        });
        throw new Error(
          errData?.detail || "Failed to add vehicle. Check errors above."
        );
      }

      toast.success("Vehicle added!");
      reset(); // clears form
    } catch (err: any) {
      toast.error(err.message || "Error adding vehicle");
    }
  };

  return (
    <PageTemplateAfterLogin>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px-80px)]">
        <form
          className="w-full max-w-[420px] bg-base-200 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col gap-6 overflow-y-auto max-h-[80vh]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className="text-3xl font-bold text-center text-base-content mb-2">
            Add a Car
          </h2>

          {/* Brand */}
          <FormErrorWrap>
            <label className="text-base-content font-semibold">Brand</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              placeholder="Brand"
              {...register("brand", {
                required: "Brand is required",
                minLength: {
                  value: 2,
                  message: "Brand must be at least 2 characters",
                },
              })}
            />
            <FormErrorParagraph errorObject={errors.brand} />
          </FormErrorWrap>

          {/* Model */}
          <FormErrorWrap>
            <label className="text-base-content font-semibold">Model</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              placeholder="Model"
              {...register("model", {
                required: "Model is required",
              })}
            />
            <FormErrorParagraph errorObject={errors.model} />
          </FormErrorWrap>

          {/* Year */}
          <FormErrorWrap>
            <label className="text-base-content font-semibold">Year</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="number"
              placeholder="Year"
              {...register("year", {
                required: "Year is required",
                min: {
                  value: 1900,
                  message: "Year must be 1900 or later",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year cannot be after ${new Date().getFullYear()}`,
                },
              })}
            />
            <FormErrorParagraph errorObject={errors.year} />
          </FormErrorWrap>

          {/* Color */}
          <FormErrorWrap>
            <label className="text-base-content font-semibold">Color</label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              placeholder="Color"
              {...register("color", {
                required: "Color is required",
              })}
            />
            <FormErrorParagraph errorObject={errors.color} />
          </FormErrorWrap>

          {/* Registration Number */}
          <FormErrorWrap>
            <label className="text-base-content font-semibold">
              Registration Number
            </label>
            <Input
              className="rounded-md bg-primary w-full p-2 text-base-content"
              type="text"
              placeholder="Registration Number"
              {...register("registration_number", {
                required: "Registration number is required",
                minLength: {
                  value: 4,
                  message: "Registration number must be at least 4 characters",
                },
              })}
            />
            <FormErrorParagraph errorObject={errors.registration_number} />
          </FormErrorWrap>

          {/* Submit */}
          <div className="mx-auto">
            <Button
              value={isSubmitting ? "Adding..." : "Add a Car"}
              type="submit"
              hoverEffect={true}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </PageTemplateAfterLogin>
  );
}
