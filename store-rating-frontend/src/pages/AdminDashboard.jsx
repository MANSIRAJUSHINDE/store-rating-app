import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
=======
import axios from "axios";
import { motion } from "framer-motion";
import AdminCharts from "../components/admin/AdminCharts";

import {
  FaUsers,
  FaStore,
  FaChartLine,
  FaPlus,
  FaUserShield,
} from "react-icons/fa";

>>>>>>> ac1d318 (Add source code files)
import { AuthContext } from "../context/AuthContext";
import AddUserForm from "../components/admin/AddUserForm";
import UserTable from "../components/admin/UserTable";
import StoreTable from "../components/admin/StoreTable";
import AddStoreForm from "../components/admin/AddStoreForm";
import UserDetailsModal from "../components/admin/UserDetailsModal";
import StoreDetailsModal from "../components/admin/StoreDetailsModal";
import AdminStats from "../components/admin/AdminStats";
import Header from "../components/common/Header"; 

const AdminDashboard = () => {
  // FIXED: Extracted the configured API client directly from your context provider
  const { user, logout, API } = useContext(AuthContext);

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

<<<<<<< HEAD
=======
  const [showPasswordModal, setShowPasswordModal] = useState(false);

>>>>>>> ac1d318 (Add source code files)
  const fetchAdminData = async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      // FIXED: Using interceptor-powered API instance instead of raw axios with localhost strings
      const statsRes = await API.get("/admin/dashboard");
      setStats(statsRes.data);

      const usersRes = await API.get("/admin/users");
      setUsers(usersRes.data.users || []);

      const storesRes = await API.get("/admin/stores");
      setStores(storesRes.data.stores || []);
    } catch (err) {
      console.error(err.response || err);
      if (err.response?.status === 401) {
        logout();
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || "Failed to load admin data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [user]);

  const handleUserAdded = () => {
    setShowAddUser(false);
    fetchAdminData();
  };

  const handleStoreAdded = () => {
    setShowAddStore(false);
    fetchAdminData();
  };

  if (loading)
    return <div className="p-8 text-center text-gray-600">Loading dashboard...</div>;

  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchAdminData}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header title="Admin Dashboard" user={user} logout={logout} />

<<<<<<< HEAD
      <div className="pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {stats && (
          <div className="mb-8">
            <AdminStats stats={stats} />
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 truncate">Users</h2>
            {!showAddUser && (
              <button
                onClick={() => setShowAddUser(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition text-sm sm:text-base"
              >
                Add User
              </button>
            )}
          </div>
          <UserTable users={users} onViewDetails={(id) => setSelectedUserId(id)} />
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 truncate">Stores</h2>
            {!showAddStore && (
              <button
                onClick={() => setShowAddStore(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition text-sm sm:text-base"
              >
                Add Store
              </button>
            )}
          </div>
          <StoreTable stores={stores} onViewDetails={(id) => setSelectedStoreId(id)} />
        </div>
=======
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* Header */}
      <Header
        title="Admin Dashboard"
        user={user}
        logout={logout}
        onOpenPassword={() => setShowPasswordModal(true)}
      />

      {/* Main */}
      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-10">

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

            <div className="flex items-center gap-5">

              <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <FaUserShield className="text-5xl text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  Welcome Admin
                </h1>

                <p className="text-gray-300 mt-2 text-lg">
                  Manage stores, users and platform analytics
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() => setShowAddUser(true)}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition"
              >
                <FaPlus />
                Add User
              </button>

              <button
                onClick={() => setShowAddStore(true)}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/20 transition"
              >
                <FaPlus />
                Add Store
              </button>

            </div>
          </div>
        </motion.div>

        {/* Stats + Charts */}
{stats && (
  <>
    <div className="mb-8">
      <AdminStats stats={stats} />
    </div>

    {/* 👇 ADD CHARTS RIGHT BELOW STATS */}
    <AdminCharts stats={stats} />
  </>
)}

        {/* Users */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl mb-8"
        >
          <UserTable
            users={users}
            onViewDetails={(id) => setSelectedUserId(id)}
          />
        </motion.div>

        {/* Stores */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl"
        >
          <StoreTable
            stores={stores}
            onViewDetails={(id) => setSelectedStoreId(id)}
          />
        </motion.div>
>>>>>>> ac1d318 (Add source code files)
      </div>

      {showAddUser && (
<<<<<<< HEAD
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="w-full max-w-lg p-6 relative bg-white border border-gray-300">
=======
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] p-6 relative">
>>>>>>> ac1d318 (Add source code files)
            <button
              onClick={() => setShowAddUser(false)}
              className="absolute left-3 top-3 text-2xl text-indigo-600 hover:text-indigo-800 transition"
            >
              ✖
            </button>
            <AddUserForm onUserAdded={handleUserAdded} />
          </div>
        </div>
      )}

<<<<<<< HEAD
      {showAddStore && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="w-full max-w-lg p-6 relative bg-white border border-gray-300">
=======
      {/* ADD STORE */}
      {showAddStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] p-6 relative">
>>>>>>> ac1d318 (Add source code files)
            <button
              onClick={() => setShowAddStore(false)}
              className="absolute left-3 top-3 text-2xl text-indigo-600 hover:text-indigo-800 transition"
            >
              ✖
            </button>
            <AddStoreForm refresh={handleStoreAdded} />
          </div>
        </div>
      )}

<<<<<<< HEAD
      {selectedUserId && (
        <UserDetailsModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
=======
      {/* 🔥 FIXED: USER DETAILS MODAL */}
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}

      {/* STORE DETAILS MODAL */}
      {selectedStoreId && (
        <StoreDetailsModal
          storeId={selectedStoreId}
          onClose={() => setSelectedStoreId(null)}
        />
      )}

      {/* PASSWORD MODAL */}
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
>>>>>>> ac1d318 (Add source code files)
      )}

      {selectedStoreId && (
        <StoreDetailsModal storeId={selectedStoreId} onClose={() => setSelectedStoreId(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;