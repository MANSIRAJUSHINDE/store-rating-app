import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

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
        const headers = authHeaders(); // include Authorization: Bearer <token>
        const res = await axios.get(`http://localhost:5000/api/admin/stores/${storeId}`, { headers });
        setStore(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout(); // log out on unauthorized
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-2">Store Details</h2>
            <p><strong>Name:</strong> {store.name}</p>
            <p><strong>Email:</strong> {store.email}</p>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Owner ID:</strong> {store.ownerId}</p>
            <p><strong>Average Rating:</strong> {store.averageRating ?? 0}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetailsModal;
