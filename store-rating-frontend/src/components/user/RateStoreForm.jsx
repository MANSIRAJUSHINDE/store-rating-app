// src/components/user/RateStoreForm.jsx
import React, { useState } from "react";
import axios from "axios";

const RateStoreForm = ({ store, authHeaders, onRatingUpdate }) => {
  const [rating, setRating] = useState(store.userRating || 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/stores/${store.id}/rate`,
        { rating },
        { headers: authHeaders() }
      );
      onRatingUpdate(store.id, rating);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block font-semibold mb-1">{store.name}</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-1 rounded w-20 mr-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        {loading ? "Submitting..." : rating ? "Update Rating" : "Submit Rating"}
      </button>
    </form>
  );
};

export default RateStoreForm;
