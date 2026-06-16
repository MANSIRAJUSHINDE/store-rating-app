import axios from 'axios';

// HARDCODED FIX: Directly maps request pathways to your production Render server
const rawUrl = "https://store-rating-backend-v986.onrender.com";

const API = axios.create({
  baseURL: `${rawUrl}/api`,
});

// Automatically inject JWT Token into request headers if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // This works perfectly!
}, (error) => {
  return Promise.reject(error);
});

// FIX: Add a response interceptor to handle global errors (like an expired token)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and kick out user if unauthorized/session expired
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;