const host = "http://localhost:8000";

export const ApiLinks = {
  login: host + "/api/login/",
  register: host + "/api/register/",
  jwtVerify: host + "/api/token/access/",
  jwtLogin: host + "/api/token/login/",
  refresh: host + "/api/token/refresh/",
  listParkingSpaces: host + "/api/parking/",
  listParkingDetails: (id: string) => {
    return host + "/api/parking/" + id + "/";
  },
  listVehicles: host + "/api/vehicles/",
  listReservations: host + "/api/reservations/list/",
  listReservaitonDetails: (id: string) => {
    return host + "/api/reservations/" + id + "/";
  },
  createReservation: host + "/api/reservations/create/",
  updateReservation: (id: string) => `${host}/api/reservations/${id}/update/`,
  deleteReservation: (id: string) => `${host}/api/reservations/${id}/delete/`,
} as const;
