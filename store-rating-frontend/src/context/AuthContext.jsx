import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

// Create context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
        logout();
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
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
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

  // Helper for manual auth headers
  const authHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        message,
        setMessage,
        authHeaders,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};