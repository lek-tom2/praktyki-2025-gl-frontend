const host = "http://localhost:8000";

export const ApiLinks = {
  login: host + "/api/login/",
  register: host + "/api/register/",
  jwtVerify: host + "/api/token/access/",
  jwtLogin: host + "/api/token/login/",
  refresh: host + "/api/token/refresh/",
  listParkingSpaces: host + "/api/parking/",
  listParkingDetails: (id: string) => {
    return host + "/api/parking/" + id;
  },
  listVehicles: host + "/api/vehicles/",
  listReservations: host + "/api/reservations/list/",
  createReservation: host + "/api/reservations/create/",
} as const;
