import React, { useState } from "react";
import API from "../../services/api";

const RateStoreForm = ({ store, onRatingUpdate }) => {
  const [rating, setRating] = useState(store.userRating || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // FIXED: Removed the broken setToken call. Axios interceptor handles this automatically now!
      await API.post(`/stores/${store.id}/rate`, { rating });
      onRatingUpdate(store.id, rating);
    } catch (err) {
<<<<<<< HEAD
      console.error("Rating error:", err);
      setError(err.response?.data?.message || "Failed to submit rating");
=======
      setError(
        err.response?.data?.message || "Failed to submit rating"
      );
>>>>>>> ac1d318 (Add source code files)
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <label className="font-semibold text-gray-700">{store.name}</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border px-3 py-1 rounded w-20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Submitting..." : rating ? "Update Rating" : "Submit"}
      </button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
=======
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/80 border border-gray-700 rounded-3xl p-4 shadow-lg flex flex-wrap items-center gap-4 text-gray-100"
    >
      {/* Store Name */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs text-gray-400 mb-1">
          Store
        </label>

        <p className="font-semibold text-gray-100">
          {store.name}
        </p>
      </div>

      {/* Rating Input */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">
          Rating
        </label>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-24 px-4 py-2 rounded-2xl bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-end">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Submitting..." : rating ? "Update Rating" : "Submit"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="w-full bg-red-900/40 border border-red-700 text-red-300 px-4 py-2 rounded-2xl text-sm">
          {error}
        </div>
      )}
>>>>>>> ac1d318 (Add source code files)
    </form>
  );
};

export default RateStoreForm;