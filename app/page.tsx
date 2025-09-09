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
  { name: "C203", aviability: 1 },
  { name: "C203", aviability: 0 },
  { name: "C203", aviability: 2 },
  { name: "C203", aviability: 2 },
  { name: "C203", aviability: 1 },
  { name: "C203", aviability: 0 },
  { name: "C203", aviability: 2 },
  { name: "C203", aviability: 2 },
  { name: "C203", aviability: 1 },
  { name: "C203", aviability: 0 },
  { name: "C203", aviability: 2 },
  { name: "C203", aviability: 2 },
  { name: "C203", aviability: 1 },
  { name: "C203", aviability: 0 },
  { name: "C203", aviability: 2 },
  { name: "C203", aviability: 2 },
];
// ->test data

export default function Home() {
  return (
    <PageTemplate>
      <ParkingSpotList parkingSpots={spots} />
    </PageTemplate>
  );
}
