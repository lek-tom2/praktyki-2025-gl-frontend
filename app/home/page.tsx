"use client";
import PageTemplateAfterLogin from "../../templates/PageTemplateAfterLogin";
import Input from "@/components/input/input";
import ParkingManager from "@/components/parkingManager/parkingManager";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

export default function HomePage() {
	const [parkingList, setParkingList] = useState([]);
	const [reservations, setReservations] = useState([]);
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [availableCount, setAvailableCount] = useState(0);
	const [occupiedCount, setOccupiedCount] = useState(0);


		useEffect(() => {
			fetch("/api/parking/")
				.then((res) => res.json())
				.then((data) => setParkingList(data));
			fetch("/api/reservations/")
				.then((res) => res.json())
				.then((data) => setReservations(data));
		}, []);

			useEffect(() => {
				const fetchParking = async () => {
					try {
						const res = await fetch("/api/parking/");
						if (!res.ok) {
							toast.error(`Error fetching parking spots: ${res.status}`);
							return;
						}
						const data = await res.json();
						setParkingList(data);
						toast.success("Parking spots loaded");
					} catch (error) {
						toast.error("Failed to fetch parking spots");
					}
				};
				const fetchReservations = async () => {
					try {
						const res = await fetch("/api/reservations/");
						if (!res.ok) {
							toast.error(`Error fetching reservations: ${res.status}`);
							return;
						}
						const data = await res.json();
						setReservations(data);
						toast.success("Reservations loaded");
					} catch (error) {
						toast.error("Failed to fetch reservations");
					}
				};
				fetchParking();
				fetchReservations();
			}, []);

		useEffect(() => {
			if (!checkIn || !checkOut) {
				setAvailableCount(0);
				setOccupiedCount(0);
				return;
			}
			const checkInDate = new Date(checkIn);
			const checkOutDate = new Date(checkOut);
			let available = 0;
			let occupied = 0;
			parkingList.forEach((spot) => {
				const overlapping = reservations.some((r) => {
					if (r.spot !== spot.id) return false;
					const resStart = new Date(r.start_date);
					const resEnd = new Date(r.end_date);
					return (checkInDate < resEnd && checkOutDate > resStart);
				});
				if (overlapping) {
					occupied++;
				} else {
					available++;
				}
			});
			setAvailableCount(available);
			setOccupiedCount(occupied);
		}, [checkIn, checkOut, parkingList, reservations]);

	return (
    <PageTemplateAfterLogin>
			<div className="flex flex-col items-center w-full bg-white min-h-screen pb-8">
				<div className="w-full flex flex-row justify-center mt-8 gap-8">
					<div className="flex flex-col w-[25%] min-w-[220px] max-w-[340px]">
						<p className='text-left text-[#333446] text-base mb-2'>Check-in</p>
									<Input
										className='bg-[#000000] rounded-xl h-[56px] text-lg w-full px-6 placeholder:text-[#44465a]'
										type="date"
										name="check-in"
										value={checkIn}
										onChange={e => setCheckIn(e.target.value)}
									/>
					</div>
					<div className="flex flex-col w-[25%] min-w-[220px] max-w-[340px]">
						<p className='text-left text-[#333446] text-base mb-2'>Check-out</p>
									<Input
										className='bg-[#000000] rounded-xl h-[56px] text-lg w-full px-6 placeholder:text-[#44465a]'
										type="date"
										name="check-out"
										value={checkOut}
										onChange={e => setCheckOut(e.target.value)}
									/>
					</div>
				</div>
						<div className="mt-4 text-gray-500 text-sm">
							Parking spots: {parkingList.length} | Reservations: {reservations.length}<br />
							<span className="text-green-600 font-semibold">Available: {availableCount}</span> | <span className="text-red-600 font-semibold">Occupied: {occupiedCount}</span>
						</div>
				<div
					className="w-full flex justify-center mt-10 flex-grow overflow-hidden"
					style={{
						maxHeight: 'calc(100vh - 220px)', 
					}}
				>
					<ParkingManager />
				</div>
			</div>
    </PageTemplateAfterLogin>
	);
}