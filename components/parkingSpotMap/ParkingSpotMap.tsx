"use client";

import { ParkingSpotPL2, ParkingSpotPL3 } from "@/gl-types/parkingSpot";
import React from "react";
import { Aisle, ParkingSpot, Separator, Wrapper } from "./mapComponents";

type ParkingSpotMapProps = {
  parkingSpots: ParkingSpotPL2[] | ParkingSpotPL3[];
  level: "PL2" | "PL3";
  search: string;
  filter: string;
};

const ParkingSpotMap = ({
  parkingSpots,
  level,
  search,
  filter,
}: ParkingSpotMapProps) => {
  const exactMatchPattern = /^[A-Za-z]\d{3}$/;
  const isExactSearch = exactMatchPattern.test(search.trim());

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

    const matchesAll = matchesSearch && matchesFilter;

    return {
      ...spot,
      visible: matchesAll,
      grayed: !matchesAll,
    };
  });

  const renderAisle = (
    aisleName: string,
    label: string,
    addBottom?: string
  ) => {
    if (isExactSearch) {
      const searchedSpot = filteredSpots.find(
        (spot) => spot.name.toLowerCase() === search.toLowerCase()
      );
      if (!searchedSpot || searchedSpot.aisle !== aisleName) {
        return null;
      }
    }

    const aisleSpots = filteredSpots.filter((spot) => spot.aisle === aisleName);
    if (!aisleSpots.length) return null;

    return (
      <Wrapper>
        <Aisle>
          {aisleSpots.map((spot, i) => (
            <ParkingSpot
              key={spot.name + "-" + i}
              name={spot.name}
              aviability={spot.aviability}
              grayed={spot.grayed && !isExactSearch}
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
                  grayed={spot.grayed && !isExactSearch}
                />
              ))}
          </Aisle>
        )}
      </Wrapper>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center overflow-x-hidden gap-12 p-4">
      {level === "PL2" && (
        <>
          {renderAisle("mainAisleLeft", "Main Aisle", "mainAisleRight")}
          {renderAisle("leftAisleLeft", "Left Aisle", "leftAisleRight")}
          {renderAisle("rightAisleLeft", "Right Aisle")}
          {renderAisle("tunnel", "After Tunnel")}
        </>
      )}

      {level === "PL3" && (
        <>
          {renderAisle("mainAisleLeft", "Main Aisle")}
          {renderAisle("topAisleTop", "Top Aisle", "topAisleBottom")}
          {renderAisle("bottomAisleTop", "Bottom Aisle", "bottomAisleBottom")}
        </>
      )}

      {filteredSpots.filter((s) => s.visible).length === 0 && (
        <div className="text-center text-primary-content mt-4">
          No matching parking spots
        </div>
      )}
    </div>
  );
};

export default ParkingSpotMap;
