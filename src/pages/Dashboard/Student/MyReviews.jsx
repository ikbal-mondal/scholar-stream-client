// src/pages/Dashboard/MyReviews.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Star,
  Edit,
  Trash2,
  School,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthProvider";
import api from "../../../services/api";

export default function MyReviews() {
  const { backendUser } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    if (backendUser?.email) loadMyReviews();
  }, [backendUser?.email]);

  const loadMyReviews = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/my-reviews", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setReviews(data || []);
    } catch (err) {
      console.error("Review fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Review?",
      text: "This action is permanent",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.delete(`/reviews/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    Swal.fire("Deleted", "Review removed", "success");
    loadMyReviews();
  };

  const updateReview = async () => {
    if (!editRating || editComment.trim() === "") {
      return Swal.fire(
        "Missing fields",
        "Rating & comment required",
        "warning"
      );
    }

    await api.put(`/reviews/${editItem._id}`, {
      ratingPoint: editRating,
      reviewComment: editComment,
    });

    Swal.fire("Updated", "Review updated successfully", "success");
    setEditModal(false);
    loadMyReviews();
  };

  const Stars = ({ rating }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          className={
            n <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <GraduationCap className="text-primary" /> My Reviews
      </h2>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          You haven't written any reviews yet.
        </p>
      ) : (
        <div className="space-y-5">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <School className="text-purple-600" /> {r.universityName}
                  </h3>

                  <Stars rating={r.ratingPoint} />

                  <p className="mt-2 text-gray-700 italic border-l-4 border-primary pl-3">
                    “{r.reviewComment}”
                  </p>

                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <CalendarDays size={14} />
                    {new Date(r.reviewDate).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setEditItem(r);
                      setEditRating(r.ratingPoint);
                      setEditComment(r.reviewComment);
                      setEditModal(true);
                    }}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => deleteReview(r._id)}
                    className="p-2 border text-red-600 border-red-400 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT REVIEW MODAL */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setEditModal(false)}
              className="absolute right-4 top-3 text-xl text-gray-500"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Review</h2>

            {/* Rating */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={28}
                  onClick={() => setEditRating(n)}
                  className={`cursor-pointer ${
                    n <= editRating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              className="w-full border rounded-lg p-3 h-28"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />

            <button
              onClick={updateReview}
              className="mt-4 bg-primary text-white w-full py-2 rounded-lg"
            >
              Update Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
