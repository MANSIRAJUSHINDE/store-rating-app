import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4">Store Ratings</h2>

        {loading ? (
          <p>Loading ratings...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : ratings.length === 0 ? (
          <p className="text-gray-500">No ratings found.</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Rating</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((r) => (
                <tr key={r.id} className="text-center hover:bg-gray-100">
                  <td className="border px-4 py-2">{r.userName}</td>
                  <td className="border px-4 py-2">{r.rating}</td>
                  <td className="border px-4 py-2">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StoreRatingsModal;
