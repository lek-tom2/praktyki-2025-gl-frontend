"use client";
import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ParkingSpotMap from "../parkingSpotMap/ParkingSpotMap";
import ParkingSpotList from "../parkingSpotList/ParkingSpotList";
import MapSwitch from "../switch/mapSwitch";
import Input from "../input/input";
import LevelSwitch from "../switch/parkingLevelSwitch";
import toast from "react-hot-toast";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";

type ParkingManagerProps = {
  pl2: ParkingSpotPL2[];
  pl3: ParkingSpotPL3[];
  availableCount: number;
  occupiedCount: number;
  checkIn: string;
  checkOut: string;
  setCheckIn: React.Dispatch<React.SetStateAction<string>>;
  setCheckOut: React.Dispatch<React.SetStateAction<string>>;
};

type FormValues = {
  checkIn: string;
  checkOut: string;
};

const ParkingManager = ({
  pl2,
  pl3,
  availableCount,
  occupiedCount,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
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

  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      checkIn,
      checkOut,
    },
  });

  const watchCheckIn = watch("checkIn");
  const watchCheckOut = watch("checkOut");

  useEffect(() => {
    if (watchCheckIn && watchCheckOut) {
      const checkInDate = new Date(watchCheckIn);
      const checkOutDate = new Date(watchCheckOut);

      if (checkOutDate < checkInDate) {
        const newCheckOut = new Date(checkInDate.getTime() + 86400000)
          .toISOString()
          .split("T")[0];

        toast.error(
          "Check-out cannot be before check-in, auto-corrected to next day!"
        );
        setValue("checkOut", newCheckOut);
        setCheckOut(newCheckOut);
        setCheckIn(watchCheckIn);
        return;
      }

      setCheckIn(watchCheckIn);
      setCheckOut(watchCheckOut);
    }
  }, [watchCheckIn, watchCheckOut, setCheckIn, setCheckOut, setValue]);

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
          <label className="font-medium">Select Reservation Dates</label>
          <div className="bg-primary rounded-lg shadow p-2 overflow-hidden">
            <DateRange
              ranges={[
                {
                  startDate: new Date(checkIn),
                  endDate: new Date(checkOut),
                  key: "selection",
                },
              ]}
              onChange={(ranges) => {
                const { startDate, endDate } = ranges.selection;

                if (!startDate || !endDate) return;

                // Prevent past dates
                if (startDate < new Date()) {
                  toast.error("You cannot book past dates!");
                  return;
                }

                // Enforce max 3 days
                const diffInMs = endDate.getTime() - startDate.getTime();
                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                if (diffInDays > 3) {
                  toast.error("Maximum reservation length is 3 days!");
                  return;
                }

                setCheckIn(startDate.toISOString().split("T")[0]);
                setCheckOut(endDate.toISOString().split("T")[0]);
              }}
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
              moveRangeOnFirstSelection={false}
              rangeColors={["#22c55e"]} // Tailwind green-500
              showDateDisplay={false} // hides ugly header
              direction="vertical" // fits better in side panel
            />
          </div>
        </div>

        {/* Parking Level */}
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

        {/* Search */}
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

        {/* Filter */}
        <div className="flex flex-col gap-2">
          <label>Filter Parking</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select bg-primary border-0 h-9 text-base-content hover:scale-105 focus:scale-105 duration-300 w-full"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="yours">Yours</option>
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
