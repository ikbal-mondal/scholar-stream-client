import React, { useEffect, useState, useContext } from "react";
import { Eye, MessageSquare, School } from "lucide-react";
import api from "../../../services/api";
import AuthContext from "../../../context/AuthProvider";

export default function ApplicationFeedback() {
  const { backendUser } = useContext(AuthContext);

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => {
    if (backendUser?.email) loadFeedback();
  }, [backendUser?.email]);

  const loadFeedback = async () => {
    try {
      const res = await api.get(`/applications/student/${backendUser.email}`);

      const filtered = (res.data || []).filter(
        (a) =>
          (a.feedback && a.feedback.trim()) ||
          (a.feedbackText && a.feedbackText.trim())
      );

      setApps(filtered);
    } catch (err) {
      console.error("Feedback fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="text-purple-600" />
        Application Feedback
      </h1>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : apps.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No feedback available yet.
        </p>
      ) : (
        apps.map((a) => (
          <div
            key={a._id}
            className="bg-white border rounded-xl p-5 shadow mb-4 flex justify-between"
          >
            <div className="flex gap-4">
              <img
                src={a.universityImage}
                className="w-28 h-20 rounded-lg border object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <School size={18} className="text-purple-600" />
                  {a.scholarshipName}
                </h2>

                <p className="text-gray-700 mt-2">
                  <strong>Feedback:</strong> {a.feedback || a.feedbackText}
                </p>

                {a.feedbackDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Date: {new Date(a.feedbackDate).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setViewItem(a)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              <Eye size={16} /> View
            </button>
          </div>
        ))
      )}

      {/* DETAILS MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded-xl shadow relative">
            <button
              onClick={() => setViewItem(null)}
              className="absolute right-4 top-3 text-xl hover:text-black"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-3">
              {viewItem.scholarshipName}
            </h2>

            <img
              src={viewItem.universityImage}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h3 className="font-semibold mb-2">Application Form</h3>
            <div className="bg-gray-50 border p-4 rounded max-h-60 overflow-auto text-sm">
              {Object.entries(viewItem.formData).map(([k, v]) => (
                <p key={k}>
                  <strong>{k}:</strong> {v}
                </p>
              ))}
            </div>

            <h3 className="font-semibold mt-4 mb-2">Feedback</h3>
            <p className="bg-purple-50 border border-purple-200 p-3 rounded">
              {viewItem.feedback || viewItem.feedbackText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
