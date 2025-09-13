// src/components/admin/StoreRatings.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaUser, FaStar } from "react-icons/fa";

const StoreRatings = ({ ratings }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter ratings by name or rating
  const filteredRatings = useMemo(() => {
    if (!searchTerm) return ratings;
    return ratings.filter((r) => {
      const nameMatch = r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const ratingMatch = r.rating.toString().includes(searchTerm);
      return nameMatch || ratingMatch;
    });
  }, [searchTerm, ratings]);

  if (!ratings || ratings.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6 text-sm sm:text-base">
        No ratings submitted yet.
      </p>
    );
  }

  return (
    <div className="mt-6 w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
      {/* Title */}
      <h3 className="text-center text-lg sm:text-xl md:text-2xl font-semibold text-indigo-700 mb-6">
        Store Ratings
      </h3>

      {/* Search input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by user or rating..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
        />
      </div>

      {/* Ratings Cards */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredRatings.length > 0 ? (
          filteredRatings.map((r) => (
            <motion.div
              key={r.id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-transform duration-300 cursor-pointer flex items-center space-x-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-indigo-500 text-3xl">
                <FaUser />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-base sm:text-lg md:text-xl">
                  {r.user?.name || "Unknown User"}
                </p>
                <p className="flex items-center text-yellow-500 mt-1 text-sm sm:text-base md:text-lg">
                  <FaStar className="mr-1" /> {r.rating.toFixed(1)}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-4">
            No matching results.
          </p>
        )}
      </div>
    </div>
  );
};

export default StoreRatings;
