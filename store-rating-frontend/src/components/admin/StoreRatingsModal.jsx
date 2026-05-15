import React, { useEffect, useState, useContext } from "react";
import API from "../../services/api"; // Updated to use centralized API instance
import { AuthContext } from "../../context/AuthContext";
import { FaStar, FaUser, FaRegStar } from "react-icons/fa";

const StoreRatingsModal = ({ storeId, onClose }) => {
  const { logout } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      setError("");
      try {
        // Simplified request using API interceptor for headers
        const res = await API.get(`/admin/stores/${storeId}/ratings`);
        setRatings(res.data.ratings || []);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          setError("Session expired. Please login again.");
        } else {
          setError(err.response?.data?.message || "Failed to load ratings");
        }
      } finally {
        setLoading(false);
      }
    };

    if (storeId) fetchRatings();
  }, [storeId, logout]);

  if (!storeId) return null;

  // Backdrop click handler for better UX
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Helper function to render star icons based on rating number
  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          i < rating ? <FaStar key={i} /> : <FaRegStar key={i} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col border border-gray-200">
        
        {/* Header - Fixed at top */}
        <div className="bg-indigo-600 text-white p-5 flex justify-between items-center shadow-md shrink-0">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Store Ratings
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:rotate-90 transition-transform duration-200 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Area - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="py-10 flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-2"></div>
              <p className="text-gray-500">Retrieving feedback...</p>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center font-semibold bg-red-50 p-3 rounded-lg">{error}</p>
          ) : ratings.length === 0 ? (
            <div className="text-center py-10">
               <p className="text-gray-400 text-lg italic">No ratings found for this store.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ratings.map((r) => (
                <div
                  key={r.id}
                  className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        <FaUser size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 leading-none">{r.userName || "Anonymous"}</p>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">User ID: {r.userId}</span>
                      </div>
                    </div>
                    {renderStars(r.rating)}
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                    <span className="text-gray-500 text-xs italic">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      }) : "Recent"}
                    </span>
                    <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-sm">
                      {r.rating}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl font-bold shadow-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreRatingsModal;