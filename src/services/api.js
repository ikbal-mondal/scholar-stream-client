// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// });
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Attach backend JWT automatically
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("APP_JWT"); // change to cookie approach if preferred
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    /* ignore */
  }
  return config;
});

export default api;
