import axios from "axios";

// Create axios instance
const API = axios.create({
  // FIXED: Secure template strings dynamically pulling from production configuration routing profiles
  baseURL: `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api`,
});

// Request interceptor: Automatically attaches the token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Helper to manually set/remove token if needed 
 * (Useful for immediate updates after Login/Logout)
 */
export const setToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;