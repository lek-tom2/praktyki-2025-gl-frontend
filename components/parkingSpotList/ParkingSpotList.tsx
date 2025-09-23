"use client";

import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import React from "react";
import { ParkingSpotEntry } from "./parkingListComponents";

type ParkingSpotListProps = {
  parkingSpots: ParkingSpotPL2[] | ParkingSpotPL3[];
  level: "PL2" | "PL3";
  search: string;
  filter: string;
};

const ParkingSpotList = ({
  parkingSpots,
  level,
  search,
  filter,
}: ParkingSpotListProps) => {
  const filteredSpots = parkingSpots.filter((spot) => {
    const matchesSearch = spot.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "available" && spot.aviability === "available") ||
      (filter === "occupied" && spot.aviability === "occupied") ||
      (filter === "reserved" && spot.aviability === "reserved") ||
      (filter === "yours" && spot.aviability === "yours");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto ">
      {filteredSpots.length > 0 ? (
        filteredSpots.map((spot, i) => (
          <ParkingSpotEntry key={i} parkingSpot={spot} />
        ))
      ) : (
        <div className="text-center text-primary-content mt-4">
          No matching parking spots
        </div>
      )}
    </div>
  );
};

export default ParkingSpotList;
