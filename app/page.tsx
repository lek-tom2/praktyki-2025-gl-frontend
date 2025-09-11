"use server";
import PageTemplate from "@/templates/PageTemplate";
import Welcome from "@/pages/Welcome";
import ParkingSpotMap from "@/components/parkingSpotMap/ParkingSpotMap";
import { ParkingSpot } from "@/gl-types/parkingSpot";
import ParkingSpotList from "@/components/parkingSpotList/ParkingSpotList";

const spots: ParkingSpot[] = [
  {
    name: "B202",
    aviability: "yours",
    aisle: "mainAisleLeft",
  },
  {
    name: "B203",
    aviability: "occupied",
    aisle: "mainAisleLeft",
  },
  {
    name: "B229",
    aviability: "reserved",
    aisle: "mainAisleRight",
  },
  {
    name: "B230",
    aviability: "available",
    aisle: "mainAisleRight",
  },
  {
    name: "B231",
    aviability: "available",
    aisle: "mainAisleRight",
  },
  {
    name: "C216",
    aviability: "occupied",
    aisle: "mainAisleLeft",
  },
  {
    name: "C217",
    aviability: "available",
    aisle: "mainAisleLeft",
  },
  {
    name: "C218",
    aviability: "occupied",
    aisle: "mainAisleLeft",
  },
  {
    name: "C219",
    aviability: "occupied",
    aisle: "mainAisleLeft",
  },
  {
    name: "C220",
    aviability: "available",
    aisle: "mainAisleLeft",
  },
  {
    name: "C221",
    aviability: "available",
    aisle: "mainAisleLeft",
  },
  {
    name: "C222",
    aviability: "reserved",
    aisle: "mainAisleLeft",
  },
  {
    name: "C223",
    aviability: "available",
    aisle: "mainAisleLeft",
  },
  {
    name: "C237",
    aviability: "reserved",
    aisle: "mainAisleRight",
  },
  {
    name: "C238",
    aviability: "occupied",
    aisle: "mainAisleRight",
  },
  {
    name: "C239",
    aviability: "reserved",
    aisle: "mainAisleRight",
  },
  {
    name: "C240",
    aviability: "occupied",
    aisle: "mainAisleRight",
  },
  {
    name: "C242",
    aviability: "reserved",
    aisle: "mainAisleRight",
  },
  {
    name: "C243",
    aviability: "available",
    aisle: "mainAisleRight",
  },
  {
    name: "C247",
    aviability: "available",
    aisle: "mainAisleRight",
  },
  {
    name: "C248",
    aviability: "available",
    aisle: "mainAisleRight",
  },
  {
    name: "C249",
    aviability: "occupied",
    aisle: "mainAisleRight",
  },
  {
    name: "B209",
    aviability: "available",
    aisle: "leftAisleRight",
  },
  {
    name: "B210",
    aviability: "reserved",
    aisle: "leftAisleRight",
  },
  {
    name: "B211",
    aviability: "occupied",
    aisle: "leftAisleRight",
  },
  {
    name: "B215",
    aviability: "available",
    aisle: "leftAisleRight",
  },
  {
    name: "B216",
    aviability: "available",
    aisle: "leftAisleRight",
  },
  {
    name: "B217",
    aviability: "occupied",
    aisle: "leftAisleRight",
  },
  {
    name: "B218",
    aviability: "reserved",
    aisle: "leftAisleRight",
  },
  {
    name: "B219",
    aviability: "available",
    aisle: "leftAisleRight",
  },
  {
    name: "B221",
    aviability: "occupied",
    aisle: "leftAisleLeft",
  },
  {
    name: "B222",
    aviability: "reserved",
    aisle: "leftAisleLeft",
  },
  {
    name: "B223",
    aviability: "reserved",
    aisle: "leftAisleLeft",
  },
  {
    name: "B224",
    aviability: "reserved",
    aisle: "leftAisleLeft",
  },
  {
    name: "B225",
    aviability: "reserved",
    aisle: "leftAisleLeft",
  },
  {
    name: "B226",
    aviability: "reserved",
    aisle: "leftAisleLeft",
  },
  {
    name: "B227",
    aviability: "available",
    aisle: "leftAisleLeft",
  },
  {
    name: "B228",
    aviability: "reserved",
    aisle: "leftAisleLeft",
  },
  {
    name: "C201",
    aviability: "occupied",
    aisle: "leftAisleLeft",
  },
  {
    name: "C202",
    aviability: "available",
    aisle: "leftAisleLeft",
  },
  {
    name: "C203",
    aviability: "reserved",
    aisle: "leftAisleLeft",
  },
  {
    name: "C204",
    aviability: "available",
    aisle: "leftAisleLeft",
  },
  {
    name: "C208",
    aviability: "reserved",
    aisle: "leftAisleRight",
  },
  {
    name: "C209",
    aviability: "available",
    aisle: "leftAisleRight",
  },
  {
    name: "C210",
    aviability: "occupied",
    aisle: "leftAisleRight",
  },
  {
    name: "C211",
    aviability: "reserved",
    aisle: "leftAisleRight",
  },
  {
    name: "C212",
    aviability: "reserved",
    aisle: "leftAisleRight",
  },
  {
    name: "C213",
    aviability: "occupied",
    aisle: "leftAisleRight",
  },
  {
    name: "C214",
    aviability: "occupied",
    aisle: "leftAisleRight",
  },
  {
    name: "C215",
    aviability: "available",
    aisle: "leftAisleRight",
  },
  {
    name: "C257",
    aviability: "available",
    aisle: "rightAisleLeft",
  },
  {
    name: "C258",
    aviability: "reserved",
    aisle: "rightAisleLeft",
  },
  {
    name: "A257",
    aviability: "available",
    aisle: "tunnel",
  },
  {
    name: "A258",
    aviability: "occupied",
    aisle: "tunnel",
  },
];

export default async function Home() {
  // return <Welcome></Welcome>
  // return (
  //   <PageTemplate>
  //     <ParkingSpotList parkingSpots={spots} />
  //   </PageTemplate>
  // );
  return (
    <PageTemplate>
      <ParkingSpotMap parkingSpots={spots} />
    </PageTemplate>
  );
}
