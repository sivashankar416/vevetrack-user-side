import api from "./axios";

export async function createBookingRequest(payload) {
  const response = await api.post("/bookings", payload);
  return response.data;
}

export async function getBookingsRequest(params = {}) {
  const response = await api.get("/bookings", { params });
  return response.data;
}
