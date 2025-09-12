import React from "react";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Store Rating
        </h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
