import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUniversity, FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          No payment data found.
        </h2>
      </div>
    );
  }

  const { scholarship, formData } = state;

  const totalAmount =
    Number(scholarship?.applicationFees || 0) +
    Number(scholarship?.serviceCharge || 0);

  // ---------------------------
  // STRIPE REDIRECT HANDLER
  // ---------------------------
  const handleStripePayment = async () => {
    try {
      // 🔥 Replace with your backend API call
      // const session = await api.post("/create-checkout-session", { ... });

      console.log("Redirecting to stripe…");

      // Temporary redirect simulation
      setTimeout(() => {
        navigate("/application-success");
      }, 1000);
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Failed to redirect to Stripe.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Payment Summary</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border">
        {/* University Info */}
        <div className="flex items-center gap-4">
          <img
            src={scholarship.universityImage}
            alt=""
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">
              {scholarship.universityName}
            </h3>
            <p className="text-gray-600">{scholarship.universityCountry}</p>
          </div>
        </div>

        {/* Fees */}
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="flex items-center gap-2">
              <FaFileInvoice /> Application Fees
            </span>
            <span>${scholarship.applicationFees}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="flex items-center gap-2">
              <FaMoneyBillWave /> Service Charge
            </span>
            <span>${scholarship.serviceCharge}</span>
          </div>

          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleStripePayment}
          className="w-full py-3 mt-4 bg-primary text-white text-lg rounded-lg hover:bg-primary/90 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
