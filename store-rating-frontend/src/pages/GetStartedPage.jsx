import React from "react";
import { useNavigate } from "react-router-dom";

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <main className="max-w-3xl w-full text-center p-8">
        
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex justify-center items-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white" aria-hidden="true" focusable="false">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Store Rating App
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
          Rate and review your favorite stores. Share experiences and discover the best places around you.
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-10 py-4 font-semibold rounded-lg inline-flex items-center gap-2 hover:bg-blue-700 transition-colors"
          aria-label="Get Started"
        >
          Get Started
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white stroke-2 fill-none" aria-hidden="true" focusable="false">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

      </main>
    </div>
  );
};

export default GetStartedPage;
