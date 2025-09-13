import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/common/Header";  // ✅ Import the header
import StoreList from "../components/user/StoreList";
import UpdatePasswordForm from "../components/common/UpdatePasswordForm";
import UserProfile from "../components/common/UserProfile";

const DashboardSection = ({ title, children }) => (
  <section className="mb-8 p-4 bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 rounded-xl shadow-sm">
    <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-4 text-indigo-700 border-b border-indigo-300 pb-2">{title}</h2>
    {children}
  </section>
);

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);

    return (
    <div className="min-h-screen w-full bg-gray-50">

      {/* ✅ Sticky full-width header */}
      <Header title="User Dashboard" user={user} logout={logout} />

      {/* ✅ Main content with responsive padding and offset for sticky header */}
      <div className="pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

        {/* Stores Section */}
        <div className="mb-8">
          <div className="flex flex-col ">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 truncate">
              Stores
            </h2>
          </div>
          <StoreList />
        </div>


      </div>
    </div>
  );

};

export default UserDashboard;
