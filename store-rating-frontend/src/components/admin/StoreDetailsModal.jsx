// src/components/admin/StoreDetailsModal.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FaStar, FaStore, FaUser } from "react-icons/fa";

const StoreDetailsModal = ({ storeId, onClose }) => {
  const { authHeaders, logout } = useContext(AuthContext);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!storeId) return;
      setLoading(true);
      setError("");

      try {
        const headers = authHeaders();
        const res = await axios.get(`http://localhost:5000/api/admin/stores/${storeId}`, { headers });
        setStore(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          setError("Session expired. Please login again.");
        } else {
          setError(err.response?.data?.message || "Failed to load store details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [storeId, authHeaders, logout]);

  if (!storeId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaStore className="text-yellow-300" /> Store Details
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl font-bold transition-colors"
          >
            ✖
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500 font-semibold">{error}</div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Store Info Card */}
            <div className="bg-white rounded-lg shadow-md p-4 space-y-2 border border-gray-100 hover:shadow-lg transition-shadow">
              <p className="text-gray-700 flex items-center gap-2"><FaStore className="text-indigo-500" /> <span className="font-semibold">Name:</span> <span className="text-gray-800">{store.name}</span></p>
              <p className="text-gray-700 flex items-center gap-2"><FaUser className="text-green-500" /> <span className="font-semibold">Owner ID:</span> <span className="text-gray-800">{store.ownerId}</span></p>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> <span className="text-gray-800">{store.email}</span></p>
              <p className="text-gray-700"><span className="font-semibold">Address:</span> <span className="text-gray-800">{store.address}</span></p>
              <p className="text-gray-700 flex items-center gap-2"><FaStar className="text-yellow-400" /> <span className="font-semibold">Average Rating:</span> <span className="text-yellow-500 font-bold">{store.averageRating ?? 0}</span></p>
            </div>

            {/* Bottom Close Button */}
            <div className="text-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetailsModal;
