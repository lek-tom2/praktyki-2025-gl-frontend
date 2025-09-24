"use client";
import Rseact, { useEffect, useState } from "react";
import useUserContext from "@/gl-context/UserContextProvider";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

import PageTemplateAfterLogin from "../../../templates/PageTemplateAfterLogin";
import Input from "@/components/input/input";
import Button from "@/components/button";
import PopupOverlay from "@/components/popup/popup";
import { ParkingSpotBackend } from "@/gl-types/parkingSpot";
import { Vehicle } from "@/gl-types/vehicle";
import { ApiLinks } from "@/gl-const/api-links";
import PageTemplate from "@/templates/PageTemplate";
import Image from "next/image";

type Params = {
  id: string | string[];
};

export type UserInfo = {
  full_name: string;
  email: string;
  phone: string | null;
};

export type VehicleInfo = {
  registration_number: string;
  brand: string;
  model: string;
  year: number;
  color: string;
};

export type ReservationDetail = {
  start_date: string; // ISO string
  end_date: string; // ISO string
  user: UserInfo;
  vehicle: VehicleInfo;
};

export type ParkingSpotReservationDetails = {
  id: string;
  spot_number: string;
  floor: number;
  status: "FREE" | "OCCUPIED"; // backend status
  aisle: string;
  occupied_now: ReservationDetail | null; // reservation active now
  next_reservation: ReservationDetail | null; // upcoming reservation
};

export default function ParkingSpaces() {
  const { User } = useUserContext();
  const params = useParams() as Params;
  const spotId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [parkingSpotBackend, setParkingSpotBackend] =
    useState<ParkingSpotReservationDetails | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch parking spot + reservations info
  useEffect(() => {
    const fetchParkingSpot = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const res = await fetch(ApiLinks.listParkingDetails(spotId ?? "-1"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log("Parking spot data:", data);
        setParkingSpotBackend(data);
      } catch (err) {
        toast.error("Failed to load parking spot info");
        console.error(err);
      }
    };
    fetchParkingSpot();
  }, [spotId]);

  // Fetch vehicles for user

  return (
    <PageTemplate>
      <div className="w-full h-full flex flex-row-reverse items-center justify-center">
        <div className="w-3/4 h-3/4 flex flex-col items-center justify-center relative rounded-3xl m-12">
          {parkingSpotBackend ? (
            <Image
              src={
                parkingSpotBackend?.floor === -2 ? "/2floor.png" : "/3floor.png"
              }
              fill={true}
              alt="Parking Plan"
              className="rounded-3xl"
            />
          ) : (
            <div>No imaga available</div>
          )}
        </div>
        <div className="w-1/4 h-3/4 text-base-content bg-secondary flex-col m-12 rounded-3xl flex justify-center items-center">
          <h2 className=" font-bold m-6">Parking Spot Details</h2>
          {parkingSpotBackend ? (
            <div className="bg-secondary p-4 rounded-xl shadow-lg">
              <div className="mb-2">
                <strong>Spot Number:</strong> {parkingSpotBackend.spot_number}
              </div>
              <div className="mb-2">
                <strong>Floor:</strong> {parkingSpotBackend.floor}
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {parkingSpotBackend.status}
              </div>

              <div className="mb-4">
                <strong>Currently Occupied:</strong>{" "}
                {parkingSpotBackend.occupied_now ? (
                  <div className="ml-4">
                    <div>
                      User: {parkingSpotBackend.occupied_now.user.full_name}
                    </div>
                    <div>
                      Email: {parkingSpotBackend.occupied_now.user.email}
                    </div>
                    <div>
                      Phone: {parkingSpotBackend.occupied_now.user.phone}
                    </div>
                    <div>
                      Vehicle: {parkingSpotBackend.occupied_now.vehicle.brand} (
                      {
                        parkingSpotBackend.occupied_now.vehicle
                          .registration_number
                      }
                      )
                    </div>
                    <div>
                      From:{" "}
                      {new Date(
                        parkingSpotBackend.occupied_now.start_date
                      ).toLocaleString()}
                    </div>
                    <div>
                      To:{" "}
                      {new Date(
                        parkingSpotBackend.occupied_now.end_date
                      ).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  "No current reservation"
                )}
              </div>

              <div className="mb-4">
                <strong>Next Reservation:</strong>{" "}
                {parkingSpotBackend.next_reservation ? (
                  <div className="ml-4">
                    <div>
                      User: {parkingSpotBackend.next_reservation.user.full_name}
                    </div>
                    <div>
                      Email: {parkingSpotBackend.next_reservation.user.email}
                    </div>
                    <div>
                      Phone: {parkingSpotBackend.next_reservation.user.phone}
                    </div>
                    <div>
                      Vehicle:{" "}
                      {parkingSpotBackend.next_reservation.vehicle.brand} (
                      {
                        parkingSpotBackend.next_reservation.vehicle
                          .registration_number
                      }
                      )
                    </div>
                    <div>
                      From:{" "}
                      {new Date(
                        parkingSpotBackend.next_reservation.start_date
                      ).toLocaleString()}
                    </div>
                    <div>
                      To:{" "}
                      {new Date(
                        parkingSpotBackend.next_reservation.end_date
                      ).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  "No upcoming reservations"
                )}
              </div>

              <Button
                type="button"
                value="Create Reservation"
                hoverEffect={true}
                onClick={() => setOpen(true)}
              />
            </div>
          ) : (
            <p>Loading parking spot...</p>
          )}
        </div>
      </div>

      <PopupOverlay
        open={open}
        onOpenChange={setOpen}
        title="Create Reservation"
        description={`Spot: ${parkingSpotBackend?.spot_number}`}
        boxClassName="bg-base-200"
      >
        {/* Reservation form code stays the same */}
      </PopupOverlay>
    </PageTemplate>
  );
}
