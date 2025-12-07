// src/pages/Dashboard/MyApplications.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Eye,
  Trash2,
  DownloadCloud,
  CreditCard,
  School,
  CheckCircle,
  XCircle,
  Clock,
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

  useEffect(() => {
    if (backendUser?.email) loadApps();
  }, [backendUser?.email]);
  console.log(apps);

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

  // Convert image to BASE64
  const toBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const downloadPdf = async (item) => {
    try {
      const form = item.formData || {};

      // Convert images
      const uniBase64 = item.universityImage
        ? await toBase64(item.universityImage)
        : null;

      const userBase64 = backendUser?.photoURL
        ? await toBase64(backendUser.photoURL)
        : null;

      const universityImg = uniBase64
        ? { image: uniBase64, width: 160, height: 80, margin: [0, 0, 0, 8] }
        : { text: "University Image", style: "missingImage" };

      const userImg = userBase64
        ? {
            image: userBase64,
            width: 70,
            height: 70,
            margin: [0, 0, 0, 0],
            alignment: "right",
          }
        : { text: "User Photo", style: "missingImage" };

      // ICONS for fields
      const fieldIcons = {
        fullName: "👤",
        email: "📧",
        phone: "📞",
        dob: "🎂",
        previousDegree: "🎓",
        cgpa: "⭐",
        intake: "📅",
        studyGap: "⏳",
        appliedDegree: "📘",
        major: "📖",
        whyUniversity: "🏫",
        country: "🌍",
        city: "🏙️",
        address: "📍",
        zip: "🔢",
      };

      // Modern table rows with icons
      const dataRows = Object.entries(form).map(([key, value], i) => [
        {
          text: `${fieldIcons[key] || "•"}  ${key.replace(/([A-Z])/g, " $1")}`,
          style: "fieldLabel",
          fillColor: i % 2 === 0 ? "#F4F8FF" : "#FFFFFF",
        },
        {
          text: String(value ?? "—"),
          style: "fieldValue",
          fillColor: i % 2 === 0 ? "#F4F8FF" : "#FFFFFF",
        },
      ]);

      // ================================
      //       DOCUMENT DESIGN
      // ================================
      const docDefinition = {
        pageSize: "A4",
        pageMargins: [30, 40, 30, 40],

        content: [
          // HEADER
          {
            columns: [
              universityImg,
              {
                stack: [
                  { text: "REGISTRATION FORM", style: "headerTitle" },
                  {
                    text: new Date(item.applicationDate).toLocaleString(),
                    style: "headerDate",
                  },
                ],
                alignment: "center",
              },
              userImg,
            ],
          },

          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 525,
                y2: 0,
                lineWidth: 2,
                color: "#4A90E2",
              },
            ],
            margin: [0, 10, 0, 10],
          },

          // SCHOLARSHIP INFO
          { text: item.scholarshipName, style: "scholarTitle" },
          {
            text: `${item.universityName} • ${item.universityCountry}`,
            style: "scholarSub",
          },
          {
            text: `Applied: ${new Date(item.applicationDate).toLocaleString()}`,
            style: "scholarSub",
            margin: [0, 0, 0, 10],
          },

          // SECTION TITLE
          {
            text: "PERSONAL INFORMATION",
            style: "sectionHeader",
          },

          // FORM DETAILS TABLE
          {
            table: {
              widths: ["35%", "*"],
              body: [["Field", "Details"], ...dataRows],
            },
            layout: {
              fillColor: (row) => (row === 0 ? "#E3ECFF" : null),
              hLineWidth: () => 0.6,
              vLineWidth: () => 0.6,
              hLineColor: () => "#CCC",
              vLineColor: () => "#CCC",
            },
            margin: [0, 6, 0, 20],
          },

          // SIGNATURE FOOTER
          {
            columns: [
              {
                text: "________________________\nApplicant Signature",
                alignment: "left",
                margin: [0, 20, 0, 0],
              },
              {
                text: "________________________\nAuthorized Signature",
                alignment: "right",
                margin: [0, 20, 0, 0],
              },
            ],
          },
        ],

        // ================================
        //          STYLES
        // ================================
        styles: {
          headerTitle: {
            fontSize: 20,
            bold: true,
            color: "#1A73E8",
            margin: [0, 10, 0, 4],
          },
          headerDate: {
            fontSize: 10,
            color: "#555",
          },
          scholarTitle: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 2],
          },
          scholarSub: {
            fontSize: 11,
            color: "#666",
            margin: [0, 0, 0, 3],
          },
          sectionHeader: {
            fontSize: 13,
            bold: true,
            color: "white",
            fillColor: "#4A90E2",
            padding: 6,
            margin: [0, 10, 0, 6],
            alignment: "center",
          },
          fieldLabel: {
            bold: true,
            fontSize: 11,
            margin: [4, 4, 4, 4],
          },
          fieldValue: {
            fontSize: 11,
            margin: [4, 4, 4, 4],
          },
          missingImage: {
            fontSize: 10,
            color: "gray",
            italics: true,
          },
        },
      };

      pdfMake.createPdf(docDefinition).download(`application-${item._id}.pdf`);
    } catch (err) {
      Swal.fire("Error", "PDF generation failed", "error");
    }
  };

  // ============================================================
  // UI COMPONENT
  // ============================================================
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
            : "bg-red-100 text-red-600"
        }`}
      >
        {status}
      </span>
    );
  };

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
              key={app._id?.$oid || app._id}
              className="bg-white/80 backdrop-blur-md border border-gray-200 hover:shadow-lg transition shadow-sm p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5"
            >
              {/* LEFT SECTION */}
              {/* IMAGE */}
              <img
                src={app.universityImage}
                onError={(e) => (e.target.src = "/no-image.png")}
                className="w-32 h-20 object-cover rounded-lg border shadow-sm"
                alt="University"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <School size={20} className="text-purple-600" />
                  {app.scholarshipName}
                </div>

                <p className="text-gray-600 text-sm mt-1">
                  {app.universityName} • {app.universityCountry}
                </p>

                {/* Status pills */}
                <div className="flex gap-3 mt-3">
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
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setViewItem(null)}
              className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            {/* HEADER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
              <img
                src={viewItem.universityImage}
                className="w-full h-24 object-contain rounded-md"
              />

              <div className="text-center">
                <h1 className="text-xl font-bold text-green-600">
                  REGISTRATION FORM
                </h1>
                <p className="text-sm text-gray-500">
                  {new Date(viewItem.applicationDate).toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end">
                <img
                  src={backendUser?.photoURL}
                  className="w-20 h-20 rounded-full object-cover shadow"
                />
              </div>
            </div>

            <div className="h-[2px] bg-green-500 my-3"></div>

            <h2 className="font-bold text-lg">{viewItem.scholarshipName}</h2>
            <p className="text-sm text-gray-600">
              {viewItem.universityName} • {viewItem.universityCountry}
            </p>

            {/* TABLE */}
            <div className="mt-4 border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(viewItem.formData || {}).map(([k, v], i) => (
                    <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                      <td className="font-semibold p-3 w-1/3 border text-gray-700 capitalize">
                        {k.replace(/([A-Z])/g, " $1")}
                      </td>
                      <td className="p-3 border">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => downloadPdf(viewItem)}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition flex items-center gap-2"
              >
                <DownloadCloud /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
