export type ParkingSpot = {
  name: string;
  aviability: SpotStatus;
  buildingPhoto?: string;
  aisle:
    | "mainAisleLeft"
    | "mainAisleRight"
    | "leftAisleLeft"
    | "leftAisleRight"
    | "rightAisleLeft"
    | "rightAisleRight"
    | "tunnel";
};
export type SpotStatus = "available" | "reserved" | "occupied" | "yours";
