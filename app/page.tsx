"use client";
import PageTemplate from "@/templates/PageTemplate";
import Image from "next/image";
import Welcome from "@/pages/Welcome";
import Input from "@/components/input/input";
import Button from "@/components/button";
import { ParkingSpot } from "@/gl-types/parkingSpot";
import ParkingSpotList from "@/components/parkingSpotList/ParkingSpotList";

// test data<-
const spots: ParkingSpot[] = [
  { name: "C203", aviability: 1, pricePerHour: 20 },
  { name: "C204", aviability: 0 },
  { name: "C205", aviability: 2 },
  { name: "C206", aviability: 2 },
  { name: "C207", aviability: 1 },
  { name: "C208", aviability: 0 },
  { name: "C209", aviability: 2 },
  { name: "C210", aviability: 2 },
  { name: "C211", aviability: 1 },
  { name: "C212", aviability: 0 },
  { name: "C213", aviability: 2 },
  { name: "C214", aviability: 2 },
  { name: "C215", aviability: 1 },
  { name: "C216", aviability: 0 },
  { name: "C217", aviability: 2 },
  { name: "C218", aviability: 2 },
];
// ->test data

export default function Home() {
  return (
    <PageTemplate>
      <ParkingSpotList parkingSpots={spots} />
    </PageTemplate>
  );
}
