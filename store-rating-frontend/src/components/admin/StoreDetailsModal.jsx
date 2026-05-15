import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api"; // Updated import
import { FaStar, FaStore, FaUser } from "react-icons/fa";

const StoreDetailsModal = ({ storeId, onClose }) => {
  const { logout } = useContext(AuthContext);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!storeId) return;
      setLoading(true);
      setError("");

      try {
        // Using the API instance simplifies the URL and headers
        const res = await API.get(`/admin/stores/${storeId}`);
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
  }, [storeId, logout]); // Removed authHeaders dependency as API interceptor handles it

  if (!storeId) return null;

  // Function to handle clicking outside the modal to close it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4"
      onClick={handleBackdropClick}
    >
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
          <div className="p-10 flex flex-col items-center justify-center space-y-3">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
             <p className="text-gray-600">Loading details...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500 font-semibold mb-4">{error}</p>
            <button onClick={onClose} className="text-indigo-600 underline">Close</button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Store Info Card */}
            <div className="bg-white rounded-lg shadow-md p-4 space-y-3 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-sm">Store Name</span>
                <span className="font-semibold text-gray-800 text-right">{store.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-sm">Owner Email</span>
                <span className="text-gray-800 text-right">{store.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-sm">Location</span>
                <span className="text-gray-800 text-right italic">{store.address}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500 text-sm">Overall Rating</span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-indigo-600 font-bold text-lg">{store.averageRating?.toFixed(1) ?? "0.0"}</span>
                </div>
              </div>
            </div>

            {/* Bottom Close Button */}
            <div className="text-center">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all border border-gray-200"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetailsModal;