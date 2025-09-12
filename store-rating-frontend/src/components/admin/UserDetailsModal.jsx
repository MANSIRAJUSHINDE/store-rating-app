import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // import AuthContext
import API from "../../services/api";

const UserDetailsModal = ({ userId, onClose }) => {
  const { authHeaders } = useContext(AuthContext); // get authHeaders
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const headers = authHeaders(); // <-- include Authorization header
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
            <h2 className="text-xl font-bold mb-2">User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Role:</strong> {user.role}</p>

            {user.role === "store_owner" && (
              <div className="mt-4">
                <p><strong>Average Store Rating:</strong> {user.storeRating ?? 0}</p>
                <h3 className="font-semibold mt-2">Stores Owned:</h3>
                <ul className="list-disc list-inside">
                  {user.storesOwned?.map(store => (
                    <li key={store.id}>
                      {store.name} - Average Rating: {store.averageRating ?? 0}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
