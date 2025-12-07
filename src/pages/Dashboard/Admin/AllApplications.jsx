// src/pages/Dashboard/Admin/AllApplications.jsx

import React, { useEffect, useState } from "react";
import {
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  School,
  User,
  Mail,
} from "lucide-react";
import Swal from "sweetalert2";
import api from "../../../services/api";

export default function AllApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      setLoading(true);
      const res = await api.get("/applications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setApps(res.data || []);
    } catch (err) {
      console.error("Error loading applications:", err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------
  // UPDATE STATUS (Approve / Reject)
  // -----------------------------------
  const updateStatus = async (id, type) => {
    const endpoint =
      type === "approve"
        ? `/applications/approve/${id}`
        : `/applications/reject/${id}`;

    try {
      await api.patch(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      Swal.fire("Success", `Application has been ${type}d`, "success");
      loadApps();
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // -----------------------------------
  // DELETE APPLICATION
  // -----------------------------------
  const deleteApp = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Application?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/applications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      Swal.fire("Deleted", "Application removed successfully", "success");
      loadApps();
    } catch (err) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  // FILTERED APPLICATIONS
  const filteredApps = apps?.filter((a) =>
    a.userEmail?.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Applications</h1>

        <div className="flex items-center px-4 py-2 border rounded-xl bg-white shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            className="ml-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Scholarship</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : filteredApps.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              filteredApps.map((a) => (
                <tr key={a?._id} className="border-b hover:bg-gray-50">
                  {/* Student */}
                  <td className="p-4">
                    <div className="font-semibold flex items-center gap-2">
                      <User size={14} /> {a.userName}
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail size={12} /> {a.userEmail}
                    </p>
                  </td>

                  {/* Scholarship */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <School size={16} className="text-purple-600" />
                      {a.scholarshipName}
                    </div>
                    <p className="text-sm text-gray-500">{a.universityName}</p>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold 
                        ${
                          a.applicationStatus === "approved"
                            ? "bg-green-100 text-green-700"
                            : a.applicationStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {a.applicationStatus}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="p-4 capitalize">{a.paymentStatus}</td>

                  {/* Date */}
                  <td className="p-4 text-sm">
                    {new Date(a.applicationDate).toLocaleDateString()}
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-2 border rounded-lg hover:bg-gray-100"
                        onClick={() => setViewItem(a)}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        onClick={() => updateStatus(a._id, "approve")}
                      >
                        <CheckCircle size={16} />
                      </button>

                      <button
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={() => updateStatus(a._id, "reject")}
                      >
                        <XCircle size={16} />
                      </button>

                      <button
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => deleteApp(a._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full p-6 rounded-xl shadow-xl relative">
            <button
              className="absolute top-3 right-4 text-xl"
              onClick={() => setViewItem(null)}
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <School size={20} className="text-purple-600" />
              {viewItem.scholarshipName}
            </h2>

            <p>
              <strong>Student:</strong> {viewItem.userName}
            </p>
            <p>
              <strong>Email:</strong> {viewItem.userEmail}
            </p>
            <p>
              <strong>Status:</strong> {viewItem.applicationStatus}
            </p>
            <p>
              <strong>Payment:</strong> {viewItem.paymentStatus}
            </p>

            <h3 className="font-semibold mt-4">Form Data</h3>
            <div className="border p-3 rounded-lg bg-gray-50 max-h-56 overflow-auto">
              {Object.entries(viewItem.formData || {}).map(([key, val]) => (
                <p key={key} className="text-sm mb-1">
                  <strong>{key}:</strong> {val}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
