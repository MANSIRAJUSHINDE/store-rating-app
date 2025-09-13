// src/components/admin/AdminStats.jsx
import React from "react";
import { FaUsers, FaStore, FaStarHalfAlt } from "react-icons/fa";

const AdminStats = ({ stats }) => {
  if (!stats) return <p className="text-center py-10 text-gray-500">Loading stats...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* Total Users */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer flex justify-between items-center">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">Total Users</h3>
          <span className="text-2xl sm:text-3xl font-bold text-white mt-2">{stats.totalUsers}</span>
        </div>
        <FaUsers className="text-white text-4xl sm:text-5xl" />
      </div>

      {/* Total Stores */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer flex justify-between items-center">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">Total Stores</h3>
          <span className="text-2xl sm:text-3xl font-bold text-white mt-2">{stats.totalStores}</span>
        </div>
        <FaStore className="text-white text-4xl sm:text-5xl" />
      </div>

      {/* Total Ratings */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer flex justify-between items-center">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">Total Ratings</h3>
          <span className="text-2xl sm:text-3xl font-bold text-white mt-2">{stats.totalRatings}</span>
        </div>
        <FaStarHalfAlt className="text-white text-4xl sm:text-5xl" />
      </div>
    </div>
  );
};

export default AdminStats;
