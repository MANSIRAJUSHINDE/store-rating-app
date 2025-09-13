import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white w-full px-4 sm:px-6">
      <main className="w-full max-w-3xl text-center">
        {/* Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex justify-center items-center">
          <FaStar className="text-white w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-500 to-purple-500 mb-4">
          Store Rating App
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Rate and review your favorite stores. Share experiences and discover the best places around you.
        </p>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl inline-flex items-center justify-center gap-2 hover:scale-105 transform transition-all duration-300"
        >
          Get Started
          <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </main>
    </div>
  );
};

export default GetStartedPage;
