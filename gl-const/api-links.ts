const host = "http://localhost:8000";
const useProxy = true; // Set to true to use Next.js proxy, false for direct calls

const getUrl = (endpoint: string) => {
  if (useProxy) {
    return `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;
  }
  return host + endpoint;
};

export const ApiLinks = {
  login: getUrl("/api/login/"),
  adminLogin: getUrl("/api/login/"),
  register: getUrl("/api/register/"),
  jwtVerify: getUrl("/api/token/access/"),
  jwtLogin: getUrl("/api/token/login/"),
  refresh: getUrl("/api/token/refresh/"),
  listParkingSpaces: getUrl("/api/parking/"),
  listReservations: getUrl("/api/reservations/list/"),
  // Admin endpoints - using Django's custom endpoints  
  listUsers: getUrl("/api/employees/"),  
  listCars: getUrl("/api/vehicles/"),    
  // Use Django's custom endpoints for user operations
  updateUser: (id: number) => getUrl("/api/user/update/"), // Django custom endpoint
  deleteUser: (id: number) => getUrl("/api/user/delete/"), // Django custom endpoint
  // RESTful endpoints for other resources
  updateCar: (id: number) => getUrl(`/api/vehicles/${id}/`), 
  deleteCar: (id: number) => getUrl(`/api/vehicles/${id}/`), 
  updateParkingSpot: (id: number) => getUrl(`/api/parking/${id}/`),
  deleteParkingSpot: (id: number) => getUrl(`/api/parking/${id}/`),
} as const;
