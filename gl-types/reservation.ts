import { User } from "./user-types";
import { Vehicle } from "./vehicle";

export type Reservation = {
  id: number;
  spot: number;
  start_date: string;
  end_date: string;
  user: User;
  vehicle: Vehicle;
};
