import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import Image from "next/image";

type parkingSpotProps = {
  parkingSpot: ParkingSpotPL2 | ParkingSpotPL3;
  onClick?: () => void | unknown;
};

export const ParkingSpotEntry = ({
  parkingSpot,
  onClick = undefined,
}: parkingSpotProps) => {
  const aviability = parkingSpot.aviability;

  return (
    <div
      className={`flex flex-row items-center gap-6 w-[95%] bg-secondary min-h-20 text-primary-content rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-l-2 border-r-2 hover:scale-101 duration-300 ml-4 mr-4 ${
        parkingSpot.aviability === "occupied"
          ? "border-rose-800"
          : parkingSpot.aviability === "available"
          ? "border-emerald-400"
          : parkingSpot.aviability === "reserved"
          ? "border-amber-600"
          : "border-blue-500"
      }`}
    >
      <div className="ml-4 relative aspect-square h-[80%]">
        <Image
          fill
          alt="Spot"
          src={parkingSpot.buildingPhoto ?? "/parking.png"}
          className="rounded-xl"
        />
      </div>
      <div className="text-secondary-content">{parkingSpot.name}</div>
      <div
        className={`${
          parkingSpot.aviability === "occupied"
            ? "text-rose-800"
            : parkingSpot.aviability === "available"
            ? "text-emerald-400"
            : parkingSpot.aviability === "reserved"
            ? "text-amber-600"
            : "text-blue-500"
        }`}
      >
        {aviability}
      </div>
    </div>
  );
};
