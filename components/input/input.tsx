import React, { Children, ReactNode } from "react";

type InputProps = {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  width?: string;
  height?: string;
  fontColor?: string;
};

const Input = ({
  type,
  name,
  value,
  onChange,
  disabled,
  required = undefined,
  placeholder = undefined,
  className = undefined,
  children = undefined,
  width = undefined,
  height = undefined,
  fontColor = undefined,
  ...props
}: InputProps) => {
  return (
    <label
      className={
        className
          ? className + `input ${fontColor ?? "text-neutral"}`
          : `input bg-primary text-neutral ${height ?? "h-9"} ${
              width ?? "w-60"
            } ${fontColor ?? "text-neutral"}`
      }
    >
      {type === "search" ? (
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
      ) : null}
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled ?? false}
        required={required ?? true}
        className="grow"
      />
      {children}
    </label>
  );
};

export default Input;
