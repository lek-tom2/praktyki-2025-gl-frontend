"use client";
import PageTemplate from "@/templates/PageTemplate";
import Input from "@/components/input/input";
import ParkingManager from "@/components/parkingManager/parkingManager";
import { ApiLinks } from "@/gl-const/api-links";
import {
  BackendSpotStatus,
  ParkingSpotBackend,
  ParkingSpotPL2,
  ParkingSpotPL3,
  SpotStatus,
} from "@/gl-types/parkingSpot";
import { Reservation } from "@/gl-types/reservation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
  const [parkingListPrototype, setParkingListPrototype] = useState<
    ParkingSpotBackend[]
  >([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [parkingListPL2, setParkingListPL2] = useState<ParkingSpotPL2[]>([]);
  const [parkingListPL3, setParkingListPL3] = useState<ParkingSpotPL3[]>([]);
  const [availableCount, setAvailableCount] = useState(0);
  const [occupiedCount, setOccupiedCount] = useState(0);
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
      setIsLoading(true);
      try {
        const res = await fetch(ApiLinks.listParkingSpaces, {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = (await res.json()) as ParkingSpotBackend[];
        setParkingListPrototype(data);
        toast.success("Parking spots loaded");
      } catch (err) {
        toast.error("Failed to fetch parking spots");
      }
      setIsLoading(false);
    };

    const fetchReservations = async () => {
      try {
        const res = await fetch(ApiLinks.listReservations, {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = (await res.json()).detail as Reservation[];
        setReservations(data);
        toast.success("Reservations loaded");
      } catch (err) {
        toast.error("Failed to fetch reservations");
      }
    };

    fetchParking();
    fetchReservations();
  }, []);

  // Map backend spots to PL2/PL3
  useEffect(() => {
    const pl2Spots = parkingListPrototype
      .filter((s) => s.floor === -2)
      .map(mapToPL2);
    const pl3Spots = parkingListPrototype
      .filter((s) => s.floor === -3)
      .map(mapToPL3);
    setParkingListPL2(pl2Spots);
    setParkingListPL3(pl3Spots);

    let available = 0;
    let occupied = 0;
    parkingListPrototype.forEach((spot) => {
      if (spot.status === "FREE") available++;
      else occupied++;
    });
    setAvailableCount(available);
    setOccupiedCount(occupied);
  }, [parkingListPrototype]);

  return (
    <PageTemplate>
      <div className="flex flex-col items-center w-full bg-primary text-base-content h-full">
        {isLoading ? (
          <p>Loading parking...</p>
        ) : (
          <ParkingManager
            pl2={parkingListPL2}
            pl3={parkingListPL3}
            availableCount={availableCount}
            occupiedCount={occupiedCount}
          />
        )}
      </div>
    </PageTemplate>
  );
}
