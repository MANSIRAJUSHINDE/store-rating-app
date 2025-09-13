// src/pages/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AddUserForm from "../components/admin/AddUserForm";
import UserTable from "../components/admin/UserTable";
import StoreTable from "../components/admin/StoreTable";
import AddStoreForm from "../components/admin/AddStoreForm";
import UserDetailsModal from "../components/admin/UserDetailsModal";
import StoreDetailsModal from "../components/admin/StoreDetailsModal";
import AdminStats from "../components/admin/AdminStats";
import Header from "../components/common/Header"; // ✅ Import the reusable Header

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
      const statsRes = await axios.get("http://localhost:5000/api/admin/dashboard", { headers });
      setStats(statsRes.data);

      const usersRes = await axios.get("http://localhost:5000/api/admin/users", { headers });
      setUsers(usersRes.data.users || []);

      const storesRes = await axios.get("http://localhost:5000/api/admin/stores", { headers });
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

      {/* ✅ Sticky full-width header */}
      <Header title="Admin Dashboard" user={user} logout={logout} />

      {/* ✅ Main content with responsive padding, offset for sticky header */}
      <div className="pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

        {/* Stats Section */}
        {stats && (
          <div className="mb-8">
            <AdminStats stats={stats} />
          </div>
        )}

        {/* Users Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 truncate">
              Users
            </h2>
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

        {/* Stores Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 truncate">
              Stores
            </h2>
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

      </div>

      {/* ✅ Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="w-full max-w-lg p-6 relative bg-white border border-gray-300">
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

      {/* ✅ Add Store Modal */}
      {showAddStore && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="w-full max-w-lg p-6 relative bg-white border border-gray-300">
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

      {/* ✅ User Details Modal */}
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}

      {/* ✅ Store Details Modal */}
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
