"use client";
import React, { ReactNode, useState } from "react";

type MapSwitchProps = {
  value?: "map" | "list";
  onChange?: (value: "map" | "list") => void;
  className?: string;
  children?: ReactNode;
};

const MapSwitch = ({
  value,
  onChange,
  className,
  children,
}: MapSwitchProps) => {
  const [internalValue, setInternalValue] = useState<"map" | "list">("map");
  const isControlled = value !== undefined && onChange !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleSwitch = (newValue: "map" | "list") => {
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const iconSize = 14;

  const MapIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M9.5 3l-5 2v16l5-2 5 2 5-2 5 2V5l-5-2-5 2-5-2zM10 5.868l4 1.6v10.664l-4-1.6V5.868zM6 6.868l2-0.8v10.664l-2 0.8V6.868zM20 17.132l-2 0.8V7.268l2-0.8v10.664z" />
    </svg>
  );

  const ListIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M3 6h2v2H3V6zm4 0h14v2H7V6zM3 10h2v2H3v-2zm4 0h14v2H7v-2zM3 14h2v2H3v-2zm4 0h14v2H7v-2z" />
    </svg>
  );

  const baseBtnClasses =
    "flex items-center justify-center w-1/2 h-10 rounded-4xl transition-colors text-base-content font-medium gap-2";

  return (
    <div
      className={`flex items-center bg-primary p-1 rounded-4xl w-full gap-1 h-12 ${
        className ?? ""
      }`}
    >
      <button
        type="button"
        className={`${baseBtnClasses} ${
          currentValue === "list" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => handleSwitch("list")}
      >
        {ListIcon}
        <span>List</span>
      </button>
      <button
        type="button"
        className={`${baseBtnClasses} ${
          currentValue === "map" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => handleSwitch("map")}
      >
        {MapIcon}
        <span>Map</span>
      </button>
      {children}
    </div>
  );
};

export default MapSwitch;
