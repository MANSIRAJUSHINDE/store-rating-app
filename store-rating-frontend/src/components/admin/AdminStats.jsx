// src/components/admin/AdminStats.jsx
import React from "react";

const AdminStats = ({ stats }) => {
  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Admin Stats</h2>
      <ul>
        <li>Total Users: {stats.totalUsers}</li>
        <li>Total Stores: {stats.totalStores}</li>
        <li>Total Ratings: {stats.totalRatings}</li>
      </ul>
    </div>
  );
};

export default AdminStats;
