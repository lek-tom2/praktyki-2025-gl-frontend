const host = "http://localhost:8000";

export const ApiLinks = {
  login: host + "/api/login/",
  register: host + "/api/register/",
  jwtVerify: host + "/api/token/access/",
<<<<<<< HEAD
  jwtLogin: host + "/api/token/login/",
=======
  jwtLogin: host + "/api/token/login/",
>>>>>>> 797999ab
  listParkingSpaces: host + "/api/parking/list/",
} as const;
