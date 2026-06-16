<<<<<<< HEAD
=======
// src/context/AuthContext.jsx

>>>>>>> ac1d318 (Add source code files)
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

<<<<<<< HEAD
  // Fetch logged-in user on app load
=======
  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // ✅ GET USER ON REFRESH
>>>>>>> ac1d318 (Add source code files)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

<<<<<<< HEAD
        if (token) {
          const res = await API.get("/auth/me");
          setUser(res.data.user);
        }
=======
        if (!token || token === "null") {
          setLoading(false);
          return;
        }

        setToken(token);

        const res = await API.get("/auth/me");
        setUser(res.data.user);
>>>>>>> ac1d318 (Add source code files)
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

<<<<<<< HEAD
  // Signup
=======
  // ✅ SIGNUP
>>>>>>> ac1d318 (Add source code files)
  const signup = async (name, email, password, address) => {
    const res = await API.post("/auth/signup", {
      name,
      email,
      password,
      address,
    });

<<<<<<< HEAD
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    return res.data;
  };

  // Login
=======
      setMessage("Signup successful!");
      return res.data;
    } catch (error) {
      console.log("Signup error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  // ✅ LOGIN (FIXED SWITCH & ROUTING RACE CONDITION)
>>>>>>> ac1d318 (Add source code files)
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setMessage("Login successful! Redirecting...");

      // ✅ Instantly route without setTimeout to fix redirection bugs
      switch (res.data.user.role) {
        case "admin":
          navigate("/admin");
          break;

        case "store_owner":
          navigate("/owner");
          break;

<<<<<<< HEAD
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
=======
        case "normal":
        default:
          navigate("/user");
          break;
      }

      return res.data;
    } catch (error) {
      console.log("Login error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  // ✅ AUTH HEADERS
>>>>>>> ac1d318 (Add source code files)
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