import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import API from "../../services/api"; // Centralized API instance
import { FaUser, FaStar, FaStore, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const UserDetailsModal = ({ userId, onClose }) => {
  const { logout } = useContext(AuthContext); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        setError("");
        // Headers are automatically handled by the API interceptor
        const res = await API.get(`/admin/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          setError("Session expired. Please login again.");
        } else {
          setError(err.response?.data?.message || "Failed to load user details");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserDetails();
  }, [userId, logout]);

  if (!userId) return null;

  // Backdrop click handler for better UX
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
            <FaUser className="text-yellow-300" /> User Profile
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:rotate-90 transition-transform duration-200 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="p-10 flex flex-col items-center justify-center space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            <p className="text-gray-500">Fetching user profile...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500 font-semibold bg-red-50 p-3 rounded-lg mb-4">{error}</p>
            <button onClick={onClose} className="text-indigo-600 font-bold">Return to Dashboard</button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* User Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-3 border border-gray-100">
              <div className="flex items-center gap-3 mb-2 border-b pb-2">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <FaUser size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg leading-none">{user.name}</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase text-white ${user.role === 'admin' ? 'bg-rose-500' : user.role === 'store_owner' ? 'bg-emerald-500' : 'bg-sky-500'}`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2"><FaEnvelope className="text-gray-400" /> {user.email}</p>
                <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> {user.address || "No address provided"}</p>
              </div>
            </div>

            {/* Store Owner specific data */}
            {user.role === "store_owner" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                   <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <FaStore className="text-indigo-500" /> Managed Stores
                  </h3>
                  <span className="text-yellow-600 font-bold text-sm flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                    Avg: <FaStar /> {user.storeRating?.toFixed(1) ?? 0}
                  </span>
                </div>
                
                <div className="max-h-48 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                  {user.storesOwned?.length > 0 ? (
                    user.storesOwned.map((store) => (
                      <div
                        key={store.id}
                        className="p-3 rounded-xl border border-gray-100 bg-white hover:bg-indigo-50 flex justify-between items-center transition-all group"
                      >
                        <span className="text-gray-700 font-medium group-hover:text-indigo-700">{store.name}</span>
                        <span className="text-yellow-500 font-bold flex items-center gap-1 text-sm">
                          <FaStar size={12} /> {store.averageRating?.toFixed(1) ?? 0}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center text-sm italic py-4">No stores assigned yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Close Button */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all border border-gray-200"
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;