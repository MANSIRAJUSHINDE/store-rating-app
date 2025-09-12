// src/pages/OwnerDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/common/ProtectedRoute";
import StoreRatings from "../components/owner/StoreRatings";

const OwnerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await API.get(`/stores/${user.storeId}/ratings`);
        setRatings(res.data.ratings);
        setAvgRating(res.data.avgRating);
      } catch (err) {
        console.error("Failed to fetch ratings", err);
      }
    };
    fetchRatings();
  }, [user.storeId]);

  return (
    <ProtectedRoute roles={["store_owner"]}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Store Dashboard: {user.storeName}
        </h1>
        <button
          onClick={logout}
          className="mb-6 bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>

        <p className="mb-4 font-semibold">Average Rating: {avgRating}</p>
        <StoreRatings ratings={ratings} />
      </div>
    </ProtectedRoute>
  );
};

export default OwnerDashboard;
