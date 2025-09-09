import { ParkingSpot } from "@/gl-types/parkingSpot";
import Image from "next/image";
import React from "react";

type parkingSpotListProps = {
  parkingSpots: ParkingSpot[];
};

type parkingSpotProps = {
  parkingSpot: ParkingSpot;
};

const ParkingSpotEntry = ({ parkingSpot }: parkingSpotProps) => {
  const aviability =
    parkingSpot.aviability === 0
      ? "Unavailable"
      : parkingSpot.aviability === 1
      ? "Available"
      : "Reserved";

  return (
    <div
      className={`flex flex-row items-center gap-6 bg-secondary  min-h-15 text-primary-content w-full rounded-2xl drop-shadow-md border hover:scale-101 duration-300 ${
        parkingSpot.aviability === 0
          ? "border-rose-800"
          : parkingSpot.aviability === 1
          ? "border-emerald-400"
          : "border-amber-300"
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
      <div>{parkingSpot.name}</div>
      <div
        className={`${
          parkingSpot.aviability === 0
            ? "text-rose-800"
            : parkingSpot.aviability === 1
            ? "text-emerald-400"
            : "text-amber-300"
        }`}
      >
        {aviability}
      </div>
      {parkingSpot.pricePerHour && (
        <div className="ml-auto mr-4">{parkingSpot.pricePerHour} PLN /hr</div>
      )}
    </div>
  );
};

const ParkingSpotList = ({ parkingSpots }: parkingSpotListProps) => {
  return (
    <div className="w-3/4 h-full max-h-[80vh] flex flex-col gap-2 overflow-y-auto p-2">
      {parkingSpots.map((spot, i) => (
        <ParkingSpotEntry parkingSpot={spot} key={i} />
      ))}
    </div>
  );
};

export default ParkingSpotList;
