"use client";
import React, { ReactNode, useState } from "react";

type InputProps = {
  type: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  width?: string;
  height?: string;
  fontColor?: string;
  id?: string;
  background?: string;
};

const Input = ({
  type,
  name,
  value,
  onChange,
  disabled,
  required,
  placeholder,
  className,
  children,
  width,
  height,
  fontColor,
  id = "default",
  background = "bg-primary",
  ...props
}: InputProps) => {
  // fallback state only if uncontrolled
  const [internalValue, setInternalValue] = useState<string>("");

  const isControlled = value !== undefined && onChange !== undefined;

  return (
    <label
      className={
        className
          ? `${className} input ${fontColor ?? "text-neutral"}`
          : `input ${background} text-neutral ${height ?? "h-9"} ${
              width ?? "w-60"
            } ${fontColor ?? "text-neutral"} border-0 `
      }
      htmlFor={id}
    >
      {type === "search" && (
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      )}

      <input
        {...props}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={isControlled ? value : internalValue}
        onChange={
          isControlled ? onChange : (e) => setInternalValue(e.target.value)
        }
        disabled={disabled ?? false}
        required={required ?? true}
        className="grow"
      />

      {children}
    </label>
  );
};

export default Input;
