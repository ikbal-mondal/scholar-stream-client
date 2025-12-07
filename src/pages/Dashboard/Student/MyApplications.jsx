// src/pages/Dashboard/MyApplications.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Eye,
  Trash2,
  DownloadCloud,
  CreditCard,
  School,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.vfs;

import AuthContext from "../../../context/AuthProvider";
import api from "../../../services/api";

export default function MyApplications() {
  const { backendUser } = useContext(AuthContext);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  // ----------- REVIEW STATES -----------
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewApp, setReviewApp] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // -------------------------------------

  useEffect(() => {
    if (backendUser?.email) loadApps();
  }, [backendUser?.email]);

  const loadApps = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications/student/${backendUser.email}`);
      setApps(res.data || []);
    } catch (err) {
      Swal.fire("Error", "Could not load applications", "error");
    } finally {
      setLoading(false);
    }
  };

  // DELETE APPLICATION
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Application?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    await api.delete(`/applications/${id}`);
    Swal.fire("Deleted", "Application removed", "success");
    loadApps();
  };

  // START PAYMENT
  const startPayment = async (application) => {
    try {
      const id =
        application._id?.$oid || application._id || application.id || null;

      if (!id) return Swal.fire("Error", "Invalid Application ID", "error");

      const { data } = await api.post("/create-checkout-session", {
        applicationId: id.toString(),
      });

      if (data?.url) window.location.href = data.url;
      else Swal.fire("Error", "Could not create payment session", "error");
    } catch (err) {
      Swal.fire("Error", "Payment initialization failed!", "error");
    }
  };

  // Convert image URL → Base64
  const toBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // DOWNLOAD PDF
  const downloadPdf = async (item) => {
    try {
      const form = item.formData || {};

      const uniBase64 = item.universityImage
        ? await toBase64(item.universityImage)
        : null;

      const userBase64 = backendUser?.photoURL
        ? await toBase64(backendUser.photoURL)
        : null;

      const universityImg = uniBase64
        ? { image: uniBase64, width: 160, height: 80, margin: [0, 0, 0, 8] }
        : { text: "University Image Missing" };

      const userImg = userBase64
        ? { image: userBase64, width: 70, height: 70, alignment: "right" }
        : { text: "No Photo" };

      const dataRows = Object.entries(form).map(([key, value], i) => [
        { text: key.replace(/([A-Z])/g, " $1"), bold: true },
        { text: String(value ?? "—") },
      ]);

      const docDefinition = {
        pageSize: "A4",
        content: [
          {
            columns: [
              universityImg,
              {
                stack: [
                  { text: "REGISTRATION FORM", fontSize: 18, bold: true },
                  {
                    text: new Date(item.applicationDate).toLocaleString(),
                    color: "gray",
                  },
                ],
                alignment: "center",
              },
              userImg,
            ],
          },

          { text: "\n" },
          { text: item.scholarshipName, bold: true, fontSize: 16 },
          {
            text: `${item.universityName} • ${item.universityCountry}`,
            color: "gray",
          },

          { text: "\nPERSONAL INFORMATION\n", bold: true },

          {
            table: {
              widths: ["30%", "*"],
              body: [["Field", "Value"], ...dataRows],
            },
          },
        ],
      };

      pdfMake.createPdf(docDefinition).download(`application-${item._id}.pdf`);
    } catch (err) {
      Swal.fire("Error", "PDF generation failed", "error");
    }
  };

  // -------------------- SUBMIT REVIEW --------------------
  const submitReview = async () => {
    if (!rating || comment.trim() === "")
      return Swal.fire(
        "Missing Fields",
        "Please add rating & comment.",
        "warning"
      );

    try {
      const res = await api.post("/reviews", {
        scholarshipId: reviewApp.scholarshipId,
        universityName: reviewApp.universityName,
        userName: backendUser.name,
        userEmail: backendUser.email,
        userImage: backendUser.photoURL,
        ratingPoint: rating,
        reviewComment: comment,
      });

      Swal.fire("Success", "Review submitted!", "success");
      setShowReviewModal(false);
      setRating(0);
      setComment("");
    } catch (err) {
      Swal.fire("Error", "Could not submit review", "error");
    }
  };

  // ---------------------------------------------------------

  const StatusPill = ({ status }) => {
    const colors = {
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  const PaymentPill = ({ status }) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          status === "paid"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {status}
      </span>
    );
  };

  // ===========================================================
  // MAIN UI
  // ===========================================================

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : apps.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No applications found.
        </p>
      ) : (
        <div className="space-y-5">
          {apps.map((app) => (
            <div
              key={app._id}
              className="bg-white border shadow-sm hover:shadow-lg transition p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-5"
            >
              {/* IMAGE */}
              <img
                src={app.universityImage}
                className="w-32 h-20 object-cover rounded-lg border"
                alt="University"
                onError={(e) => (e.target.src = "/no-image.png")}
              />

              {/* DETAILS */}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <School size={20} className="text-purple-600" />
                  {app.scholarshipName}
                </div>

                <p className="text-gray-600 text-sm">
                  {app.universityName} • {app.universityCountry}
                </p>

                <div className="flex gap-3 mt-2">
                  <StatusPill status={app.applicationStatus} />
                  <PaymentPill status={app.paymentStatus} />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3">
                {app.paymentStatus !== "paid" && (
                  <button
                    onClick={() => startPayment(app)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <CreditCard size={18} /> Pay Now
                  </button>
                )}

                <button
                  onClick={() => setViewItem(app)}
                  className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 transition"
                >
                  <Eye size={18} /> View
                </button>

                <button
                  onClick={() => downloadPdf(app)}
                  className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 transition"
                >
                  <DownloadCloud size={18} /> Download
                </button>

                <button
                  onClick={() => handleDelete(app._id)}
                  className="px-4 py-2 border border-red-400 rounded-lg text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                >
                  <Trash2 size={18} />
                </button>

                {/* ⭐ ADD REVIEW BUTTON (ONLY WHEN APPROVED + PAID) */}
                {app.paymentStatus === "paid" &&
                  app.applicationStatus === "approved" && (
                    <button
                      onClick={() => {
                        setReviewApp(app);
                        setShowReviewModal(true);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <CheckCircle size={18} /> Add Review
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================
             VIEW MODAL
      ====================================================== */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setViewItem(null)}
              className="absolute right-4 top-3 text-2xl"
            >
              ×
            </button>

            <h1 className="text-xl font-bold text-center mb-3">
              Application Details
            </h1>

            {/* TABLE */}
            <table className="w-full text-sm mt-4">
              <tbody>
                {Object.entries(viewItem.formData || {}).map(([k, v], i) => (
                  <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                    <td className="font-semibold p-3 w-1/3 border capitalize">
                      {k.replace(/([A-Z])/g, " $1")}
                    </td>
                    <td className="p-3 border">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-5">
              <button
                onClick={() => downloadPdf(viewItem)}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
             REVIEW MODAL
      ====================================================== */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-black"
              onClick={() => setShowReviewModal(false)}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Write a Review
            </h2>

            {/* Rating Stars */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-3xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Comment Input */}
            <textarea
              className="w-full border rounded-lg p-3 h-28 focus:ring outline-none"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Submit Button */}
            <button
              onClick={submitReview}
              className="mt-4 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
