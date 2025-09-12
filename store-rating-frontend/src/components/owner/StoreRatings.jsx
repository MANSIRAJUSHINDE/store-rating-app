// src/components/owner/StoreRatings.jsx
import React from "react";

const StoreRatings = ({ data }) => {
  if (!data) return <p>Loading store ratings...</p>;

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Store Ratings</h2>
      <p>Average Rating: {data.averageRating}</p>
      <ul>
        {data.ratings.map((r) => (
          <li key={r.id}>
            {r.userName}: {r.rating} ⭐
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreRatings;
