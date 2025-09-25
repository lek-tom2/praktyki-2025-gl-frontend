const host = "http://localhost:8000";
const useProxy = true; // Set to true to use Next.js proxy, false for direct calls

const getUrl = (endpoint: string) => {
  if (useProxy) {
    return `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;
  }
  return host + endpoint;
};

export const ApiLinks = {
  // Authentication endpoints
  login: getUrl("/api/login/"),
  adminLogin: getUrl("/api/login/"),
  register: getUrl("/api/register/"),
  jwtVerify: getUrl("/api/token/access/"),
  jwtLogin: getUrl("/api/token/login/"),
  refresh: getUrl("/api/token/refresh/"),
  
  // Parking spaces endpoints
  listParkingSpaces: getUrl("/api/parking/"),
  listParkingDetails: (id: string) => getUrl("/api/parking/" + id + "/"),
  updateParkingSpot: (id: number) => getUrl(`/api/parking/${id}/`),
  deleteParkingSpot: (id: number) => getUrl(`/api/parking/${id}/`),
  
  // Vehicle endpoints
  listVehicles: getUrl("/api/vehicles/"),
  listCars: getUrl("/api/vehicles/"),
  updateCar: (id: number) => getUrl(`/api/vehicles/${id}/`), 
  deleteCar: (id: number) => getUrl(`/api/vehicles/${id}/`),
  
  // Reservation endpoints
  listReservations: getUrl("/api/reservations/list/"),
  listReservaitonDetails: (id: string) => getUrl("/api/reservations/" + id + "/"),
  createReservation: getUrl("/api/reservations/create/"),
  updateReservation: (id: string) => getUrl(`/api/reservations/${id}/update/`),
  deleteReservation: (id: string) => getUrl(`/api/reservations/${id}/delete/`),
  
  // Admin endpoints - using Django's custom endpoints  
  listUsers: getUrl("/api/employees/"),
  // Use Django's custom endpoints for user operations
  updateUser: (id: number) => getUrl("/api/user/update/"), // Django custom endpoint
  deleteUser: (id: number) => getUrl("/api/user/delete/"), // Django custom endpoint
} as const;
