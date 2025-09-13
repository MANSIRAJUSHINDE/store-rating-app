// src/components/admin/UserDetailsModal.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import API from "../../services/api";
import { FaUser, FaStar, FaStore } from "react-icons/fa";

const UserDetailsModal = ({ userId, onClose }) => {
  const { authHeaders } = useContext(AuthContext); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const headers = authHeaders(); 
        const res = await API.get(`/admin/users/${userId}`, { headers });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load user details");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserDetails();
  }, [userId, authHeaders]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaUser className="text-yellow-300" /> User Details
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
            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-md p-4 space-y-2 border border-gray-100 hover:shadow-lg transition-shadow">
              <p className="text-gray-700"><span className="font-semibold">Name:</span> <span className="text-gray-800">{user.name}</span></p>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> <span className="text-gray-800">{user.email}</span></p>
              <p className="text-gray-700"><span className="font-semibold">Address:</span> <span className="text-gray-800">{user.address}</span></p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-white text-xs ${user.role === 'admin' ? 'bg-red-500' : user.role === 'store_owner' ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {user.role.replace('_', ' ').toUpperCase()}
                </span>
              </p>
            </div>

            {/* Store Owner Info */}
            {user.role === "store_owner" && (
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
                <p className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FaStar className="text-yellow-400" /> Average Store Rating: 
                  <span className="text-yellow-500 font-bold">{user.storeRating ?? 0}</span>
                </p>
                <h3 className="mt-3 font-semibold text-gray-700 flex items-center gap-2">
                  <FaStore className="text-indigo-500" /> Stores Owned:
                </h3>
                <ul className="list-disc list-inside mt-2 space-y-1 max-h-44 overflow-y-auto">
                  {user.storesOwned?.map((store) => (
                    <li
                      key={store.id}
                      className="p-2 rounded hover:bg-indigo-50 flex justify-between items-center transition-colors cursor-pointer"
                    >
                      <span className="text-gray-800 font-medium">{store.name}</span>
                      <span className="text-yellow-500 font-bold flex items-center gap-1">
                        <FaStar /> {store.averageRating ?? 0}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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

export default UserDetailsModal;
