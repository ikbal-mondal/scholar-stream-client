// src/pages/Apply/ApplicationSummary.jsx
import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GraduationCap, User, BookOpen, MapPin, Info } from "lucide-react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthProvider";
import api from "../../services/api";

// Tooltip
const InfoTip = ({ text }) => (
  <span className="relative group cursor-pointer ml-1 text-gray-400">
    <Info size={15} />
    <span className="absolute left-6 top-1 bg-black text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
      {text}
    </span>
  </span>
);

export default function ApplicationSummary() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUser } = useContext(AuthContext);

  useEffect(() => {
    if (!state?.form || !state?.scholarship) {
      Swal.fire("Invalid Access", "Complete the form first.", "warning");
      navigate(`/scholarship/${id}`);
    }
  }, [state, id, navigate]);

  if (!state) return null;

  const { form, scholarship } = state;

  const applicationFees = Number(scholarship.applicationFees);
  const serviceCharge = Number(scholarship.serviceCharge);
  const totalAmount = applicationFees + serviceCharge;

  const submitApp = async () => {
    try {
      const payload = {
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        universityCountry: scholarship.universityCountry,
        universityImage: scholarship.universityImage,

        userId: backendUser?._id,
        userName: backendUser?.name,
        userEmail: backendUser?.email,

        formData: form,
        applicationFees,
        serviceCharge,
        totalAmount,
      };

      const res = await api.post("/applications", payload);

      Swal.fire({
        title: "Application Submitted!",
        text: "Would you like to pay now?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Pay Now",
      }).then(async (btn) => {
        if (btn.isConfirmed) {
          const pay = await api.post("/create-checkout-session", {
            applicationId: res.data.insertedId,
          });

          window.location.href = pay.data.url;
        } else {
          navigate("/dashboard/my-applications");
        }
      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Application Summary</h2>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">{scholarship.scholarshipName}</h3>
          <p className="text-gray-600">{scholarship.universityName}</p>
        </div>

        <img
          src={scholarship.universityImage}
          className="w-32 h-16 object-contain rounded"
          alt="University"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SUMMARY */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal */}
          <div className="border rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold flex items-center gap-1">
              <User /> Personal Info
            </h3>
            <p>
              <b>Name:</b> {form.fullName}
            </p>
            <p>
              <b>Email:</b> {form.email}
            </p>
            <p>
              <b>Phone:</b> {form.phone}
            </p>
            <p>
              <b>DOB:</b> {form.dob}
            </p>
          </div>

          {/* Academic */}
          <div className="border rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold flex items-center gap-1">
              <GraduationCap /> Academic Info
            </h3>

            <p>
              <b>Previous Degree:</b> {form.previousDegree}
            </p>
            <p>
              <b>CGPA:</b> {form.cgpa}
            </p>
            <p>
              <b>Preferred Intake:</b> {form.intake}
            </p>
            <p>
              <b>Study Gap:</b> {form.studyGap}
            </p>
          </div>

          {/* Course */}
          <div className="border rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold flex items-center gap-1">
              <BookOpen /> Course Info
            </h3>
            <p>
              <b>Applied Degree:</b> {form.appliedDegree}
            </p>
            <p>
              <b>Major:</b> {form.major}
            </p>
            <p>
              <b>Why University:</b> {form.whyUniversity}
            </p>
          </div>

          {/* Contact */}
          <div className="border rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold flex items-center gap-1">
              <MapPin /> Contact Info
            </h3>
            <p>
              <b>Country:</b> {form.country}
            </p>
            <p>
              <b>City:</b> {form.city}
            </p>
            <p>
              <b>Address:</b> {form.address}
            </p>
            <p>
              <b>Zip:</b> {form.zip}
            </p>
          </div>
        </div>

        {/* RIGHT PAYMENT BOX */}
        <div className="border rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-3">Application Fees</h3>

          <p className="flex justify-between">
            <span>Application Fee</span> <span>₹ {applicationFees}</span>
          </p>
          <p className="flex justify-between">
            <span>Service Charge</span> <span>₹ {serviceCharge}</span>
          </p>

          <hr className="my-4" />

          <p className="flex justify-between font-bold text-lg">
            <span>Total</span>{" "}
            <span className="text-primary">₹ {totalAmount}</span>
          </p>

          <button className="btn-primary w-full mt-6" onClick={submitApp}>
            Submit Application →
          </button>
        </div>
      </div>
    </div>
  );
}
