"use client";

import { ParkingSpot } from "@/gl-types/parkingSpot";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../input/input";
import { ParkingSpotEntry } from "./parkingListComponents";

type parkingSpotListProps = {
  parkingSpots: ParkingSpot[];
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
      (filter === "available" && spot.aviability === "available") ||
      (filter === "occupied" && spot.aviability === "occupied") ||
      (filter === "reserved" && spot.aviability === "reserved") ||
      (filter === "yours" && spot.aviability === "yours");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-3/4 h-full max-h-[80vh] flex flex-col gap-4 overflow-y-scroll overflow-x-hidden m-4">
      <div className="grid grid-cols-3 items-center w-full m-6">
        <div />

        <p className="text-[#eaefef] text-4xl text-center">Parking Level -2</p>

        <div className="flex flex-row justify-end gap-4 mr-8">
          <div className="hover:scale-105 duration-300 ">
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
            className="select bg-secondary border-0 h-9 text-primary-content hover:scale-105 focus:scale-105 duration-300 "
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Unavailable</option>
            <option value="reserved">Reserved</option>
            <option value="yours">Yours</option>
          </select>
        </div>
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
