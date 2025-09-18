"use client";
import { useEffect, useState } from "react";
import PageTemplate from "@/templates/PageTemplate";
import Button from "@/components/button";
import useUserContext from "@/gl-context/UserContextProvider";
type Reservation = {
  id: number;
  start_date: string;
  end_date: string;
  user: number;
  spot: number;
  vehicle: string;
};
type ReservationHistory = {
  id: number;
  start_date: string;
  end_date: string;
  spot: number;
  vehicle: string;
};
const MyReservedParkingSpacePage = () => {
  const { User, UserDispatch } = useUserContext();
  const [reservation, setReservation] = useState<Reservation | null>(null);
const [history, setHistory] = useState<ReservationHistory[]>([]); 

  useEffect(() => {
  const fetchReservation = async () => {
    
    const res = await fetch(`/api/myReservation?userId=${User.userId}`);

    if (res.ok) {
      const data = await res.json();
      setReservation(data.reservation);
    } else {
      // example
      setReservation({
        id: 1,
        start_date: "2025-09-10T02:00:00+02:00",
        end_date: "2025-09-10T17:30:00+02:00",
        user: 1,
        spot: 1,
        vehicle: "tesla "
      });
    }
  };
 const fetchHistory = async () => {
    const res = await fetch(`/api/reservationHistory?userId=${User.userId}`);

    if (res.ok) {
      const data = await res.json();
      setHistory(data.history);
    } else {
      setHistory([
        {
          id: 1,
          start_date: "2025-08-01T08:00:00+02:00",
          end_date: "2025-08-01T16:00:00+02:00",
          spot: 2,
          vehicle: "BMW"
        },
        {
          id: 2,
          start_date: "2025-08-10T09:30:00+02:00",
          end_date: "2025-08-10T18:00:00+02:00",
          spot: 7,
          vehicle: "Audi"
        }
      ]);
    }
  };

  fetchReservation();
  fetchHistory();
}, []);

  
  const selectedTimeFrom = reservation ? reservation.start_date.split("T")[1]?.slice(0, 5) : "";
  const selectedTimeTo = reservation ? reservation.end_date.split("T")[1]?.slice(0, 5) : "";
  const selectedDate = reservation ? reservation.start_date.split("T")[0].replace(/-/g, "/") : "";

  const getDuration = (from: string, to: string) => {
    if (!from || !to) return "0h";
    const [startH, startM] = from.split(":").map(Number);
    const [endH, endM] = to.split(":").map(Number);
    const start = startH * 60 + startM;
    const end = endH * 60 + endM;
    const diff = end - start;
    if (diff <= 0) return "0h";
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  };

  return (
    <PageTemplate>
      <div className="flex items-start justify-center mt-10 bg-base-100">
        <div className="flex gap-10">
          <div className="w-full max-w-[634px] pr-6 h-auto max-h-[723px] bg-base-200 flex flex-col pl-10 justify-start p-1 rounded-[0.5rem]">
            <h1 className="text-4xl font-bold mt-12 text-base-content">
              Your parking spot reservation
            </h1>
            <h4 className="text-gray-400">
              Selected Spot{" "}
              <span className="text-base-content">{reservation?.spot ?? "P-103, Parking -2"}</span>
            </h4>
            <section>
              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Selected Date
              </h4>
              <div className="p-5 flex items-center justify-start bg-base-100 w-[512px] h-[56px] rounded-[0.5rem]">
                <p className="text-base-content">{selectedDate}</p>
              </div>
              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Selected Time
              </h4>
              <div className="flex gap-10">
                <div className="p-5 flex items-center justify-start bg-base-100 w-[236px] h-[56px] rounded-[0.5rem]">
                  <p className="text-base-content">From {selectedTimeFrom}</p>
                </div>
                <div className="p-5 flex items-center justify-start bg-base-100 w-[236px] h-[56px] rounded-[0.5rem]">
                  <p className="text-base-content">To {selectedTimeTo}</p>
                </div>
              </div>
              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Selected Vehicle
              </h4>
              <div className="p-5 flex items-center justify-start bg-base-100 w-[512px] h-[56px] rounded-[0.5rem]">
                <p className="text-base-content">{reservation?.vehicle}</p>
              </div>
              <h4 className="text-base-content font-bold text-[1rem] mt-7 mb-3">
                Reservation Duration
              </h4>
              <div className="p-5 flex items-center justify-between bg-base-100 w-[512px] h-[56px] rounded-[0.5rem]">
                <p className="text-base-content">Total time :</p>
                <span className="text-green-500 text-2xl font-bold">
                  {getDuration(selectedTimeFrom, selectedTimeTo)}
                </span>
              </div>
            </section>
            <div className="flex justify-between w-[512px] mt-8 mb-8">
              <Button type="submit" className=" text-base-content bg-red-500 rounded-[0.5rem] h-10 w-50 " value="Raport an issue" />
              <Button type="submit" className=" text-base-content bg-accent rounded-[0.5rem] h-10 w-50 " value="Change your reservation" />
            </div>
          </div>

       
          <nav>
            <article className="text-base-content p-8 rounded-[0.5rem] bg-base-200 w-[362px] max-h-[723px] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6">Reservation History</h2>
              <form>
               <section className="flex flex-col gap-y-4">
    {history.map((item) => (
      <div key={item.id} className="flex flex-col gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[150px] p-3">
        <div><span className="font-bold">Date:</span> {item.start_date.split("T")[0].replace(/-/g, "/")}</div>
        <div><span className="font-bold">Time:</span> {item.start_date.split("T")[1]?.slice(0,5)} - {item.end_date.split("T")[1]?.slice(0,5)}</div>
        <div><span className="font-bold">Spot:</span> {item.spot}</div>
        <div><span className="font-bold">Vehicle:</span> {item.vehicle}</div>
      </div>
    ))}
    <div className="flex justify-end">
      <Button type="submit" className=" text-base-content bg-accent rounded-[0.5rem] h-10 w-full " value="View all History" />
    </div>
  </section>
              </form>
            </article>
          </nav>
        </div>
      </div>
    </PageTemplate>
  );
};

export default MyReservedParkingSpacePage;
