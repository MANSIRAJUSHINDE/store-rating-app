// src/components/admin/StoreRatingsModal.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FaStar, FaUser } from "react-icons/fa";

const StoreRatingsModal = ({ storeId, onClose }) => {
  const { authHeaders, logout } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      setError("");
      try {
        const headers = authHeaders();
        const res = await axios.get(
          `http://localhost:5000/api/admin/stores/${storeId}/ratings`,
          { headers }
        );
        setRatings(res.data.ratings || []);
      } catch (err) {
        if (err.response?.status === 401) logout();
        setError(err.response?.data?.message || "Failed to load ratings");
      } finally {
        setLoading(false);
      }
    };

    if (storeId) fetchRatings();
  }, [storeId, authHeaders, logout]);

  if (!storeId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto relative border border-gray-200">
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Store Ratings
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl font-bold transition-colors"
          >
            ✖
          </button>
        </div>

        <div className="p-6 space-y-4">
          {loading ? (
            <p className="text-gray-600 text-center">Loading ratings...</p>
          ) : error ? (
            <p className="text-red-500 text-center font-semibold">{error}</p>
          ) : ratings.length === 0 ? (
            <p className="text-gray-500 text-center">No ratings found.</p>
          ) : (
            <div className="space-y-3">
              {ratings.map((r) => (
                <div
                  key={r.id}
                  className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="flex items-center gap-1 text-gray-700">
                      <FaUser className="text-indigo-500" /> {r.userName}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <FaStar /> {r.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {r.createdAt
                      ? new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(r.createdAt))
                      : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRatingsModal;
