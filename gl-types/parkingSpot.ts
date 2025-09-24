export type ParkingSpotPL2 = {
  id: string;
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
  id: string;
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
  id: string;
  spot_number: string;
  floor: number;
  status: BackendSpotStatus;
  aisle: string;
};
export type SpotStatus = "available" | "reserved" | "occupied" | "yours";
export type BackendSpotStatus = "FREE" | "OCCUPIED";
