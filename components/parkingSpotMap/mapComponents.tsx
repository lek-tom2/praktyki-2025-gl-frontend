import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import { ReactNode } from "react";

type separtaorProps = {
  text: string;
};

type parkingSpotProps = Pick<
  ParkingSpotPL2 | ParkingSpotPL3,
  "name" | "aviability"
> & {
  visible?: boolean;
  onClick?: () => void | unknown;
};

export const Separator = ({ text }: separtaorProps) => {
  return (
    <div className="bg-accent w-full min-h-6 h-[5vh] rounded-2xl flex items-center justify-center text-[#eaefef]">
      {text}
    </div>
  );
};

export const ParkingSpot = ({
  name,
  aviability,
  visible = true,
  onClick = undefined,
}: parkingSpotProps) => {
  const bgClass = visible
    ? aviability === "occupied"
      ? "bg-rose-800"
      : aviability === "available"
      ? "bg-emerald-400"
      : aviability === "reserved"
      ? "bg-amber-600"
      : "bg-blue-500"
    : "bg-gray-600";

  return (
    <div
      onClick={onClick}
      className={`${bgClass} text-[#eaefef] w-12 md:w-14 lg:w-16 flex-shrink-0 rounded-2xl aspect-square flex items-center justify-center cursor-pointer hover:scale-105 duration-300`}
    >
      {visible ? name : null}
    </div>
  );
};

type aisleProps = {
  children: ReactNode;
};

export const Aisle = ({ children }: aisleProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3 w-full">
      {children}
    </div>
  );
};

type wrapperProps = {
  children: ReactNode;
};

export const Wrapper = ({ children }: wrapperProps) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1100px] mx-auto">
      {children}
    </div>
  );
};
