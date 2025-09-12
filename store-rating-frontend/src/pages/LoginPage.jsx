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
      </div>
    </div>
  );
};

export default LoginPage;
