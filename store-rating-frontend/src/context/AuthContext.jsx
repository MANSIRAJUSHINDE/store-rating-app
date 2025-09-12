import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch logged-in user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        logout(); // remove invalid token
      }
    };
    fetchUser();
  }, []);

  const signup = async (name, email, password, address, role) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      { name, email, password, address, role },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        if (res.data.user.role === "admin") navigate("/admin");
        else if (res.data.user.role === "store_owner") navigate("/owner");
        else navigate("/user");
      }, 1500);

      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Helper to get headers with token
  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: token ? `Bearer ${token}` : "" };
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, message, setMessage, authHeaders }}
    >
      {children}
    </AuthContext.Provider>
  );
};
