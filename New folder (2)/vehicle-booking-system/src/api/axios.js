import axios from "axios";

const api = axios.create({ baseURL: "https://project2-xjfq.onrender.com/api" });
export const login = (email, password) => api.post("/auth/login", { email, password });
export const register = (dto) => api.post("/auth/register", dto);

export const getVehicles = () => api.get("/vehicles");
export const getAllVehicles = () => api.get("/vehicles/all");
export const addVehicle = (dto) => api.post("/vehicles", dto);
export const updateVehicle = (id, dto) => api.put(`/vehicles/${id}`, dto);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

export const getAllBookings = () => api.get("/booking");
export const createBooking = (dto) => api.post("/booking", dto);
export const approveBooking = (id) => api.put(`/booking/${id}/approve`);
export const rejectBooking = (id) => api.put(`/booking/${id}/reject`);
export const cancelBooking = (id) => api.put(`/booking/${id}/cancel`);
export const deleteBooking = (id) => api.delete(`/booking/${id}`);

export const getAllUsers = () => api.get("/users");
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const UserRole = { Company: 0, Vehicle: 1, Admin: 2 };
export const BookingStatusLabel = {
  0: "Available", 1: "Pending", 2: "Confirmed", 3: "Rejected", 4: "Cancelled",
};

export const CANCELLATION_FEE_RATE = 0.10; // 10% fee for confirmed bookings

export default api;
