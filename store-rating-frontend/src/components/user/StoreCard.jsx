// src/components/admin/StoreCard.jsx
import React from "react";
import RateStoreForm from "./RateStoreForm";
import { FaStar, FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";

const StoreCard = ({ store, onRatingUpdate }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col gap-4 border border-gray-100 hover:border-indigo-300"
      whileHover={{ scale: 1.03 }}
    >
      {/* Store Header */}
      <div className="flex items-center gap-3">
        <FaStore className="text-indigo-600 w-6 h-6" />
        <h3 className="text-lg xs:text-xl font-bold text-indigo-800">{store.name}</h3>
      </div>

      {/* Address */}
      <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
        <FaMapMarkerAlt className="text-gray-400" /> {store.address}
      </p>

      {/* Overall Rating */}
      <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
        <FaStar className="text-yellow-400" /> Overall Rating:{" "}
        <span className="font-semibold text-indigo-600">
          {store.overallRating !== null ? store.overallRating.toFixed(1) : "N/A"}
        </span>
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-2"></div>

      {/* Rate Form */}
      <RateStoreForm store={store} onRatingUpdate={onRatingUpdate} />
    </motion.div>
  );
};

export default StoreCard;
