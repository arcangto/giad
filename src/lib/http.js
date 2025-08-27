import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  headers: { Accept: "application/json" },
  withCredentials: false, // GETs públicos a tu API
});

export default api;
