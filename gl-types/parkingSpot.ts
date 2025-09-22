export type ParkingSpotPL2 = {
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
export type ParkingSpotPL3 = {
  name: string;
  aviability: SpotStatus;
  buildingPhoto?: string;
  aisle:
    | "mainAisleLeft"
    | "topAisleTop"
    | "topAisleBottom"
    | "bottomAisleTop"
    | "bottomAisleBottom";
};

export type ParkingSpotBackend = {
  spot_number: string;
  floor: number;
  status: SpotStatus;
  aisle: string;
};
export type SpotStatus = "available" | "reserved" | "occupied" | "yours";
