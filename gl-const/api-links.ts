const host = "http://localhost:8000";

export const ApiLinks = {
  login: host + "/api/login/",
  register: host + "/api/register/",
  jwtVerify: host + "/api/token/access/",
  jwtLogin: host + "/api/token/login/",
  listParkingSpaces: host + "/api/parking/list/",
} as const;
