// src/hooks/useAxiosJWT.js
import { useEffect } from "react";
import api from "../services/api";

// This is currently basic because we store backend JWT in localStorage
// Expand with refresh logic or cookie-based JWT if desired
const useAxiosJWT = () => {
  useEffect(() => {
    // no-op for now (api already reads localStorage)
    // Could add interceptor to refresh token from firebase if backend returns 401
  }, []);
  return api;
};

export default useAxiosJWT;
