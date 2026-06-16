<<<<<<< HEAD
import React from "react";
=======
// src/App.jsx
import React, { useState } from "react";
>>>>>>> ac1d318 (Add source code files)
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

<<<<<<< HEAD
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
=======
        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard onOpenPassword={() => setShowPasswordModal(true)} />
            </ProtectedRoute>
          }
        />

        {/* OWNER DASHBOARD */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute roles={["store_owner"]}>
              <OwnerDashboard onOpenPassword={() => setShowPasswordModal(true)} />
            </ProtectedRoute>
          }
        />

        {/* USER DASHBOARD (FIXED ROLE CAPTURE) */}
        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["normal"]}>
              <UserDashboard onOpenPassword={() => setShowPasswordModal(true)} />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* GLOBAL PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0b1220] p-6 rounded-2xl relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3 text-white text-xl"
            >
              ✕
            </button>
            <UpdatePasswordForm />
          </div>
        </div>
      )}
    </>
>>>>>>> ac1d318 (Add source code files)
  );
};

export default App;
