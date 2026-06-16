<<<<<<< HEAD
import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Store Rating
        </h2>
        <LoginForm />
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create Account
          </Link>
        </p>
=======
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      const msg = err?.response?.data?.message;

      if (!err.response) {
        setError("Login failed: Check internet or server");
      } else if (msg?.toLowerCase().includes("not found")) {
        setError("User does not exist, please sign up");
      } else if (
        msg?.toLowerCase().includes("invalid") ||
        msg?.toLowerCase().includes("password")
      ) {
        setError("Invalid credentials");
      } else {
        setError(msg || "Login failed");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050816] text-white px-4">

      {/* BACKGROUND BLUR */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 opacity-30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600 opacity-30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE - FORM */}
          <div className="space-y-6">

            <h2 className="text-3xl sm:text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-gray-300">
              Login to explore stores and manage your dashboard.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-2 rounded-xl">
                {error}
              </div>
            )}

            {/* INPUTS */}
            <div className="space-y-4">

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none"
                />
              </div>

              {/* PASSWORD WITH TOGGLE */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none"
                />

                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold flex items-center justify-center gap-3"
            >
              Login <FaArrowRight />
            </button>

            {/* SIGNUP */}
            <div className="text-center mt-6 text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-400 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>

          </div>

          {/* RIGHT SIDE - DEMO BOX */}
          <div className="grid gap-6">

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-indigo-300">Admin</h3>
              <p className="text-gray-300">admin@example.com</p>
              <p className="text-gray-400">Admin@123</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-purple-300">Store Owner</h3>
              <p className="text-gray-300">owner@example.com</p>
              <p className="text-gray-400">Owner@123</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-pink-300">User</h3>
              <p className="text-gray-300">user1@gmail.com</p>
              <p className="text-gray-400">User@123</p>
            </div>

          </div>

        </div>
>>>>>>> ac1d318 (Add source code files)
      </div>
    </div>
  );
};

export default LoginPage;
