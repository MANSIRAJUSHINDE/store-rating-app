import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center min-h-screen bg-white w-full px-4 sm:px-6">
      <main className="w-full max-w-3xl text-center">
        {/* Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex justify-center items-center">
          <FaStar className="text-white w-10 h-10 sm:w-12 sm:h-12" />
=======
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white flex items-center justify-center px-4 sm:px-6 py-10">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 opacity-30 blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600 opacity-30 blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Glass Container */}
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-6xl backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8"
            >
              <FaStar className="text-white text-5xl" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            >
              Discover & book
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                your event
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, reiciendis illum blanditiis aspernatur assumenda sequi dolores, laudantium debitis suscipit dolor temporibus velit asperiores aut quo quod amet totam illo dolore?
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(99,102,241,0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300"
              >
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <button className="px-8 py-4 border border-white/20 bg-white/5 rounded-2xl font-semibold hover:bg-white/10 transition duration-300">
                Explore 
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "#8b5cf6",
                }}
                className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-4 mt-2"
            >
              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <h2 className="text-3xl font-bold text-indigo-400">10K+</h2>
                <p className="text-gray-300 text-sm mt-1">Users</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <h2 className="text-3xl font-bold text-purple-400">5K+</h2>
                <p className="text-gray-300 text-sm mt-1">Stores</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <h2 className="text-3xl font-bold text-pink-400">50K+</h2>
                <p className="text-gray-300 text-sm mt-1">Reviews</p>
              </div>
            </motion.div>
          </div>
>>>>>>> ac1d318 (Add source code files)
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
