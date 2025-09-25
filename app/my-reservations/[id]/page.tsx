"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ApiLinks } from "@/gl-const/api-links";
import { Reservation } from "@/gl-types/reservation";
import { Vehicle } from "@/gl-types/vehicle";
import toast from "react-hot-toast";
import PageTemplate from "@/templates/PageTemplate";
import Input from "@/components/input/input";
import Button from "@/components/button";

type Params = { id: string | string[] };

type ReservationForm = {
  start_date: string;
  end_date: string;
  vehicle_id: number;
};

export default function ReservationDetailPage() {
  const params = useParams() as Params;
  const router = useRouter();
  const reservationId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access") : null;

  const fetchReservation = async () => {
    try {
      setLoading(true);
      const res = await fetch(ApiLinks.listReservaitonDetails(reservationId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = (await res.json()) as Reservation;
      setReservation(data);

      // preload form values
      setValue("start_date", data.start_date.split("T")[0]);
      setValue("end_date", data.end_date.split("T")[0]);
      setValue("vehicle_id", data.vehicle.id);
    } catch (err) {
      toast.error("Failed to load reservation details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await fetch(ApiLinks.listVehicles, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = (await res.json()) as Vehicle[];
      setVehicles(data);
    } catch (err) {
      toast.error("Failed to load vehicles");
      console.error(err);
    }
  };

  useEffect(() => {
    if (reservationId) {
      fetchReservation();
      fetchVehicles();
    }
  }, [reservationId]);

  const onSubmit: SubmitHandler<ReservationForm> = async (formData) => {
    try {
      console.log(formData);
      const res = await fetch(ApiLinks.updateReservation(reservationId), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      toast.success("Reservation updated!");
      setEditMode(false);
      fetchReservation();
    } catch (err) {
      toast.error("Failed to update reservation");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    try {
      const res = await fetch(ApiLinks.deleteReservation(reservationId), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      toast.success("Reservation deleted!");
      router.push("/my-reservations");
    } catch (err) {
      toast.error("Failed to delete reservation");
      console.error(err);
    }
  };

  if (loading)
    return (
      <PageTemplate>
        <p className="text-center mt-12">Loading reservation details...</p>
      </PageTemplate>
    );

  if (!reservation)
    return (
      <PageTemplate>
        <p className="text-center mt-12">No reservation found.</p>
      </PageTemplate>
    );

  return (
    <PageTemplate>
      <div className="flex flex-col items-center w-full bg-primary text-base-content h-full p-6">
        <div className="flex flex-col items-center justify-start w-1/2 h-full bg-secondary gap-6 rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-4 mt-8">Reservation Details</h1>

          {!editMode ? (
            // ---------- READ-ONLY VIEW ----------
            <div className="w-[90%] flex flex-col gap-4 bg-primary p-4 rounded-xl shadow-md">
              <p>
                <strong>Spot:</strong> #{reservation.spot}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(reservation.start_date).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(reservation.end_date).toLocaleString()}
              </p>
              <p>
                <strong>Vehicle:</strong> {reservation.vehicle.brand}{" "}
                {reservation.vehicle.model} (
                {reservation.vehicle.registration_number})
              </p>

              <div className="flex flex-row gap-4 mt-4">
                <Button
                  type="button"
                  value="Edit"
                  customWidth="w-1/2"
                  hoverEffect
                  onClick={() => setEditMode(true)}
                />
                <Button
                  type="button"
                  value="Delete"
                  customWidth="w-1/2"
                  hoverEffect
                  onClick={handleDelete}
                />
              </div>
            </div>
          ) : (
            // ---------- EDIT MODE ----------
            <form
              className="w-[90%] flex flex-col gap-4 bg-primary p-4 rounded-xl shadow-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="font-semibold text-lg">Spot #{reservation.spot}</p>

              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  className="rounded-md bg-secondary w-full p-2 text-base-content"
                  {...register("start_date", {
                    required: "Start date required",
                  })}
                />
                {errors.start_date && (
                  <p className="text-red-500">{errors.start_date.message}</p>
                )}
              </div>

              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  className="rounded-md bg-secondary w-full p-2 text-base-content"
                  {...register("end_date", { required: "End date required" })}
                />
                {errors.end_date && (
                  <p className="text-red-500">{errors.end_date.message}</p>
                )}
              </div>

              <div>
                <label>Vehicle</label>
                <select
                  {...register("vehicle_id", {
                    required: "Vehicle is required",
                    valueAsNumber: true,
                  })}
                  className="select text-base-content bg-secondary select-bordered w-full"
                  defaultValue={reservation.vehicle.id}
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model} ({v.registration_number})
                    </option>
                  ))}
                </select>
                {errors.vehicle_id && (
                  <p className="text-red-500">{errors.vehicle_id.message}</p>
                )}
              </div>

              <div className="flex flex-row gap-4 mt-4">
                <Button
                  type="submit"
                  value={isSubmitting ? "Saving..." : "Save"}
                  customWidth="w-1/2"
                  hoverEffect
                />
                <Button
                  type="button"
                  value="Cancel"
                  customWidth="w-1/2"
                  hoverEffect
                  onClick={() => setEditMode(false)}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
