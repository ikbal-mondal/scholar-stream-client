import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  Calendar,
  MapPin,
  GraduationCap,
  FileText,
  Globe,
  AlertCircle,
  Loader2,
  School,
  BadgeDollarSign,
} from "lucide-react";
import api from "../../services/api";

const ScholarshipDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sch, setSch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single scholarship
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/scholarships/${id}`);
      setSch(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load scholarship details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  // Date formatter
  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    return dt.toLocaleDateString();
  };

  // --------------------------
  // LOADING SKELETON
  // --------------------------
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  // --------------------------
  // ERROR STATE
  // --------------------------
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <p className="text-red-600 text-lg">{error}</p>
        <Link
          to="/scholarships"
          className="text-primary underline mt-4 inline-block"
        >
          Go Back
        </Link>
      </div>
    );
  }

  if (!sch) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* HERO IMAGE */}
      <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
        <img
          src={sch.universityImage}
          alt={sch.universityName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE SECTION */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {sch.scholarshipName}
        </h1>
        <p className="text-lg text-gray-600 mt-1 flex items-center gap-2">
          <School size={20} /> {sch.universityName}
        </p>

        <div className="flex flex-wrap items-center gap-6 mt-4 text-gray-700">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} /> {sch.degree}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} /> {sch.universityCity}, {sch.universityCountry}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} /> Deadline:{" "}
            {formatDate(sch.applicationDeadline)}
          </div>
        </div>
      </div>

      {/* QUICK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="p-5 bg-purple-50 border border-purple-200 rounded-xl">
          <h3 className="font-bold text-primary text-lg flex gap-2 items-center">
            <BadgeDollarSign /> Funding Type
          </h3>
          <p className="text-gray-700 mt-1">{sch.scholarshipCategory}</p>
        </div>

        <div className="p-5 bg-purple-50 border border-purple-200 rounded-xl">
          <h3 className="font-bold text-primary text-lg flex gap-2 items-center">
            <FileText /> Application Fees
          </h3>
          <p className="text-gray-700 mt-1">{sch.applicationFees || "N/A"}</p>
        </div>

        <div className="p-5 bg-purple-50 border border-purple-200 rounded-xl">
          <h3 className="font-bold text-primary text-lg flex gap-2 items-center">
            <Globe /> World Rank
          </h3>
          <p className="text-gray-700 mt-1">
            {sch.universityWorldRank || "N/A"}
          </p>
        </div>
      </div>

      {/* MAIN DETAILS SECTIONS */}
      <div className="mt-12 space-y-10">
        {/* OVERVIEW */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-line">
            {sch.scholarshipDescription || "No description available."}
          </p>
        </section>

        {/* STIPEND */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Stipend / Coverage
          </h2>
          <p className="text-gray-700 mt-2 whitespace-pre-line">
            {sch.stipendCoverage || "Not specified"}
          </p>
        </section>

        {/* ELIGIBILITY */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Eligibility</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-line">
            {sch.eligibilityCriteria || "No eligibility criteria provided."}
          </p>
        </section>

        {/* REQUIRED DOCUMENTS */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Required Documents
          </h2>
          <p className="text-gray-700 mt-2 whitespace-pre-line">
            {sch.requiredDocuments || "No document list provided."}
          </p>
        </section>
      </div>

      {/* APPLY BUTTON */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => navigate(`/apply/${sch._id}`)}
          className="px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary/90 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
