// src/components/common/Header.jsx
import React, { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import UserProfile from "../common/UserProfile";
import UpdatePasswordForm from "../common/UpdatePasswordForm";

const Header = ({ title, user, logout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-md w-full">
      {/* Desktop / Mobile container */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        {/* Left: Title */}
        <div className="flex items-center gap-6">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">{title}</h1>
          
          {/* Welcome User */}
          {user && (
            <span className="hidden sm:inline text-gray-700 font-medium">
              Welcome, <span className="text-indigo-600">{user.name}</span>
            </span>
          )}
        </div>

        {/* Right: Navigation */}
        <nav className="hidden sm:flex items-center gap-4 flex-grow justify-end">
          
          {/* Profile Icon */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <FaUserCircle className="text-2xl text-indigo-600 cursor-pointer hover:text-indigo-700 transition-colors" />
            {showProfile && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 animate-fadeIn">
                <UserProfile />
              </div>
            )}
          </div>

          {/* Change Password */}
          <button
            onClick={() => setShowPasswordPopup(true)}
            className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Change Password
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-indigo-600 text-2xl"
          >
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      {showMobileMenu && (
        <div className="sm:hidden w-full bg-white border-t border-gray-300 p-4 shadow-md animate-slideDown space-y-4">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-2xl text-indigo-600" />
            <span className="text-indigo-700 font-medium">Welcome, {user?.name}</span>
          </div>

          <button
            onClick={() => setShowPasswordPopup(true)}
            className="w-full bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="w-full bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-indigo-700">Change Password</h3>
              <button
                onClick={() => setShowPasswordPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ✖
              </button>
            </div>
            <UpdatePasswordForm />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
