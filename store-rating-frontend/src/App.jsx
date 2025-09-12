import React from "react";
import { Routes, Route } from "react-router-dom";
import GetStartedPage from "./pages/GetStartedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};

export default App;
