const host = "http://localhost:8000";

export const ApiLinks = {
  login: host + "/api/login/",
  register: host + "/api/register/",
  jwtVerify: host + "/api/token/access/",
  jwtLogin: host + "/api/token/login/",
  refresh: host + "/api/token/refresh/",
  listParkingSpaces: host + "/api/parking/",
  listReservations: host + "/api/reservations/list/",
} as const;
