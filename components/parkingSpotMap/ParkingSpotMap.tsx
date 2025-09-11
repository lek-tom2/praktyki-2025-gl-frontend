"use client";
import {
  ParkingSpot as ParkingSpotType,
  SpotStatus,
} from "@/gl-types/parkingSpot";
import React, { ReactNode, useState } from "react";
import { Aisle, ParkingSpot, Separator, Wrapper } from "./mapComponents";
import Input from "../input/input";

type parkingSpotMapProps = {
  parkingSpots: ParkingSpotType[];
};

const ParkingSpotMap = ({ parkingSpots }: parkingSpotMapProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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

    return {
      ...spot,
      visible: matchesSearch && matchesFilter,
    };
  });

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 box-border overflow-x-hidden">
      <div className="grid grid-cols-3 items-center w-full gap-4 mb-4">
        <div /> {/* left spacer */}
        <p className="text-[#eaefef] text-3xl md:text-4xl text-center">
          Parking Level -2
        </p>
        <div className="flex items-center justify-end gap-3">
          <div className="w-44 md:w-64 hover:scale-105 transition-transform duration-200">
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
            className="select bg-secondary border-0 h-9 text-primary-content hover:scale-105 focus:scale-105 duration-200 w-28"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Unavailable</option>
            <option value="reserved">Reserved</option>
            <option value="yours">Yours</option>
          </select>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full max-h-[65vh] overflow-y-auto">
          <div className="flex flex-col items-center justify-center gap-12 w-full">
            <Wrapper>
              <Aisle>
                {filteredSpots
                  .filter((spot) => spot.aisle === "mainAisleLeft")
                  .map((spot, i) => (
                    <ParkingSpot
                      name={spot.name}
                      aviability={spot.aviability}
                      key={spot.name + "-mal-" + i}
                      visible={spot.visible}
                    />
                  ))}
              </Aisle>
              <Separator text="Main Aisle" />
              <Aisle>
                {filteredSpots
                  .filter((spot) => spot.aisle === "mainAisleRight")
                  .map((spot, i) => (
                    <ParkingSpot
                      name={spot.name}
                      aviability={spot.aviability}
                      key={spot.name + "-mar-" + i}
                      visible={spot.visible}
                    />
                  ))}
              </Aisle>
            </Wrapper>

            <Wrapper>
              <Aisle>
                {filteredSpots
                  .filter((spot) => spot.aisle === "leftAisleLeft")
                  .map((spot, i) => (
                    <ParkingSpot
                      name={spot.name}
                      aviability={spot.aviability}
                      key={spot.name + "-lall-" + i}
                      visible={spot.visible}
                    />
                  ))}
              </Aisle>
              <Separator text="Left Aisle" />
              <Aisle>
                {filteredSpots
                  .filter((spot) => spot.aisle === "leftAisleRight")
                  .map((spot, i) => (
                    <ParkingSpot
                      name={spot.name}
                      aviability={spot.aviability}
                      key={spot.name + "-lalr-" + i}
                      visible={spot.visible}
                    />
                  ))}
              </Aisle>
            </Wrapper>

            <Wrapper>
              <Aisle>
                {filteredSpots
                  .filter((spot) => spot.aisle === "rightAisleLeft")
                  .map((spot, i) => (
                    <ParkingSpot
                      name={spot.name}
                      aviability={spot.aviability}
                      key={spot.name + "-rall-" + i}
                      visible={spot.visible}
                    />
                  ))}
              </Aisle>
              <Separator text="Right Aisle" />
            </Wrapper>

            <Wrapper>
              <Aisle>
                {filteredSpots
                  .filter((spot) => spot.aisle === "tunnel")
                  .map((spot, i) => (
                    <ParkingSpot
                      name={spot.name}
                      aviability={spot.aviability}
                      key={spot.name + "-tun-" + i}
                      visible={spot.visible}
                    />
                  ))}
              </Aisle>
              <Separator text="After Tunnel" />
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotMap;
