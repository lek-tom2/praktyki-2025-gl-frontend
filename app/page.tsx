export const dynamic = "force-dynamic";
import PageTemplate from "@/templates/PageTemplate";

import Welcome from "@/pages/Welcome";
import ParkingSpotMap from "@/components/parkingSpotMap/ParkingSpotMap";
import ParkingManager from "@/components/parkingManager/parkingManager";

export default async function Home() {
  return <Welcome></Welcome>

}
