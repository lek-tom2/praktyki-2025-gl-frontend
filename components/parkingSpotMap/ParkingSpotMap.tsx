"use client";
import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import React, { useState } from "react";
import { Aisle, ParkingSpot, Separator, Wrapper } from "./mapComponents";
import Input from "../input/input";

type parkingSpotMapProps = {
  parkingSpots: ParkingSpotPL2[] | ParkingSpotPL3[];
  level: "PL2" | "PL3";
};

const ParkingSpotMap = ({ parkingSpots, level }: parkingSpotMapProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const isExactSearch = /^[a-zA-Z]\d{3}$/.test(search.trim());

  const filteredSpots = parkingSpots.map((spot) => {
    const matchesSearch = spot.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "available" && spot.aviability === "available") ||
      (filter === "occupied" && spot.aviability === "occupied") ||
      (filter === "reserved" && spot.aviability === "reserved") ||
      (filter === "yours" && spot.aviability === "yours");

    if (isExactSearch) {
      const searchedSpot = parkingSpots.find(
        (s) => s.name.toLowerCase() === search.toLowerCase()
      );
      if (!searchedSpot) {
        return { ...spot, visible: false, grayed: false };
      }
      const isMatch = spot.name.toLowerCase() === search.toLowerCase();
      return {
        ...spot,
        visible: spot.aisle === searchedSpot.aisle,
        grayed: !isMatch,
      };
    }

    if (filter === "yours") {
      const yourSpots = parkingSpots.filter((s) => s.aviability === "yours");
      const yourAisles = new Set(yourSpots.map((s) => s.aisle));

      if (yourAisles.size === 0) {
        return { ...spot, visible: false, grayed: false };
      }

      const isYourSpot = spot.aviability === "yours";
      return {
        ...spot,
        visible: yourAisles.has(spot.aisle),
        grayed: !isYourSpot,
      };
    }

    return {
      ...spot,
      visible: true,
      grayed: !matchesFilter || (search.length > 0 && !matchesSearch),
    };
  });

  const renderAisle = (
    aisleName: string,
    label: string,
    addBottom?: string
  ) => {
    const aisleSpots = filteredSpots.filter(
      (spot) => spot.aisle === aisleName && spot.visible
    );
    if (aisleSpots.length === 0) return null;

    return (
      <Wrapper>
        <Aisle>
          {filteredSpots
            .filter((spot) => spot.aisle === aisleName)
            .map((spot, i) => (
              <ParkingSpot
                key={spot.name + "-" + aisleName + "-" + i}
                name={spot.name}
                aviability={spot.aviability}
                visible={spot.visible}
                grayed={spot.grayed}
              />
            ))}
        </Aisle>
        <Separator text={label} />
        {addBottom && (
          <Aisle>
            {filteredSpots
              .filter((spot) => spot.aisle === addBottom)
              .map((spot, i) => (
                <ParkingSpot
                  key={spot.name + "-" + addBottom + "-" + i}
                  name={spot.name}
                  aviability={spot.aviability}
                  visible={spot.visible}
                  grayed={spot.grayed}
                />
              ))}
          </Aisle>
        )}
      </Wrapper>
    );
  };

  return (
    <div className="w-3/4 h-full max-h-[80vh] flex flex-col gap-4 overflow-y-hidden overflow-x-hidden m-4 items-center p-2 max-w-screen-xl mx-auto box-border">
      <div className="grid grid-cols-3 items-center w-full gap-4 mb-12">
        <div /> {/* left spacer */}
        <p></p>
        <div className="flex items-center justify-end gap-4">
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
            className="select bg-secondary border-0 h-9 text-secondary-content hover:scale-105 focus:scale-105 duration-300 min-w-30"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="yours">Yours</option>
          </select>
        </div>
      </div>

      {/* map */}
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full h-[62vh] p-4 overflow-y-auto">
          <div className="flex flex-col items-center justify-center gap-12 w-full">
            {filteredSpots.length > 0 ? (
              <>
                {level === "PL2" && (
                  <>
                    {renderAisle("mainAisleLeft", "Main Aisle")}
                    {renderAisle("mainAisleRight", "Main Aisle")}
                    {renderAisle(
                      "leftAisleLeft",
                      "Left Aisle",
                      "leftAisleRight"
                    )}
                    {renderAisle("rightAisleLeft", "Right Aisle")}
                    {renderAisle("tunnel", "After Tunnel")}
                  </>
                )}

                {level === "PL3" && (
                  <>
                    {renderAisle("mainAisleLeft", "Main Aisle")}
                    {renderAisle("topAisleTop", "Top Aisle", "topAisleBottom")}
                    {renderAisle(
                      "bottomAisleTop",
                      "Bottom Aisle",
                      "bottomAisleBottom"
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="text-center text-primary-content mt-4">
                No matching parking spots
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotMap;
