"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiLinks } from "@/gl-const/api-links";
import { Reservation } from "@/gl-types/reservation";
import toast from "react-hot-toast";
import PageTemplate from "@/templates/PageTemplate";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const access = localStorage.getItem("access");
      const res = await fetch(ApiLinks.listReservations, {
        headers: { Authorization: `Bearer ${access}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = (await res.json()).detail as Reservation[];
      console.log(data);
      setReservations(data);
    } catch (err) {
      toast.error("Failed to load reservations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // helper: format ISO string -> "Sep 27, 2025"
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <PageTemplate>
      <div className="flex flex-col items-center w-full bg-primary text-base-content h-full p-6">
        <div className="flex flex-col items-center justify-start w-1/2  h-full bg-secondary gap-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-4 mt-16">My Reservations</h1>
          {loading ? (
            <p>Loading reservations...</p>
          ) : reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            <div className="w-[90%] flex flex-col gap-4">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  onClick={() => router.push(`/my-reservations/${res.id}`)}
                  className="bg-primary p-4 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition-transform flex flex-row items-center justify-between"
                >
                  <p className="font-semibold">
                    Spot #{res.spot} ({formatDate(res.start_date)} →{" "}
                    {formatDate(res.end_date)})
                  </p>
                  <p className="text-right">
                    {res.vehicle.brand} {res.vehicle.model} (
                    {res.vehicle.registration_number})
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
