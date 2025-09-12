// src/pages/UserDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RateStoreForm from "../components/user/RateStoreForm";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await API.get(`/stores?search=${search}`);
        setStores(res.data);
      } catch (err) {
        console.error("Failed to fetch stores", err);
      }
    };
    fetchStores();
  }, [search]);

  return (
    <ProtectedRoute roles={["user"]}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
        <button
          onClick={logout}
          className="mb-6 bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>

        {/* Search stores */}
        <input
          type="text"
          placeholder="Search stores by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-6"
        />

        {/* Stores list */}
        <div className="space-y-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{store.name}</p>
                <p>{store.address}</p>
                <p>Average Rating: {store.averageRating || 0}</p>
              </div>
              <RateStoreForm storeId={store.id} userRating={store.userRating} />
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboard;
