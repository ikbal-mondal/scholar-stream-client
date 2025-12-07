// src/pages/Apply/ApplyForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Info } from "lucide-react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthProvider";
import api from "../../services/api";

const stepsList = [
  "Basic Info",
  "Academic Info",
  "Course Info",
  "Contact Info",
];

// TOOLTIP COMPONENT
const InfoTip = ({ text }) => (
  <span className="relative group cursor-pointer ml-1 text-gray-400">
    <Info size={16} />
    <span className="absolute left-6 top-1 bg-black text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
      {text}
    </span>
  </span>
);

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUser } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [scholarship, setScholarship] = useState(null);

  const [form, setForm] = useState({
    fullName: backendUser?.name || "",
    email: backendUser?.email || "",
    phone: "",
    dob: "",
    previousDegree: "",
    cgpa: "",
    intake: "",
    studyGap: "",
    appliedDegree: "",
    major: "",
    whyUniversity: "",
    country: "",
    city: "",
    address: "",
    zip: "",
  });

  useEffect(() => {
    async function loadScholarship() {
      try {
        const res = await api.get(`/scholarships/${id}`);
        setScholarship(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load scholarship", "error");
      } finally {
        setLoading(false);
      }
    }
    loadScholarship();
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateStep = () => {
    const f = form;
    if (step === 1) {
      if (!f.fullName) return { ok: false, msg: "Full name required." };
      if (!f.phone) return { ok: false, msg: "Phone required." };
      if (!f.dob) return { ok: false, msg: "Date of birth required." };
    }
    if (step === 2) {
      if (!f.previousDegree)
        return { ok: false, msg: "Previous degree required." };
      if (!f.cgpa) return { ok: false, msg: "CGPA required." };
    }
    if (step === 3) {
      if (!f.appliedDegree)
        return { ok: false, msg: "Applied degree required." };
      if (!f.major) return { ok: false, msg: "Major required." };
    }
    if (step === 4) {
      if (!f.country) return { ok: false, msg: "Country required." };
      if (!f.city) return { ok: false, msg: "City required." };
      if (!f.address) return { ok: false, msg: "Address required." };
      if (!f.zip) return { ok: false, msg: "ZIP required." };
    }
    return { ok: true };
  };

  const nextStep = () => {
    const v = validateStep();
    if (!v.ok) return Swal.fire("Validation Error", v.msg, "warning");
    setStep((s) => s + 1);
  };

  const goToSummary = () => {
    const v = validateStep();
    if (!v.ok) return Swal.fire("Validation Error", v.msg, "warning");

    navigate(`/apply-summary/${id}`, {
      state: { form, scholarship },
    });
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!scholarship) return <p className="text-center">Scholarship Not Found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">
        Apply for{" "}
        <span className="text-primary">{scholarship.scholarshipName}</span>
      </h2>

      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="w-full h-1 bg-gray-200 rounded-full" />
        <div
          className="absolute top-0 h-1 bg-primary rounded-full transition-all"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />
      </div>

      {/* FORM CARD */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold flex items-center">
              Basic Information
              <InfoTip text="Your personal details" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <label className="flex flex-col">
                <span className="mb-1">
                  Full Name <InfoTip text="Your legal full name" />
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              {/* Email */}
              <label className="flex flex-col">
                <span className="mb-1">Email</span>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="input-modern bg-gray-100 cursor-not-allowed"
                />
              </label>

              {/* Phone */}
              <label className="flex flex-col">
                <span className="mb-1">
                  Phone <InfoTip text="Active phone number" />
                </span>
                <input
                  type="number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              {/* DOB */}
              <label className="flex flex-col">
                <span className="mb-1">Date of Birth</span>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>
            </div>

            <button className="btn-primary float-right" onClick={nextStep}>
              Next →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">
              Academic Information{" "}
              <InfoTip text="Your previous academic background" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                <span>Previous Degree</span>
                <input
                  type="text"
                  name="previousDegree"
                  value={form.previousDegree}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label>
                <span>CGPA / Marks</span>
                <input
                  type="number"
                  name="cgpa"
                  value={form.cgpa}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label>
                <span>Preferred Intake</span>
                <input
                  type="text"
                  name="intake"
                  value={form.intake}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label className="md:col-span-2">
                <span>Study Gap</span>
                <textarea
                  name="studyGap"
                  value={form.studyGap}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>
            </div>

            <div className="flex justify-between">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button className="btn-primary" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">
              Course Information <InfoTip text="Program you want to study" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                <span>Applied Degree</span>
                <input
                  type="text"
                  name="appliedDegree"
                  value={form.appliedDegree}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label>
                <span>Major / Subject</span>
                <input
                  type="text"
                  name="major"
                  value={form.major}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label className="md:col-span-2">
                <span>Why this University?</span>
                <textarea
                  name="whyUniversity"
                  value={form.whyUniversity}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>
            </div>

            <div className="flex justify-between">
              <button className="btn-secondary" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button className="btn-primary" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">
              Contact Information <InfoTip text="Where you currently live" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                <span>Country</span>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label>
                <span>City</span>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label>
                <span>Address</span>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>

              <label>
                <span>ZIP Code</span>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  className="input-modern"
                />
              </label>
            </div>

            <div className="flex justify-between">
              <button className="btn-secondary" onClick={() => setStep(3)}>
                ← Back
              </button>
              <button className="btn-primary" onClick={goToSummary}>
                Review Application →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
