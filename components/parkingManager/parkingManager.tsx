"use client";
import { ApiLinks } from "@/gl-const/api-links";
import useUserContext from "@/gl-context/UserContextProvider";
import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ParkingSpotMap from "../parkingSpotMap/ParkingSpotMap";
import ParkingSpotList from "../parkingSpotList/ParkingSpotList";
import MapSwitch from "../switch/mapSwitch";
import { spotsPL2 } from "@/gl-const/parking-spots-test-data";

const LevelSwitch = ({
  value,
  onChange,
}: {
  value: "PL2" | "PL3";
  onChange: (val: "PL2" | "PL3") => void;
}) => {
  const baseBtnClasses =
    "flex items-center justify-center w-[97px] h-[40px] rounded-full transition-colors text-white font-medium";

  return (
    <div className="flex items-center bg-base-200 p-1 rounded-full w-[200px] h-[48px]">
      <button
        className={`${baseBtnClasses} ${
          value === "PL2" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => onChange("PL2")}
      >
        PL-2
      </button>
      <button
        className={`${baseBtnClasses} ${
          value === "PL3" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => onChange("PL3")}
      >
        PL-3
      </button>
    </div>
  );
};

const ParkingManager = () => {
  const { User } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [parkingSpots, setParkingSpots] = useState<
    ParkingSpotPL2[] | ParkingSpotPL3[]
  >([]);
  const [selectedParkingLevel, setSelectedParkingLevel] = useState<
    "PL2" | "PL3"
  >("PL2");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const listParkingSpots = async () => {
    try {
      setLoading(true);
      const response = await fetch(ApiLinks.listParkingSpaces, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: User.userId,
          level: selectedParkingLevel,
        }),
      });

      if (!response.ok) {
        const status = response.status;
        const err = await response.text();
        toast.error(`Error fetching spots: ${response.status}`, {
          duration: 5000,
        });
        toast.error(`Error fetching spots: ${response.status}`, {
          duration: 5000,
        });
        return;
      }

      const spots =
        selectedParkingLevel === "PL2"
          ? ((await response.json()) as ParkingSpotPL2[])
          : ((await response.json()) as ParkingSpotPL3[]);
      setParkingSpots(spots);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching spots", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listParkingSpots();
    // uncomment if you want to test
    setParkingSpots(spotsPL2);
  }, [selectedParkingLevel]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-xl mx-auto p-4 ">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-semibold">
          Found {parkingSpots.length} spots on level{" "}
          {selectedParkingLevel === "PL2" ? "-2" : "-3"}
        </p>

        <div className="flex gap-4">
          <LevelSwitch
            value={selectedParkingLevel}
            onChange={setSelectedParkingLevel}
          />

          <MapSwitch value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {loading ? (
        <p>Loading spots...</p>
      ) : viewMode === "map" ? (
        <ParkingSpotMap
          parkingSpots={parkingSpots}
          level={selectedParkingLevel}
        />
      ) : (
        <ParkingSpotList
          parkingSpots={parkingSpots}
          level={selectedParkingLevel}
        />
      )}
    </div>
  );
};

export default ParkingManager;
