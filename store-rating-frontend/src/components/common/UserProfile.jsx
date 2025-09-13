import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="text-center text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-300 pb-2">Profile Info</h3>
      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold text-indigo-600">Name:</span> {user.name}</p>
        <p><span className="font-semibold text-indigo-600">Email:</span> {user.email}</p>
        <p><span className="font-semibold text-indigo-600">Address:</span> {user.address}</p>
        <p><span className="font-semibold text-indigo-600">Role:</span> {user.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;
