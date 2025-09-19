"use client";

import React from "react";

type ButtonProps = {
  type: "submit" | "button" | "image";
  value?: string;
  className?: string;
  customWidth?: string;
  customHeight?: string;
  bgColor?: string;
  textColor?: string;
  hoverEffect?: boolean;
  onClick?: () => void | unknown;
  src?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Button = ({
  type,
  value = undefined,
  className = undefined,
  customWidth = undefined,
  customHeight = undefined,
  bgColor = undefined,
  textColor = undefined,
  hoverEffect = false,
  onClick = undefined,
  src = undefined,
  ...props
}: ButtonProps) => {
  return (
    <input
      {...props}
      type={type}
      value={value}
      onClick={onClick}
      src={type === "image" ? src : undefined}
      className={
        className
          ? className + "btn"
          : ` ${bgColor ?? "bg-accent"} ${textColor ?? "text-base-content"} 
              rounded-lg
            } ${customWidth ?? "w-60"} ${customHeight ?? "h-9"} font-bold  ${
              hoverEffect === true ? "hover:scale-110" : ""
            } duration-300 cursor-pointer text-center flex items-center justify-center hover:opacity-80 active:translate-y-1`
      }
    />
  );
};

export default Button;
