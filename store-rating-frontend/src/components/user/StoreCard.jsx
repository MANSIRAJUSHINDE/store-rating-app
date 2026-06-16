// src/components/admin/StoreCard.jsx
import React from "react";
import RateStoreForm from "./RateStoreForm";
import { FaStar, FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";

const StoreCard = ({ store, onRatingUpdate }) => {
  return (
    <motion.div
<<<<<<< HEAD
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
=======
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(79,70,229,0.20)] flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
          <FaStore className="text-white text-2xl" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {store.name}
          </h3>

          <p className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <FaMapMarkerAlt className="text-indigo-600" />
            {store.address}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <span className="text-gray-800 font-medium">
          Overall Rating
>>>>>>> ac1d318 (Add source code files)
        </span>
      </p>

<<<<<<< HEAD
      {/* Divider */}
      <div className="border-t border-gray-200 my-2"></div>

      {/* Rate Form */}
      <RateStoreForm store={store} onRatingUpdate={onRatingUpdate} />
=======
        <div className="flex items-center gap-2 text-yellow-500 font-semibold text-lg bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
          <FaStar className="text-yellow-500" />

          <span className="text-gray-900">
            {store.overallRating !== null
              ? store.overallRating.toFixed(1)
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Form */}
      <RateStoreForm
        store={store}
        onRatingUpdate={onRatingUpdate}
      />
>>>>>>> ac1d318 (Add source code files)
    </motion.div>
  );
};

export default StoreCard;
