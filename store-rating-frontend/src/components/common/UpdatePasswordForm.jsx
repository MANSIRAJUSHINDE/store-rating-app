import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePasswordForm = () => {
  const { API } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Debug log
    console.log("Sending update password request:", {
      currentPassword: oldPassword,
      newPassword,
    });

    try {
      const res = await API.put("/auth/update-password", {
        currentPassword: oldPassword, // match backend field
        newPassword,
      });

      console.log("Password update response:", res.data);

      setMessage(res.data.message || "Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Update password error:", err.response);

      if (err.response?.status === 400) {
        setError(err.response.data?.message || "Old password is incorrect");
      } else if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else {
        setError("Failed to update password. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-300 pb-2">
        Update Password
      </h3>

      {message && <p className="text-green-600 mb-3">{message}</p>}
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Old Password */}
      <div className="mb-4 relative">
        <label className="block mb-1 text-gray-700">Old Password</label>
        <input
          type={showOld ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-indigo-400 transition duration-200 pr-10"
          required
        />
        <span
          className="absolute right-3 top-9 cursor-pointer text-gray-500"
          onClick={() => setShowOld(!showOld)}
        >
          {showOld ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* New Password */}
      <div className="mb-4 relative">
        <label className="block mb-1 text-gray-700">New Password</label>
        <input
          type={showNew ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-indigo-400 transition duration-200 pr-10"
          required
        />
        <span
          className="absolute right-3 top-9 cursor-pointer text-gray-500"
          onClick={() => setShowNew(!showNew)}
        >
          {showNew ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
