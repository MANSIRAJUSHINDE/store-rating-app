import React, { useState } from "react";
import API, { setToken } from "../../services/api";

const RateStoreForm = ({ store, onRatingUpdate }) => {
  const [rating, setRating] = useState(store.userRating || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      setToken(localStorage.getItem("token"));
      await API.post(`/stores/${store.id}/rate`, { rating });
      onRatingUpdate(store.id, rating);
    } catch (err) {
      console.error("Rating error:", err);
      setError(err.response?.data?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
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
    </form>
  );
};

export default RateStoreForm;
