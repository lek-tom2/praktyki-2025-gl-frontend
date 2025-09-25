"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import useUserContext from "@/gl-context/UserContextProvider";
import { useParams, useRouter } from "next/navigation";
import PageTemplateAfterLogin from "@/templates/PageTemplateAfterLogin";
import Input from "@/components/input/input";
import Button from "@/components/button";
import PopupOverlay from "@/components/popup/popup";
import { ApiLinks } from "@/gl-const/api-links";
import Image from "next/image";
import PageTemplate from "@/templates/PageTemplate";
import FormErrorParagraph from "@/components/FormError/formErrorParagraph";
import { Vehicle } from "@/gl-types/vehicle";

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

type ReservationFormInputs = {
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  vehicle: number;
};

export default function ParkingSpaces() {
  const { User } = useUserContext();
  const params = useParams() as Params;
  const spotId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesError, setVehiclesError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<ReservationFormInputs>({
    mode: "onTouched",
  });

  const router = useRouter();

  const [parkingSpotBackend, setParkingSpotBackend] =
    useState<ParkingSpotReservationDetails | null>(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("access");
  // Fetch parking spot + reservations info
  useEffect(() => {
    const fetchParkingSpot = async () => {
      if (!token) return;
      try {
        const res = await fetch(ApiLinks.listParkingDetails(spotId ?? "-1"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setParkingSpotBackend(data);
      } catch (err) {
        toast.error("Failed to load parking spot info");
        console.error(err);
      }
    };
    fetchParkingSpot();

    const fetchVehicles = async () => {
      if (!token) return;
      try {
        const res = await fetch(ApiLinks.listVehicles, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = (await res.json()) as Vehicle[];
        console.log(data);
        setVehicles(data);
      } catch (err) {
        toast.error("Failed to load parking spot info");
        console.error(err);
      }
    };
    fetchParkingSpot();
    fetchVehicles();
  }, [spotId]);

  // Fetch vehicles for user

  const onSubmit = () => {
    const createReservation = async () => {
      try {
        const req = JSON.stringify({
          start_date: getValues().start_date,
          end_date: getValues().end_date,
          spot: spotId,
          vehicle_id: getValues().vehicle,
        });
        console.log(req);
        const res = await fetch(ApiLinks.createReservation, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: req,
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log(data);
        toast.success("Reservation created successfully", { duration: 5000 });
        setOpen(false);
        reset();
      } catch (err) {
        toast.error("Failed to create reservation");
        console.error(err);
      }
    };
    createReservation();
  };

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
        <div className="w-1/4 h-3/4 text-base-content bg-base-200 flex-col m-12 rounded-3xl flex justify-center items-center">
          <h2 className=" font-bold m-6">Parking Spot Details</h2>
          {parkingSpotBackend ? (
            <div className="bg-base-200 p-4 rounded-xl shadow-lg">
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
                customWidth={"w-full"}
                onClick={() => setOpen(true)}
              />
            </div>
          ) : (
            <p>Loading parking spot...</p>
          )}
        </div>
      </div>

      {/* Your PopupOverlay reservation form */}
      <PopupOverlay
        open={open}
        onOpenChange={setOpen}
        title="Create Reservation"
        description="Fill in your reservation details"
        boxClassName="bg-base-200"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Start Date */}
          <label htmlFor="start_date" className="flex flex-col">
            <div>Checkin</div>
            <Input
              type="date"
              placeholder="Start Date"
              {...register("start_date", {
                required: "Start date is required",
              })}
          
              className="w-full text-base-content bg-primary"
            />
            <FormErrorParagraph errorObject={errors.start_date} />
          </label>

          {/* End Date */}
          <label htmlFor="end_date" className="flex flex-col">
            <div>Checkout</div>
            <Input
              type="date"
              placeholder="End Date"
              className="w-full text-base-content bg-primary"
              {...register("end_date", { required: "End date is required" })}
            />
            <FormErrorParagraph errorObject={errors.end_date} />
          </label>

          {/* Vehicle Selection */}
          <label htmlFor="vehicle" className="flex flex-col">
            <div>Select Vehicle</div>
            {vehiclesError || vehicles.length === 0 ? (
              <Button
                type="button"
                value="Add Vehicle"
                hoverEffect
                onClick={() => {
                  router.push("/account");
                }}
              />
            ) : (
              <select
                {...register("vehicle", { required: "Vehicle is required" })}
                className="select text-base-content bg-primary select-bordered w-full"
              >
                <option value="">Select vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.registration_number} value={v.id}>
                    {v.brand} ({v.registration_number})
                  </option>
                ))}
              </select>
            )}
            <FormErrorParagraph errorObject={errors.vehicle} />
          </label>

          {/* Submit */}
          <div className="flex justify-center gap-4">
            <Button
              type="submit"
              value={isSubmitting ? "Creating..." : "Create Reservation"}
              hoverEffect
            />
          </div>
        </form>
      </PopupOverlay>
    </PageTemplate>
  );
}
