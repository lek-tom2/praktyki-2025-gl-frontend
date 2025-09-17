"use client";
import React, { useState } from "react";

type LevelSwitchProps = {
  value?: "PL2" | "PL3";
  onChange?: (value: "PL2" | "PL3") => void;
  className?: string;
};

const LevelSwitch = ({ value, onChange, className }: LevelSwitchProps) => {
  const [internalValue, setInternalValue] = useState<"PL2" | "PL3">("PL2");
  const isControlled = value !== undefined && onChange !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleSwitch = (newValue: "PL2" | "PL3") => {
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div
      className={`flex items-center bg-base-200 p-1 rounded-full w-[200px] h-[48px] ${
        className ?? ""
      }`}
    >
      <button
        type="button"
        className={`flex items-center justify-center w-[97px] h-[40px] rounded-full transition-colors text-white font-medium ${
          currentValue === "PL2" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => handleSwitch("PL2")}
      >
        PL-2
      </button>
      <button
        type="button"
        className={`flex items-center justify-center w-[97px] h-[40px] rounded-full transition-colors text-white font-medium ${
          currentValue === "PL3" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => handleSwitch("PL3")}
      >
        PL-3
      </button>
    </div>
  );
};

export default LevelSwitch;
