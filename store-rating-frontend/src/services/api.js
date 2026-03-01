import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Helper to set token in headers
export const setToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;