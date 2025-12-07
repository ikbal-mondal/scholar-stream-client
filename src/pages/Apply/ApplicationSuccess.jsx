import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../services/api";

const ApplicationSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false); // prevent duplicate requests

  const updatePaymentStatus = async (sessionId) => {
    try {
      const res = await api.post("/payment-success", { sessionId });

      if (res.data.success) {
        console.log("Payment updated successfully");
        setUpdated(true);
      } else {
        Swal.fire("Error", "Payment update failed", "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Could not update payment status", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const sessionId = params.get("session_id");

    // prevent duplicate calls on re-render
    if (sessionId && !updated) {
      updatePaymentStatus(sessionId);
    } else {
      setLoading(false);
    }
  }, [search]);

  // --------------------------
  // LOADING STATE
  // --------------------------
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary border-t-transparent"></div>
        <p className="text-gray-600 mt-4">Updating your payment status...</p>
      </div>
    );
  }

  // --------------------------
  // SUCCESS VIEW
  // --------------------------
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />

      <h2 className="text-3xl font-bold text-gray-800">
        Payment Successful! 🎉
      </h2>

      <p className="text-gray-600 mt-2 max-w-md">
        Your payment was successful. Your application status has been updated.
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
