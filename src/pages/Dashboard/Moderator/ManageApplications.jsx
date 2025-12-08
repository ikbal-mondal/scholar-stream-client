import React, { useEffect, useState, useContext } from "react";
import {
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  School,
  Mail,
  User,
  CreditCard,
} from "lucide-react";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import api from "../../../services/api";

export default function ManageApplications() {
  const { backendUser } = useContext(AuthContext);
  console.log("user", backendUser);

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  // LOAD ALL APPLICATIONS
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

  // STATUS UPDATE
  const updateStatus = async (id, status) => {
    let endpoint =
      status === "processing"
        ? `/applications/approve/${id}`
        : status === "completed"
        ? `/applications/complete/${id}`
        : `/applications/reject/${id}`;

    try {
      await api.patch(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      Swal.fire("Updated", `Status updated to ${status}`, "success");
      loadApps();
    } catch (err) {
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  // OPEN FEEDBACK MODAL — FIXED
  const openFeedbackModal = (app) => {
    setShowDetailsModal(false); // CLOSE DETAILS modal
    setSelectedApp(app);
    setFeedbackText(app.feedback || "");
    setFeedbackModal(true);
  };

  // SAVE FEEDBACK
  const sendFeedback = async () => {
    if (!feedbackText.trim())
      return Swal.fire("Warning", "Feedback cannot be empty", "warning");

    try {
      await api.patch(
        `/applications/${selectedApp._id}/feedback`,
        { feedback: feedbackText },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      Swal.fire("Success", "Feedback saved!", "success");
      setFeedbackModal(false);
      loadApps();
    } catch (err) {
      Swal.fire("Error", "Failed to save feedback", "error");
    }
  };

  // STATUS BADGE
  const StatusBadge = ({ status }) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      processing: "bg-orange-100 text-orange-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Applications</h1>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="space-y-8">
          {apps.map((a) => (
            <div
              key={a._id}
              className="
                bg-white/80 backdrop-blur-sm border border-gray-200 
                rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 
                transition-all p-6
              "
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* IMAGE SECTION */}
                <div className="relative">
                  <img
                    src={a.universityImage}
                    className="w-full h-40 lg:h-full object-cover rounded-xl border shadow-sm"
                  />
                  <span
                    className="
                      absolute top-3 right-3 
                      bg-black/60 text-white 
                      text-xs px-3 py-1 rounded-full
                      backdrop-blur-sm
                    "
                  >
                    {a.universityCountry}
                  </span>
                </div>

                {/* INFO SECTION */}
                <div className="col-span-1 lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                      <School size={20} className="text-purple-600" />
                      {a.scholarshipName}
                    </h2>

                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />{" "}
                        {a.userName}
                      </p>

                      <p className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />{" "}
                        {a.userEmail}
                      </p>

                      <p className="flex items-center gap-2 mt-1">
                        <CreditCard size={14} className="text-gray-400" />
                        Payment:
                        <span className="font-semibold">{a.paymentStatus}</span>
                      </p>

                      <div className="mt-2">
                        <StatusBadge status={a.applicationStatus} />
                      </div>

                      {a.feedback && (
                        <p className="text-xs bg-purple-50 border border-purple-200 p-3 rounded-lg mt-3 italic text-gray-700">
                          <strong>Moderator Feedback:</strong> {a.feedback}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap lg:flex-nowrap gap-3 mt-6">
                    {/* DETAILS BUTTON FIXED */}
                    <button
                      onClick={() => {
                        setSelectedApp(a);
                        setShowDetailsModal(true);
                      }}
                      className="
                        flex items-center justify-center gap-2 
                        px-4 py-2 w-full lg:w-auto 
                        border rounded-lg hover:bg-gray-50 
                        transition-all
                      "
                    >
                      <Eye size={16} /> Details
                    </button>

                    {/* FEEDBACK BUTTON FIXED */}
                    <button
                      onClick={() => openFeedbackModal(a)}
                      className="
                        flex items-center justify-center gap-2 
                        px-4 py-2 w-full lg:w-auto
                        border border-purple-300 text-purple-700 
                        rounded-lg hover:bg-purple-50 
                        transition-all
                      "
                    >
                      <MessageSquare size={16} /> Feedback
                    </button>

                    <button
                      onClick={() => updateStatus(a._id, "completed")}
                      className="
                        flex items-center justify-center gap-2 
                        px-4 py-2 w-full lg:w-auto
                        bg-green-600 text-white rounded-lg 
                        hover:bg-green-700 transition-all
                      "
                    >
                      <CheckCircle size={16} /> Complete
                    </button>

                    <button
                      onClick={() => updateStatus(a._id, "rejected")}
                      className="
                        flex items-center justify-center gap-2 
                        px-4 py-2 w-full lg:w-auto
                        bg-red-600 text-white rounded-lg 
                        hover:bg-red-700 transition-all
                      "
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --------------------------------------------------
          DETAILS MODAL (ONLY OPENS FOR DETAILS)
      --------------------------------------------------- */}
      {showDetailsModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedApp(null);
              }}
              className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {selectedApp.scholarshipName}
            </h2>

            <img
              src={selectedApp.universityImage}
              className="w-full h-48 object-cover rounded-xl border mb-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>User:</strong> {selectedApp.userName}
              </p>
              <p>
                <strong>Email:</strong> {selectedApp.userEmail}
              </p>
              <p>
                <strong>Country:</strong> {selectedApp.universityCountry}
              </p>
              <p>
                <strong>Status:</strong> {selectedApp.applicationStatus}
              </p>
              <p>
                <strong>Payment:</strong> {selectedApp.paymentStatus}
              </p>
              <p>
                <strong>Applied:</strong>{" "}
                {new Date(selectedApp.applicationDate).toLocaleString()}
              </p>
            </div>

            <h3 className="font-semibold mt-5 mb-2">Form Data</h3>
            <div className="bg-gray-50 border p-4 rounded-lg text-sm max-h-64 overflow-auto">
              {Object.entries(selectedApp.formData).map(([k, v]) => (
                <p key={k} className="mb-1">
                  <strong>{k.replace(/([A-Z])/g, " $1")}</strong>: {v}
                </p>
              ))}
            </div>

            {selectedApp.feedback && (
              <>
                <h3 className="font-semibold mt-5 mb-2">Moderator Feedback</h3>
                <p className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  {selectedApp.feedback}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* --------------------------------------------------
          FEEDBACK MODAL (ONLY OPENS FOR FEEDBACK)
      --------------------------------------------------- */}
      {feedbackModal && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">
            <button
              onClick={() => setFeedbackModal(false)}
              className="absolute right-4 top-3 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">
              Send Feedback to {selectedApp.userName}
            </h2>

            <textarea
              className="w-full border rounded-lg p-3 h-32 outline-none focus:ring focus:ring-purple-300"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />

            <button
              onClick={sendFeedback}
              className="mt-4 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
