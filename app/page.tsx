"use server";
import PageTemplate from "@/templates/PageTemplate";
import ParkingSpotMap from "@/components/parkingSpotMap/ParkingSpotMap";
import { spotsPL2, spotsPL3 } from "@/gl-const/parking-spots-test-data";
import ParkingSpotList from "@/components/parkingSpotList/ParkingSpotList";

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
      <ParkingSpotMap parkingSpots={spotsPL2} level="PL2" />
      {/* <ParkingSpotMap parkingSpots={spotsPL3} level="PL3" /> */}
    </PageTemplate>
  );
}
