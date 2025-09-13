import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/common/ProtectedRoute";
import StoreRatings from "../components/owner/StoreRatings";
import Header from "../components/common/Header"; // make sure you have this

const OwnerDashboard = () => {
  const { user, logout, API } = useContext(AuthContext);
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerStore = async () => {
      try {
        const res = await API.get("/stores/owner"); 
        const storeData = res.data.store;
        setStore(storeData);

        if (storeData.ratings && storeData.ratings.length > 0) {
          setRatings(storeData.ratings);
          const total = storeData.ratings.reduce((acc, r) => acc + r.rating, 0);
          setAvgRating(total / storeData.ratings.length);
        }
      } catch (err) {
        console.error("Failed to fetch store data", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "store_owner") {
      fetchOwnerStore();
    }
  }, [user, API]);

  if (loading) return <p className="pt-20 px-4 text-gray-500">Loading store dashboard...</p>;

  if (!store) return <p className="pt-20 px-4 text-red-500 font-semibold">No store found for your account.</p>;

  return (
    <ProtectedRoute roles={["store_owner"]}>
      <div className="min-h-screen w-full bg-gray-50">

        {/* Sticky header */}
        <Header title="Store Dashboard" user={user} logout={logout} />

        {/* Main content */}
        <div className="pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

          <div className="mb-4 font-semibold text-gray-700">
            <div className="flex flex-col ">
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 truncate">
                {store.name} Ratings
              </h2>
            </div>

            <p className="mb-4 font-semibold text-gray-700">
              Average Rating: <span className="text-indigo-600">{avgRating ? avgRating.toFixed(2) : "N/A"}</span>
            </p>

            <StoreRatings ratings={ratings} />

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OwnerDashboard;
