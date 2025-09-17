"use server";
import PageTemplate from "@/templates/PageTemplate";

import Welcome from "@/pages/Welcome";
import ParkingSpotMap from "@/components/parkingSpotMap/ParkingSpotMap";
import ParkingManager from "@/components/parkingManager/parkingManager";

export default async function Home() {
  // return <Welcome></Welcome>
  // return (
  //   <PageTemplate>
  //     {/* <ParkingSpotList parkingSpots={spotsPL2} level="PL2" /> */}
  //     <ParkingSpotList parkingSpots={spotsPL3} level="PL3" />
  //   </PageTemplate>
  // );
  return (
    <PageTemplate>
      {/* <ParkingSpotMap parkingSpots={spotsPL2} level="PL2" /> */}
      {/* <ParkingSpotMap parkingSpots={spotsPL3} level="PL3" /> */}
      <ParkingManager />
    </PageTemplate>
  );
}
