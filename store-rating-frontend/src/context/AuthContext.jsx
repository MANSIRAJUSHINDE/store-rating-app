import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional: loading state for initial fetch
  const [message, setMessage] = useState("");

  // Create an Axios instance with base URL
  const API = axios.create({ baseURL: "http://localhost:5000/api" });

  // Automatically attach token to every request
  API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Fetch logged-in user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await API.get("/auth/me");
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout(); // remove invalid token
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Signup
  const signup = async (name, email, password, address) => {
    const res = await API.post("/auth/signup", {
      name,
      email,
      password,
      address,
    });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        // Redirect based on role
        switch (res.data.user.role) {
          case "admin":
            navigate("/admin");
            break;
          case "store_owner":
            navigate("/owner");
            break;
          default:
            navigate("/user");
        }
      }, 1000);

      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Helper: get headers manually (optional)
  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: token ? `Bearer ${token}` : "" };
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, message, setMessage, authHeaders, API }}
    >
      {children}
    </AuthContext.Provider>
  );
};
