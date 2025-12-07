import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />

      <h2 className="text-3xl font-bold text-gray-800">
        Payment Successful! 🎉
      </h2>

      <p className="text-gray-600 mt-2 max-w-md">
        Your application has been submitted successfully. Our team will review
        your documents and update your application status soon.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Go to Home
        </button>

        <button
          onClick={() => navigate("/dashboard/my-applications")}
          className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
        >
          View Applications
        </button>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
