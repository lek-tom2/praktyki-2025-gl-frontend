"use client";
import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import React, { useEffect, useState } from "react";
import ParkingSpotMap from "../parkingSpotMap/ParkingSpotMap";
import ParkingSpotList from "../parkingSpotList/ParkingSpotList";
import MapSwitch from "../switch/mapSwitch";
import Input from "../input/input";
import LevelSwitch from "../switch/parkingLevelSwitch";

type ParkingManagerProps = {
  pl2: ParkingSpotPL2[];
  pl3: ParkingSpotPL3[];
  availableCount: number;
  occupiedCount: number;
};

const ParkingManager = ({
  pl2,
  pl3,
  availableCount,
  occupiedCount,
}: ParkingManagerProps) => {
  const [selectedParkingLevel, setSelectedParkingLevel] = useState<
    "PL2" | "PL3"
  >("PL2");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [parkingSpots, setParkingSpots] = useState<
    ParkingSpotPL2[] | ParkingSpotPL3[]
  >([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    setParkingSpots(selectedParkingLevel === "PL2" ? pl2 : pl3);
  }, [selectedParkingLevel, pl2, pl3]);

  return (
    <div className="w-3/4 h-full flex flex-row items-center justify-center gap-6">
      {/* Map/List Center */}
      <div className="h-[90%] w-3/4 flex justify-center items-start">
        {viewMode === "map" ? (
          <ParkingSpotMap
            parkingSpots={parkingSpots}
            level={selectedParkingLevel}
            search={search}
            filter={filter}
          />
        ) : (
          <ParkingSpotList
            parkingSpots={parkingSpots}
            level={selectedParkingLevel}
            search={search}
            filter={filter}
          />
        )}
      </div>

      {/* Right-side control panel */}
      <div className="w-1/4 flex flex-col gap-6 bg-secondary h-[90%] overflow-y-auto overflow-x-hidden p-6 rounded-xl shadow-lg justify-center">
        {/* Check-in/out */}
        <div className="flex flex-col gap-2">
          <label htmlFor="checkin">Check-in</label>
          <Input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            name="checkin"
            width="w-full"
            id="checkin"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="checkout">Check-out</label>
          <Input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            name="checkout"
            width="w-full"
            id="checkout"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Switch Parking Level</label>
          <LevelSwitch
            value={selectedParkingLevel}
            onChange={setSelectedParkingLevel}
          />
        </div>

        {/* View mode */}
        <div className="flex flex-col gap-2">
          <label>Switch View Mode</label>
          <MapSwitch value={viewMode} onChange={setViewMode} />
        </div>

        <div className="flex flex-col gap-2">
          <label>Search Parking</label>
          <Input
            type="search"
            placeholder="Search parking spot..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            background="bg-primary"
            width="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Filter Parking</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select bg-primary border-0 h-9 text-base-content hover:scale-105 focus:scale-105 duration-300 w-full"
          >
            {" "}
            <option value="all">All</option>{" "}
            <option value="available">Available</option>{" "}
            <option value="occupied">Occupied</option>{" "}
            <option value="reserved">Reserved</option>{" "}
            <option value="yours">Yours</option>{" "}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm mt-2">
            <p>Total spots: {parkingSpots.length}</p>
            <p>Available: {availableCount}</p>
            <p>Occupied: {occupiedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingManager;
