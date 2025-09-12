import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AddUserForm from "../components/admin/AddUserForm";
import UserTable from "../components/admin/UserTable";
import StoreTable from "../components/admin/StoreTable";
import AdminStats from "../components/admin/AdminStats";
import AddStoreForm from "../components/admin/AddStoreForm";
import UserDetailsModal from "../components/admin/UserDetailsModal";
import StoreDetailsModal from "../components/admin/StoreDetailsModal";
import { FaUsers, FaStore, FaStar } from "react-icons/fa";

const AdminDashboard = () => {
  const { user, logout, authHeaders } = useContext(AuthContext);

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const fetchAdminData = async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      const headers = authHeaders();
      const statsRes = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        { headers }
      );
      setStats(statsRes.data);

      const usersRes = await axios.get(
        "http://localhost:5000/api/admin/users",
        { headers }
      );
      setUsers(usersRes.data.users || []);

      const storesRes = await axios.get(
        "http://localhost:5000/api/admin/stores",
        { headers }
      );
      setStores(storesRes.data.stores || []);
    } catch (err) {
      console.error("Error fetching admin data:", err.response || err);
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-2 items-center">
          <p className="text-gray-700 font-medium">
            Welcome, {user?.name} ({user?.role})
          </p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition flex items-center gap-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow hover:shadow-lg transition">
            <div className="bg-blue-200 p-3 rounded-full">
              <FaUsers className="text-blue-700 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-700 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl shadow hover:shadow-lg transition">
            <div className="bg-green-200 p-3 rounded-full">
              <FaStore className="text-green-700 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-700 font-medium">Total Stores</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalStores}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl shadow hover:shadow-lg transition">
            <div className="bg-yellow-200 p-3 rounded-full">
              <FaStar className="text-yellow-700 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-700 font-medium">Total Ratings</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalRatings}</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Section */}
      <div className="space-y-4 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Users</h2>
          {!showAddUser && (
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
            >
              Add User
            </button>
          )}
        </div>
        {showAddUser && <AddUserForm onUserAdded={handleUserAdded} />}
        <UserTable
          users={users}
          onViewDetails={(id) => setSelectedUserId(id)}
        />
      </div>

      {/* Stores Section */}
      <div className="space-y-4 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Stores</h2>
          {!showAddStore && (
            <button
              onClick={() => setShowAddStore(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition"
            >
              Add Store
            </button>
          )}
        </div>
        {showAddStore && <AddStoreForm refresh={handleStoreAdded} />}
        <StoreTable
          stores={stores}
          onViewDetails={(id) => setSelectedStoreId(id)}
        />
      </div>

      {/* Modals */}
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
      {selectedStoreId && (
        <StoreDetailsModal
          storeId={selectedStoreId}
          onClose={() => setSelectedStoreId(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
