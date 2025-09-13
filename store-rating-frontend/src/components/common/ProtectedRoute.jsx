// src/components/common/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ roles, children }) => {
  const { user, loading } = useContext(AuthContext); // ✅ include loading

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
