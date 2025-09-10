import { ParkingSpot } from "@/gl-types/parkingSpot";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../input/input";

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
      className={`flex flex-row items-center gap-6 bg-secondary min-h-20 text-primary-content w-full rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-l-2 border-r-2 hover:scale-101 duration-300 ${
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
        <div className="ml-auto mr-4">{parkingSpot.pricePerHour} PLN/hr</div>
      )}
    </div>
  );
};

const ParkingSpotList = ({ parkingSpots }: parkingSpotListProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filteredSpots = parkingSpots.filter((spot) => {
    const matchesSearch = spot.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "available" && spot.aviability === 1) ||
      (filter === "unavailable" && spot.aviability === 0) ||
      (filter === "reserved" && spot.aviability === 2);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-3/4 h-full max-h-[80vh] flex flex-col gap-4 overflow-y-auto p-2">
      <div className="flex gap-2 items-center">
        <div className="hover:scale-105 duration-300 mr-auto ml-4">
          <Input
            type="search"
            name="searchSpot"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search by name..."
            background="bg-secondary"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select bg-secondary border-0 h-9 text-primary-content hover:scale-105 focus:scale-105 duration-300 ml-auto mr-4"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>

      {filteredSpots.length > 0 ? (
        filteredSpots.map((spot, i) => (
          <ParkingSpotEntry parkingSpot={spot} key={i} />
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
