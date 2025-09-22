"use client";

import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../input/input";
import { ParkingSpotEntry } from "./parkingListComponents";

type parkingSpotListProps = {
  parkingSpots: ParkingSpotPL2[] | ParkingSpotPL3[];
  level: "PL2" | "PL3";
};

const ParkingSpotList = ({ parkingSpots, level }: parkingSpotListProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
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
    <div className="w-3/4 h-[75vh] flex flex-col gap-4 overflow-y-hidden overflow-x-hidden m-4 items-center p-2 max-w-screen-xl mx-auto box-border">
      <div className="grid grid-cols-3 items-center w-full mb-12">
        <div />

        <p></p>

        <div className="flex flex-row justify-end gap-4">
          <div className="hover:scale-105 duration-300 ">
            <Input
              type="search"
              name="searchSpot"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
               className="text-base-content bg-base-200 min-w-60 h-9"
              placeholder="Search by name..."
              background="bg-secondary"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select bg-base-200 border-0 h-9 text-base-content hover:scale-105 focus:scale-105 duration-300 min-w-30 "
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="yours">Yours</option>
          </select>
        </div>
      </div>
      {filteredSpots.length > 0 ? (
        <div
          className="flex flex-col gap-4 w-full overflow-y-auto
        "
        >
          {filteredSpots.map((spot, i) => (
            <ParkingSpotEntry parkingSpot={spot} key={i} />
          ))}
        </div>
      ) : (
        <div className="text-center text-primary-content mt-4">
          No matching parking spots
        </div>
      )}
    </div>
  );
};

export default ParkingSpotList;
