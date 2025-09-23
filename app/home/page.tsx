"use client";
import PageTemplateAfterLogin from "../../templates/PageTemplateAfterLogin";
import Input from "@/components/input/input";
import ParkingManager from "@/components/parkingManager/parkingManager";
import { ApiLinks } from "@/gl-const/api-links";
import { spotsPL2 } from "@/gl-const/parking-spots-test-data";
import {
  BackendSpotStatus,
  ParkingSpotBackend,
  ParkingSpotPL2,
  ParkingSpotPL3,
  SpotStatus,
} from "@/gl-types/parkingSpot";
import { Reservation } from "@/gl-types/reservation";
import PageTemplate from "@/templates/PageTemplate";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

export default function HomePage() {
  const [parkingListPrototype, setParkingListPrototype] = useState<
    ParkingSpotBackend[]
  >([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [availableCount, setAvailableCount] = useState(0);
  const [occupiedCount, setOccupiedCount] = useState(0);
  const [parkingListPL2, setParkingListPL2] = useState<ParkingSpotPL2[]>([]);
  const [parkingListPL3, setParkingListPL3] = useState<ParkingSpotPL3[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mapToStatus = (status: BackendSpotStatus): SpotStatus => {
    if (status === "FREE") return "available";
    if (status === "OCCUPIED") return "occupied";
    return "occupied";
  };

  const mapToPL2 = (spot: ParkingSpotBackend): ParkingSpotPL2 => ({
    name: spot.spot_number,
    aviability: mapToStatus(spot.status),
    aisle: spot.aisle as ParkingSpotPL2["aisle"],
  });

  const mapToPL3 = (spot: ParkingSpotBackend): ParkingSpotPL3 => ({
    name: spot.spot_number,
    aviability: mapToStatus(spot.status),
    aisle: spot.aisle as ParkingSpotPL3["aisle"],
  });

  useEffect(() => {
    const access = localStorage.getItem("access");
    const fetchParking = async () => {
      try {
        const res = await fetch(ApiLinks.listParkingSpaces, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (!res.ok) {
          toast.error(`Error fetching parking spots: ${res.status}`);
          return;
        }
        const data = (await res.json()) as ParkingSpotBackend[];
        setParkingListPrototype(data);
        console.log(data);
        toast.success("Parking spots loaded");
      } catch (error) {
        toast.error("Failed to fetch parking spots");
      }
    };
    const fetchReservations = async () => {
      try {
        const res = await fetch(ApiLinks.listReservations, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (!res.ok) {
          toast.error(`Error fetching reservations: ${res.status}`);
          return;
        }
        const data = (await res.json()).detail as Reservation[];
        console.log(data);
        setReservations(data);
        toast.success("Reservations loaded");
      } catch (error) {
        toast.error("Failed to fetch reservations");
      }
    };
    setIsLoading(true);
    fetchParking();
    fetchReservations();
    setIsLoading(false);
  }, []);

  // keep mapping separate
  useEffect(() => {
    const pl2Spots = parkingListPrototype
      .filter((spot) => spot.floor === -2)
      .map(mapToPL2);

    const pl3Spots = parkingListPrototype
      .filter((spot) => spot.floor === -3)
      .map(mapToPL3);

    setParkingListPL2(pl2Spots);
    setParkingListPL3(pl3Spots);

    let available = 0;
    let occupied = 0;

    parkingListPrototype.forEach((spot) => {
      if (spot.status === "FREE") {
        available++;
      } else {
        occupied++;
      }
    });
    console.log(available, occupied);
    setAvailableCount(available);
    setOccupiedCount(occupied);
  }, [parkingListPrototype]);

  // calculate availability separately
  useEffect(() => {
    if (!checkIn || !checkOut) {
      // setAvailableCount(0);
      // setOccupiedCount(0);
      return;
    }
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    // let available = 0;
    // let occupied = 0;

    // parkingListPrototype.forEach((spot) => {
    //   // const overlapping = reservations.some((r) => { // if (r.spot !== spot.id) return false; // const resStart = new Date(r.start_date); // const resEnd = new Date(r.end_date); // return checkInDate < resEnd && checkOutDate > resStart; // }); // if (overlapping) { // occupied++; // } else { // available++; // }
    // });

    // setAvailableCount(available);
    // setOccupiedCount(occupied);
  }, [checkIn, checkOut, reservations, parkingListPrototype]);

  console.log(parkingListPL2);
  console.log(parkingListPL3);
  console.log(reservations);
  console.log(availableCount, occupiedCount);

  return (
    <PageTemplate>
      <div className="flex flex-col items-center w-full bg-primary text-base-content min-h-screen pb-8">
        <div className="w-full flex flex-row justify-center mt-8 gap-8">
          <div className="flex flex-col w-[25%] min-w-[220px] max-w-[340px]">
            <p className="text-left text-base-content text-base mb-2">
              Check-in
            </p>
            <Input
              className="bg-base-200 rounded-xl h-[56px] text-lg w-full px-6 "
              type="date"
              name="check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[25%] min-w-[220px] max-w-[340px]">
            <p className="text-left text-base-content text-base mb-2">
              Check-out
            </p>
            <Input
              className="bg-base-200 rounded-xl h-[56px] text-lg w-full px-6 "
              type="date"
              name="check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 text-base-content text-sm">
          Parking spots: {parkingListPrototype.length} | Reservations:{" "}
          {/* {reservations.length} */}
          <br />
          <span className="text-green-600 font-semibold">
            Available: {availableCount}
          </span>{" "}
          |{" "}
          <span className="text-red-600 font-semibold">
            Occupied: {occupiedCount}
          </span>
        </div>
        <div
          className="w-full flex justify-center mt-10 flex-grow overflow-hidden"
          style={{
            maxHeight: "calc(100vh - 220px)",
          }}
        >
          {isLoading ? (
            "Loading parking..."
          ) : (
            <ParkingManager pl2={parkingListPL2} pl3={parkingListPL3} />
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
